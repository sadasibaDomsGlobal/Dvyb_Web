/**
 * Firebase Configuration File
 * ----------------------------
 * This file initializes Firebase using environment variables
 * imported from the Vite environment. It ensures that Firebase
 * is initialized only once and exports the commonly used
 * Firebase services for use across the application.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { envConfig } from "./envConfig";

const firebaseConfig = {
  apiKey: envConfig.firebase.apiKey,
  authDomain: envConfig.firebase.authDomain,
  projectId: envConfig.firebase.projectId,
  storageBucket: envConfig.firebase.storageBucket,
  messagingSenderId: envConfig.firebase.messagingSenderId,
  appId: envConfig.firebase.appId,
  measurementId: envConfig.firebase.measurementId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Optional: Analytics initialization
 * Only initialize analytics if running in a browser environment
 */
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export { analytics };
export default app;
