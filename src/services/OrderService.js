// services/OrderService.js
import { auth,db } from "../config/firebaseConfig"; 
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp
} from "firebase/firestore";

// Helper function to determine user collection
const getUserCollection = async (userId) => {
  try {
    const b2cUserRef = doc(db, "b2c_users", userId);
    const b2cDoc = await getDoc(b2cUserRef);
    
    if (b2cDoc.exists()) {
      return "b2c_users";
    }
    
    const b2bUserRef = doc(db, "B2BBulkOrders_users", userId);
    const b2bDoc = await getDoc(b2bUserRef);
    
    if (b2bDoc.exists()) {
      return "B2BBulkOrders_users";
    }
    
    throw new Error("User not found in any collection");
  } catch (error) {
    console.error("Error getting user collection:", error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const userCollection = await getUserCollection(user.uid);
    
    // Generate order ID
    const orderId = `ORD${Date.now()}`;
    const orderRef = doc(db, userCollection, user.uid, "orders", orderId);
    
    // Create order document
    const order = {
      orderId,
      userId: user.uid,
      status: "Active", // Active, Delivered, Cancelled, Returned
      createdAt: Timestamp.now(),
      ...orderData
    };

    await setDoc(orderRef, order);
    
    console.log("Order created successfully:", orderId);
    return { success: true, orderId, order };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get all user's orders
export const getUserOrders = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const userCollection = await getUserCollection(user.uid);
    const ordersRef = collection(db, userCollection, user.uid, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const orders = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        date: data.createdAt?.toDate?.() || new Date()
      });
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Subscribe to orders (real-time)
export const subscribeToOrders = async (callback) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      callback([]);
      return () => {};
    }

    const userCollection = await getUserCollection(user.uid);
    const ordersRef = collection(db, userCollection, user.uid, "orders");
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          ...data,
          date: data.createdAt?.toDate?.() || new Date()
        });
      });
      callback(orders);
    }, (error) => {
      console.error("Error listening to orders:", error);
      callback([]);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up orders listener:", error);
    callback([]);
    return () => {};
  }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User must be authenticated");
    }

    const userCollection = await getUserCollection(user.uid);
    const orderRef = doc(db, userCollection, user.uid, "orders", orderId);
    
    await setDoc(orderRef, { status: newStatus }, { merge: true });
    
    console.log("Order status updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};