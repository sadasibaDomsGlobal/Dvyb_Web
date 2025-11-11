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
} from "firebase/firestore";

/**
 * Wishlist Service (Singleton Class)
 * ----------------------------------
 * Handles all wishlist CRUD operations for both b2c and B2B users.
 * Automatically detects user role and collection.
 */
class WishlistOperationalService {
  static instance;

  constructor() {
    if (WishlistOperationalService.instance) {
      return WishlistOperationalService.instance;
    }
    WishlistOperationalService.instance = this;
  }

  /** Utility: Get user collection and role */
  async getUserCollectionAndRole(userId) {
    try {
      const b2cCollection = envConfig.firebaseStorage.b2cCollection;
      const b2bCollection = envConfig.firebaseStorage.b2bCollection;

      const b2cUserRef = doc(db, b2cCollection, userId);
      const b2bUserRef = doc(db, b2bCollection, userId);

      const [b2cDoc, b2bDoc] = await Promise.all([getDoc(b2cUserRef), getDoc(b2bUserRef)]);

      if (b2cDoc.exists()) {
        return { collection: b2cCollection, role: "b2c", userData: b2cDoc.data() };
      }
      if (b2bDoc.exists()) {
        return { collection: b2bCollection, role: "B2B", userData: b2bDoc.data() };
      }

      throw new Error("User not found in either collection");
    } catch (error) {
      console.error("Error getting user collection:", error);
      throw error;
    }
  }

  /** Add item to wishlist */
  async addToWishlist(productId, productData = {}) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const { collection: userCollection } = await this.getUserCollectionAndRole(user.uid);
      const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);

      const cleanedProductData = Object.fromEntries(
        Object.entries(productData).filter(([v]) => v !== undefined)
      );

      const docData = {
        productId,
        addedAt: new Date(),
        userId: user.uid,
        ...cleanedProductData,
      };

      /**
       * Handle vendorId mapping for B2B products
       * Some products may use 'userId' or 'vendorId' to denote the vendor
       */
      if (productData.userId !== undefined) {
        docData.vendorId = productData.userId;
      } else if (productData.vendorId !== undefined) {
        docData.vendorId = productData.vendorId;
      }

      await setDoc(wishlistItemRef, docData);
      console.log("✅ Item added to wishlist successfully");
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  }

  /** Remove item from wishlist */
  async removeFromWishlist(productId) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const { collection: userCollection } = await this.getUserCollectionAndRole(user.uid);
      const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);

      await deleteDoc(wishlistItemRef);
      console.log("🗑 Item removed from wishlist successfully");
      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  }

  /** Get all wishlist items */
  async getWishlist() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const { collection: userCollection } = await this.getUserCollectionAndRole(user.uid);
      const wishlistRef = collection(db, userCollection, user.uid, "wishlist");
      const q = query(wishlistRef, orderBy("addedAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error;
    }
  }

  /** Check if an item exists in wishlist */
  async isInWishlist(productId) {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const { collection: userCollection } = await this.getUserCollectionAndRole(user.uid);
      const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);
      const docSnap = await getDoc(wishlistItemRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking wishlist:", error);
      return false;
    }
  }

  /** Toggle wishlist item (add/remove) */
  async toggleWishlist(productId, productData = {}) {
    try {
      const exists = await this.isInWishlist(productId);
      if (exists) {
        await this.removeFromWishlist(productId);
        return { action: "removed", inWishlist: false };
      } else {
        await this.addToWishlist(productId, productData);
        return { action: "added", inWishlist: true };
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      throw error;
    }
  }

  /** Subscribe to wishlist changes (real-time updates) */
  async subscribeToWishlist(callback) {
    try {
      const user = auth.currentUser;
      if (!user) {
        callback([]);
        return () => {};
      }

      const { collection: userCollection } = await this.getUserCollectionAndRole(user.uid);
      const wishlistRef = collection(db, userCollection, user.uid, "wishlist");
      const q = query(wishlistRef, orderBy("addedAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const wishlistItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(wishlistItems);
        },
        (error) => {
          console.error("Error listening to wishlist:", error);
          callback([]);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up wishlist listener:", error);
      callback([]);
      return () => {};
    }
  }

  /** Clear all wishlist items */
  async clearWishlist() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User must be authenticated");

      const wishlistItems = await this.getWishlist();
      const deleteOps = wishlistItems.map((item) => this.removeFromWishlist(item.productId));

      await Promise.all(deleteOps);
      console.log("🧼 Wishlist cleared successfully");
      return true;
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      throw error;
    }
  }

  /** Get total wishlist count */
  async getWishlistCount() {
    try {
      const items = await this.getWishlist();
      return items.length;
    } catch (error) {
      console.error("Error getting wishlist count:", error);
      return 0;
    }
  }

  /** Get current user info */
  async getCurrentUserInfo() {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userInfo = await this.getUserCollectionAndRole(user.uid);
      return { uid: user.uid, email: user.email, ...userInfo };
    } catch (error) {
      console.error("Error getting current user info:", error);
      return null;
    }
  }
}

/**
 * Export the Singleton instance
 */
export const wishlistService = new WishlistOperationalService();
