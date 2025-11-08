// api/kling/generate-tryon.js - Vercel Serverless Function for 3D Video Generation

import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import crypto from 'crypto';
import formidable from 'formidable';

// ==================== CONFIGURATIONS ====================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const KLING_API_BASE = 'https://api.klingai.com/v1';
const KLING_ACCESS_KEY = process.env.KLING_ACCESS_KEY;
const KLING_SECRET_KEY = process.env.KLING_SECRET_KEY;

// ==================== UTILITY FUNCTIONS ====================
const generateKlingToken = () => {
  try {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      iss: KLING_ACCESS_KEY,
      exp: Math.floor(Date.now() / 1000) + 1800,
      nbf: Math.floor(Date.now() / 1000) - 5
    };

    const base64UrlEncode = (obj) => {
      return Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const headerEncoded = base64UrlEncode(header);
    const payloadEncoded = base64UrlEncode(payload);

    const signature = crypto
      .createHmac('sha256', KLING_SECRET_KEY)
      .update(`${headerEncoded}.${payloadEncoded}`)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  } catch (error) {
    console.error(' Token generation failed:', error);
    throw new Error('Failed to generate authentication token');
  }
};

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: folder, 
        resource_type: 'image',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error(' Cloudinary upload failed:', error);
          reject(error);
        } else {
          console.log(' Cloudinary upload successful:', result.secure_url);
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });

// Parse form data using formidable
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

// ==================== MAIN HANDLER ====================
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  console.log('\n🎬 ===== 3D VIDEO GENERATION START =====');
  console.log('⏰ Time:', new Date().toISOString());

  try {
    // Parse form data
    console.log('📦 Parsing form data...');
    const { fields, files } = await parseForm(req);

    // Get the model image file
    const modelImageFile = files.modelImage?.[0] || files.modelImage;

    if (!modelImageFile) {
      console.error(' No model image provided');
      return res.status(400).json({ 
        success: false, 
        message: 'Model image is required',
        receivedFiles: Object.keys(files)
      });
    }

    console.log('📦 File received:', {
      name: modelImageFile.originalFilename || modelImageFile.newFilename,
      size: `${(modelImageFile.size / 1024).toFixed(2)} KB`,
      mimetype: modelImageFile.mimetype
    });

    // Read file buffer
    const fs = await import('fs');
    const fileBuffer = await fs.promises.readFile(modelImageFile.filepath);

    if (!fileBuffer || fileBuffer.length === 0) {
      console.error(' Empty file buffer');
      return res.status(400).json({
        success: false,
        message: 'Uploaded file is empty'
      });
    }

    // Step 1: Upload to Cloudinary
    console.log(' Step 1: Uploading to Cloudinary...');
    let modelUpload;
    try {
      modelUpload = await uploadToCloudinary(fileBuffer, 'kling-video/models');
      console.log(' Cloudinary upload successful');
      console.log('   URL:', modelUpload.secure_url);
    } catch (uploadError) {
      console.error(' Cloudinary upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to cloud storage',
        error: uploadError.message
      });
    }

    // Step 2: Generate token
    console.log(' Step 2: Generating authentication token...');
    let token;
    try {
      token = generateKlingToken();
      console.log(' Token generated');
    } catch (tokenError) {
      console.error(' Token generation error:', tokenError);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate authentication token',
        error: tokenError.message
      });
    }

    // Step 3: Prepare request
    console.log(' Step 3: Preparing video request...');
    const prompt = fields.prompt?.[0] || fields.prompt || 'Professional fashion model walking on runway, elegant movement';
    
    const videoRequest = {
      model_name: 'kling-v1-5',
      image: modelUpload.secure_url,
      image_tail: '',
      prompt: prompt,
      negative_prompt: 'blurry, low quality, distorted',
      cfg_scale: 0.5,
      mode: 'std',
      duration: '5'
    };

    console.log('Request payload:', JSON.stringify(videoRequest, null, 2));

    // Step 4: Call Kling API
    console.log(' Step 4: Calling Kling API...');
    let videoResponse;
    try {
      videoResponse = await axios.post(
        `${KLING_API_BASE}/videos/image2video`,
        videoRequest,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000,
          validateStatus: (status) => status < 600
        }
      );
      
      console.log('📡 Kling API responded:', videoResponse.status);
      
    } catch (apiError) {
      console.error(' Kling API request failed:', apiError.message);
      return res.status(500).json({
        success: false,
        message: 'Kling API request failed',
        error: apiError.message,
        details: apiError.response?.data
      });
    }

    // Check response
    if (videoResponse.status !== 200) {
      console.error(' Kling API returned non-200 status:', videoResponse.status);
      return res.status(500).json({
        success: false,
        message: `Kling API error: ${videoResponse.status}`,
        details: videoResponse.data
      });
    }

    // Step 5: Extract task ID
    console.log(' Step 5: Extracting task ID...');
    const responseData = videoResponse.data;
    
    if (!responseData) {
      console.error(' No response data');
      return res.status(500).json({
        success: false,
        message: 'No data received from Kling API'
      });
    }

    const videoTaskId = responseData.data?.task_id;
    
    if (!videoTaskId) {
      console.error('No task ID in response');
      return res.status(500).json({
        success: false,
        message: 'No task ID received from Kling API',
        response: responseData
      });
    }

    console.log(' Task created successfully!');
    console.log('   Task ID:', videoTaskId);
    console.log('===== 3D VIDEO GENERATION SUCCESS =====\n');

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Video generation started',
      data: {
        taskId: videoTaskId,
        tryOnImageUrl: modelUpload.secure_url,
        modelUrl: modelUpload.secure_url,
        status: 'processing'
      }
    });

  } catch (error) {
    console.error(' UNEXPECTED ERROR:', error.message);
    console.log('===== 3D VIDEO GENERATION FAILED =====\n');
    
    return res.status(500).json({
      success: false,
      message: 'Unexpected server error',
      error: error.message
    });
  }
}