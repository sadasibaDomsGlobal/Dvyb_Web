// services/firebaseServices.js
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDocs,
  serverTimestamp, 
  collectionGroup 
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; 

// Product Services
export const productService = {
  // Fetch all products from all vendors
  async fetchAllProducts() {
    try {
      console.log('🚀 Starting product fetch...');
      
      // Use collection group to fetch all products from all users
      const q = collectionGroup(db, 'products');
      const querySnapshot = await getDocs(q);

      const fetchedProducts = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        // Normalize timestamp
        let timestamp = null;
        if (data.timestamp?.toDate) {
          timestamp = data.timestamp.toDate(); // Firestore Timestamp
        } else if (typeof data.timestamp === "number") {
          timestamp = new Date(data.timestamp); // milliseconds
        } else if (typeof data.timestamp === "string") {
          timestamp = new Date(data.timestamp); // ISO string
        } else if (data.createdAt) {
          timestamp = new Date(data.createdAt); // fallback to createdAt
        }

        return {
          id: doc.id,
          ...data,
          timestamp,
          // Ensure we have both title and name for compatibility
          title: data.title || data.name || 'Untitled Product',
          name: data.name || data.title || 'Untitled Product'
        };
      });

      console.log(`📊 Collection group query returned ${fetchedProducts.length} products`);
      
      if (fetchedProducts.length === 0) {
        console.log('⚠️ No products found');
      } else {
        // Log first few products for debugging
        console.log('📦 Sample products:', fetchedProducts.slice(0, 2));
      }
      
      // Sort products by timestamp (newest first)
      fetchedProducts.sort((a, b) => {
        const timeA = a.timestamp || new Date(0);
        const timeB = b.timestamp || new Date(0);
        return timeB - timeA;
      });

      return fetchedProducts;
    } catch (error) {
      console.error('💥 Error in fetchAllProducts:', error);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // Create a single product
  async createProduct(userId, productData) {
    try {
      const productRef = await addDoc(
        collection(db, 'users', userId, 'products'),
        { 
          ...productData, 
          userId,
          timestamp: serverTimestamp(),
          createdAt: new Date().toISOString()
        }
      );
      console.log(`✅ Product created: ${productRef.id} for user: ${userId}`);
      return productRef.id;
    } catch (error) {
      console.error('❌ Error creating product:', error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }
};

// User Services
export const userService = {
  // Create a user
  async createUser(userId, userData) {
    try {
      console.log(`📝 Creating user: ${userId}`);
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString()
      });
      console.log(`✅ User created: ${userId}`);
      return userId;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
};

// Debug Services
export const debugService = {
  // Run comprehensive debug tests
  async runDebugTests() {
    console.log('🔍 Running comprehensive debug tests...');
    const debug = {};
    
    try {
      debug.firebaseConnected = true;
      console.log('✅ Firebase connection OK');
      
      try {
        console.log('🔍 Testing direct collection group query...');
        const q = collectionGroup(db, 'products');
        const querySnapshot = await getDocs(q);
        
        debug.totalProducts = querySnapshot.size;
        debug.productIds = querySnapshot.docs.map(doc => doc.id);
        console.log(`📊 Found ${querySnapshot.size} products via collection group:`, debug.productIds);
        
        // Log sample product data
        if (querySnapshot.size > 0) {
          const sampleProduct = querySnapshot.docs[0].data();
          debug.sampleProduct = sampleProduct;
          console.log('📦 Sample product:', sampleProduct);
        }
        
      } catch (error) {
        debug.collectionGroupError = error.message;
        console.error('❌ Collection group query failed:', error);
      }
      
    } catch (error) {
      debug.generalError = error.message;
      console.error('❌ General debug test failed:', error);
    }
    
    return debug;
  }
};

