import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./cloudinaryConfig.js";


/**
 * Simple Express server to handle file uploads to Cloudinary
 * Uses multer for handling multipart/form-data
 * Exposes a single POST /upload endpoint
 * Expects a 'file' field in the form data
 */

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /upload
 * Expects a file in the 'file' field of the form data
 * Uploads the file to Cloudinary and returns the secure URL
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileBuffer, {
      folder: "warehouse_uploads",
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Start the server
 */
const PORT = process.env.VITE_SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
