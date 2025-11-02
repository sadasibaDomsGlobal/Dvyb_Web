/**
 * Cart Service
 * -------------
 * Manages shopping cart operations using Firebase Firestore.
 */

import { auth, db, envConfig } from "../config";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

class CartOperationalService {
  static instance = null;

  static getInstance() {
    if (!CartOperationalService.instance) {
      CartOperationalService.instance = new CartOperationalService();
    }
    return CartOperationalService.instance;
  }

  constructor() {
    this.db = db;
    this.auth = auth;
    this.b2cCollection = envConfig.firebaseStorage.b2cCollection;
    this.b2bCollection = envConfig.firebaseStorage.b2bCollection;
  }

  /** Get the user's collection name */
  async getUserCollection(userId) {
    try {
      const b2cUserRef = doc(this.db, this.b2cCollection, userId);
      const b2cDoc = await getDoc(b2cUserRef);
      if (b2cDoc.exists()) return this.b2cCollection;

      const b2bUserRef = doc(this.db, this.b2bCollection, userId);
      const b2bDoc = await getDoc(b2bUserRef);
      if (b2bDoc.exists()) return this.b2bCollection;

      throw new Error("User not found in any collection");
    } catch (error) {
      console.error("Error getting user collection:", error);
      throw error;
    }
  }

  /** Add items to cart */
  async addToCart(productId, productData = {}, quantity = 1) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const userCollection = await this.getUserCollection(user.uid);
      const cartItemRef = doc(this.db, userCollection, user.uid, "cart", productId);

      const cleanedProductData = {};
      for (const [key, value] of Object.entries(productData)) {
        if (value !== undefined) cleanedProductData[key] = value;
      }

      await setDoc(cartItemRef, {
        productId,
        quantity: Math.max(1, quantity),
        addedAt: new Date(),
        userId: user.uid,
        vendorId: productData.userId || productData.vendorId || null,
        ...cleanedProductData,
        subtotal: (cleanedProductData.price || 0) * Math.max(1, quantity),
        freeShipping: cleanedProductData.freeShipping ?? false,
        shippingMessage: cleanedProductData.shippingMessage ?? null,
      });

      console.log("✅ Item added to cart successfully");
      return true;
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      throw error;
    }
  }

  /** Remove item from cart */
  async removeFromCart(productId) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const userCollection = await this.getUserCollection(user.uid);
      const cartItemRef = doc(this.db, userCollection, user.uid, "cart", productId);
      await deleteDoc(cartItemRef);

      console.log("✅ Item removed from cart successfully");
      return true;
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
      throw error;
    }
  }

  /** Get user's cart (one-time fetch) */
  async getCart() {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const userCollection = await this.getUserCollection(user.uid);
      const cartRef = collection(this.db, userCollection, user.uid, "cart");
      const q = query(cartRef, orderBy("addedAt", "desc"));
      const querySnapshot = await getDocs(q);

      const cartItems = [];
      querySnapshot.forEach((doc) => {
        cartItems.push({ id: doc.id, ...doc.data() });
      });

      return cartItems;
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      throw error;
    }
  }

  /** Subscribe to real-time cart updates */
  async subscribeToCart(callback) {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        callback([]);
        return () => {};
      }

      const userCollection = await this.getUserCollection(user.uid);
      const cartRef = collection(this.db, userCollection, user.uid, "cart");
      const q = query(cartRef, orderBy("addedAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const cartItems = [];
          querySnapshot.forEach((doc) => {
            cartItems.push({ id: doc.id, ...doc.data() });
          });
          callback(cartItems);
        },
        (error) => {
          console.error("Error listening to cart:", error);
          callback([]);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("❌ Error setting up cart listener:", error);
      callback([]);
      return () => {};
    }
  }

  /** Clear the entire cart */
  async clearCart() {
    try {
      const cartItems = await this.getCart();
      const deletePromises = cartItems.map((item) => this.removeFromCart(item.productId));
      await Promise.all(deletePromises);

      console.log("✅ Cart cleared successfully");
      return true;
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
      throw error;
    }
  }

  /** Get total cart count */
  async getCartCount() {
    try {
      const cartItems = await this.getCart();
      return cartItems.length;
    } catch (error) {
      console.error("❌ Error getting cart count:", error);
      return 0;
    }
  }

  /** Update item quantity */
  async updateCartItemQuantity(productId, newQuantity) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const userCollection = await this.getUserCollection(user.uid);
      const cartItemRef = doc(this.db, userCollection, user.uid, "cart", productId);

      const itemSnap = await getDoc(cartItemRef);
      if (!itemSnap.exists()) throw new Error("Cart item not found");

      const itemData = itemSnap.data();
      const price = itemData.price || 0;
      const quantity = Math.max(1, newQuantity);

      await updateDoc(cartItemRef, {
        quantity,
        subtotal: price * quantity,
      });

      console.log(`✅ Updated ${productId} quantity to ${quantity}`);
      return true;
    } catch (error) {
      console.error("❌ Error updating cart quantity:", error);
      throw error;
    }
  }
}

/**
 * Export Singleton Instance
 */
export const cartService = CartOperationalService.getInstance();
