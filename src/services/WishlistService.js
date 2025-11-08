import { auth,db } from "../config/firebaseConfig"; 
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

// Helper function to determine user collection and get user role
const getUserCollectionAndRole = async (userId) => {
  try {
    // First check b2c_users
    const b2cUserRef = doc(db, "b2c_users", userId);
    const b2cDoc = await getDoc(b2cUserRef);
    
    if (b2cDoc.exists()) {
      return { collection: "b2c_users", role: "B2C", userData: b2cDoc.data() };
    }
    
    // Then check B2BBulkOrders_users
    const b2bUserRef = doc(db, "B2BBulkOrders_users", userId);
    const b2bDoc = await getDoc(b2bUserRef);
    
    if (b2bDoc.exists()) {
      return { collection: "B2BBulkOrders_users", role: "B2BBulkOrders", userData: b2bDoc.data() };
    }
    
    throw new Error("User not found in any collection");
  } catch (error) {
    console.error("Error getting user collection:", error);
    throw error;
  }
};

// Add item to wishlist
// Add item to wishlist
export const addToWishlist = async (productId, productData = {}) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const { collection: userCollection } = await getUserCollectionAndRole(user.uid);
    const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);

    // Filter out undefined values from productData
    const cleanedProductData = {};
    for (const [key, value] of Object.entries(productData)) {
      if (value !== undefined) {
        cleanedProductData[key] = value;
      }
    }
    
    console.log("Saving productData:", productData);

    // ✅ Build the document data - only add vendorId if it exists
    const docData = {
      productId,
      addedAt: new Date(),
      userId: user.uid,
      ...cleanedProductData
    };

    // ✅ Only add vendorId if it's defined
    if (productData.userId !== undefined) {
      docData.vendorId = productData.userId;
    } else if (productData.vendorId !== undefined) {
      docData.vendorId = productData.vendorId;
    }

    await setDoc(wishlistItemRef, docData);

    console.log("Item added to wishlist successfully");
    return true;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const { collection: userCollection } = await getUserCollectionAndRole(user.uid);
    const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);
    await deleteDoc(wishlistItemRef);

    console.log("Item removed from wishlist successfully");
    return true;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

// Get user's wishlist
export const getWishlist = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const { collection: userCollection } = await getUserCollectionAndRole(user.uid);
    const wishlistRef = collection(db, userCollection, user.uid, "wishlist");
    const q = query(wishlistRef, orderBy("addedAt", "desc"));
    const querySnapshot = await getDocs(q);

    const wishlistItems = [];
    querySnapshot.forEach((doc) => {
      wishlistItems.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return wishlistItems;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Check if item is in wishlist
export const isInWishlist = async (productId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return false;
    }

    const { collection: userCollection } = await getUserCollectionAndRole(user.uid);
    const wishlistItemRef = doc(db, userCollection, user.uid, "wishlist", productId);
    const docSnap = await getDoc(wishlistItemRef);

    return docSnap.exists();
  } catch (error) {
    console.error("Error checking wishlist status:", error);
    return false;
  }
};

// Listen to wishlist changes (real-time)
export const subscribeToWishlist = async (callback) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      callback([]);
      return () => {}; // Return empty unsubscribe function
    }

    const { collection: userCollection } = await getUserCollectionAndRole(user.uid);
    const wishlistRef = collection(db, userCollection, user.uid, "wishlist");
    const q = query(wishlistRef, orderBy("addedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const wishlistItems = [];
      querySnapshot.forEach((doc) => {
        wishlistItems.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(wishlistItems);
    }, (error) => {
      console.error("Error listening to wishlist:", error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up wishlist listener:", error);
    callback([]);
    return () => {};
  }
};

// Toggle wishlist item (add if not present, remove if present)
export const toggleWishlist = async (productId, productData = {}) => {
  try {
    const inWishlist = await isInWishlist(productId);
    
    if (inWishlist) {
      await removeFromWishlist(productId);
      return { action: 'removed', inWishlist: false };
    } else {
      await addToWishlist(productId, productData);
      return { action: 'added', inWishlist: true };
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    throw error;
  }
};

// Clear entire wishlist
export const clearWishlist = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const wishlistItems = await getWishlist();
    
    // Delete all items
    const deletePromises = wishlistItems.map(item => 
      removeFromWishlist(item.productId)
    );
    
    await Promise.all(deletePromises);
    
    console.log("Wishlist cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    throw error;
  }
};

// Get wishlist count
export const getWishlistCount = async () => {
  try {
    const wishlistItems = await getWishlist();
    return wishlistItems.length;
  } catch (error) {
    console.error("Error getting wishlist count:", error);
    return 0;
  }
};

// Get current user info (helpful for debugging and UI)
export const getCurrentUserInfo = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }

    const userInfo = await getUserCollectionAndRole(user.uid);
    return {
      uid: user.uid,
      email: user.email,
      ...userInfo
    };
  } catch (error) {
    console.error("Error getting current user info:", error);
    return null;
  }
};