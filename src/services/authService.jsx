/**
 * Authentication service file
 * ------------------------------
 * Class based approach
 * ------------------------------
 * Handles user registration, login, Google sign-in, and logout
 * Supports both email and phone number authentication
 * Uses Firebase Authentication and Firestore
 */

import { B2CUserModel, B2BUserModel } from "../models";
import { auth, db, envConfig } from "../config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

class AuthenticationService {
  static instance = null;

  static getInstance() {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  constructor() {
    this.auth = auth;
    this.db = db;
    this.googleProvider = new GoogleAuthProvider();

    this.b2cCollection = envConfig.firebaseStorage.b2cCollection;
    this.b2bCollection = envConfig.firebaseStorage.b2bCollection;
    this.b2cRole = envConfig.userRole.b2cUserRole;
    this.b2bRole = envConfig.userRole.b2bUserRole;
  }

  /** Converting phone → dummy email */
  phoneToEmail(phone) {
    return `${phone.replace(/[^0-9+]/g, "")}@phone.dvyb.com`;
  }

  /** Saving Firebase token */
  async saveAuthToken(user) {
    try {
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Token save error:", error);
    }
  }

  /** Register user (Email or Phone) */
  async register(input, password, roleType, extraData = {}) {
    const isPhone = input.startsWith("+");
    const email = isPhone ? this.phoneToEmail(input) : input;

    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password);

      const isB2B = roleType === "b2b";
      const collection = isB2B ? this.b2bCollection : this.b2cCollection;

      /**
       * Create structured user data using models
       * ------------------------------------------------------------------------------
       * Using B2BUserModel for B2B users and B2CUserModel for b2c users
       * This ensures consistent data structure and easy future modifications
       * --------------------------------------------------------------------
       */
      const userData = isB2B
        ? new B2BUserModel({
            uid: user.uid,
            email: isPhone ? null : input,
            phoneNumber: isPhone ? input : null,
            ...extraData,
          })
        : new B2CUserModel({
            uid: user.uid,
            email: isPhone ? null : input,
            phoneNumber: isPhone ? input : null,
            ...extraData,
          });

      await setDoc(doc(this.db, collection, user.uid), userData);

      await this.saveAuthToken(user);
      toast.success("Registration successful");
      return user;
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.message);
      throw error;
    }
  }

  /** Login user (Email or Phone) */
  async login(input, password) {
    const isPhone = input.startsWith("+");
    const email = isPhone ? this.phoneToEmail(input) : input;

    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      await this.saveAuthToken(user);
      toast.success("Login successful");
      return user;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      throw error;
    }
  }

  /** Login with Google */
  async loginWithGoogle(type = "b2c", extraData = {}) {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const collection = type === "b2b" ? this.b2bCollection : this.b2cCollection;
      const role = type === "b2b" ? this.b2bRole : this.b2cRole;

      await setDoc(
        doc(db, collection, user.uid),
        {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          photo: user.photoURL || "",
          role,
          ...extraData,
          createdAt: new Date(),
        },
        { merge: true }
      );

      await this.saveAuthToken(user);
      toast.success("Google sign-in successful");
      return user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error(error.message);
      throw error;
    }
  }

  /** Logout */
  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem("authToken");
      window.dispatchEvent(new Event("authChange"));
      toast.info("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message);
    }
  }
}

/**
 * Export a single instance (Singleton)
 */
export const authService = AuthenticationService.getInstance();
export default authService;
