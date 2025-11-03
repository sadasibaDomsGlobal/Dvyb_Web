import axios from "axios";
import crypto from "crypto";
import { Buffer } from "buffer";
import { envConfig } from "../config";

/**
 * KlingService - Handles all communication with the Kling AI API.
 * --------------------------------------------------------------
 * Implements Singleton pattern to ensure only one instance
 * manages authentication token and API calls.
 */
class KlingOperatonalService {
  static instance = null;

  constructor() {
    if (KlingOperatonalService.instance) return KlingOperatonalService.instance;

    // Load configurations from envConfig
    this.baseUrl = envConfig.klingApi.baseUrl;
    this.accessKey = envConfig.klingApi.accessKey;
    this.secretKey = envConfig.klingApi.secretKey;

    KlingOperatonalService.instance = this;
  }

  /**
   * Generate a secure JWT token for Kling API requests
   */
  generateAuthToken() {
    try {
      const header = { alg: "HS256", typ: "JWT" };
      const payload = {
        iss: this.accessKey,
        exp: Math.floor(Date.now() / 1000) + 1800,
        nbf: Math.floor(Date.now() / 1000) - 5,
      };

      const base64UrlEncode = (obj) =>
        Buffer.from(JSON.stringify(obj))
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=/g, "");

      const headerEncoded = base64UrlEncode(header);
      const payloadEncoded = base64UrlEncode(payload);

      const signature = crypto
        .createHmac("sha256", this.secretKey)
        .update(`${headerEncoded}.${payloadEncoded}`)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

      return `${headerEncoded}.${payloadEncoded}.${signature}`;
    } catch (error) {
      console.error("❌ Failed to generate Kling token:", error);
      throw new Error("Failed to generate Kling authentication token");
    }
  }

  /**
   * Send POST request to Kling API endpoint
   * @param {string} endpoint - API endpoint path
   * (e.g. '/videos/image2video')
   * @param {object} data - Request payload
   */
  async post(endpoint, data) {
    const token = this.generateAuthToken();

    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      });

      return response.data;
    } catch (error) {
      console.error("❌ Kling API request failed:", error.message);
      throw new Error(error.response?.data?.message || "Kling API request error");
    }
  }
}

/**
 * Export singleton instance of KlingService
 */
export const klingService = new KlingOperatonalService();
