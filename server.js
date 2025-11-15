// // //to test locally


//2d+3d


// server.js - Fixed version with comprehensive error handling
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CLOUDINARY CONFIG ====================
cloudinary.config({
    cloud_name: 'doiezptnn',
    api_key: '575244834573223',
    api_secret: 'pHC7aVPuheEd9C8XYSAn_l-2dNY'
});

// ==================== API CONFIGURATIONS ====================
const FASHN_API_URL = "https://api.fashn.ai/v1";
const FASHN_AUTH_HEADER = "Bearer fa-kGtS5NyR8vMR-KUYaqFfjeoCM7xBu9BI6aunh";

const KLING_API_BASE = 'https://api.klingai.com/v1';
const KLING_ACCESS_KEY = 'AyhCMJPmHmLgRdJEneyJymAJGFYCreNN';
const KLING_SECRET_KEY = 'GCgg3t3rDgACfJeGbRrdbATdN4FrpkgY';

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

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

        const token = `${headerEncoded}.${payloadEncoded}.${signature}`;
        console.log('🔑 Generated Kling token:', token.substring(0, 50) + '...');
        return token;
    } catch (error) {
        console.error('❌ Token generation failed:', error);
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
                    { quality: 'tops' && 'bottoms', fetch_format: 'tops' && 'bottoms' }
                ]
            },
            (error, result) => {
                if (error) {
                    console.error('❌ Cloudinary upload failed:', error);
                    reject(error);
                } else {
                    console.log('✅ Cloudinary upload successful:', result.secure_url);
                    resolve(result);
                }
            }
        );
        uploadStream.end(buffer);
    });

// ==================== HEALTH CHECK ====================
app.get("/", (req, res) => {
    res.json({
        status: "✅ Backend running",
        timestamp: new Date().toISOString(),
        endpoints: [
            "POST /api/tryon - 2D Virtual Try-On",
            "POST /api/kling/generate-tryon - 3D Video Generation",
            "GET /api/kling/status/:taskId - Check video status"
        ]
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// TEST ENDPOINT - Check if Kling API is accessible
app.get('/api/kling/test', async (req, res) => {
    try {
        console.log('🧪 Testing Kling API connection...');

        const token = generateKlingToken();
        console.log('✅ Token generated successfully');

        // Try a simple API call
        const response = await axios.get(
            `${KLING_API_BASE}/videos/image2video/test-task-id`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000,
                validateStatus: () => true // Accept any status code
            }
        );

        console.log('📡 Kling API responded:', response.status);

        res.json({
            success: true,
            message: 'Kling API is accessible',
            status: response.status,
            response: response.data
        });

    } catch (error) {
        console.error('❌ Kling API test failed:', error.message);
        res.json({
            success: false,
            message: 'Kling API test failed',
            error: error.message,
            details: error.response?.data
        });
    }
});

// ==================== 2D TRY-ON ENDPOINT ====================
app.post("/api/tryon", async (req, res) => {
    try {
        const { modelImage, garmentImage, category } = req.body || {};

        if (!modelImage || !garmentImage) {
            return res.status(400).json({
                error: "Both modelImage and garmentImage URLs are required."
            });
        }

        console.log("✅ [2D Try-On] Request received");
        const garmentCategory = category || 'tops' && 'bottoms';

        // Step 1: Call Fashn API
        const runResponse = await fetch(`${FASHN_API_URL}/run`, {
            method: 'POST',
            headers: {
                'Authorization': FASHN_AUTH_HEADER,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model_name: "tryon-v1.6",
                inputs: {
                    model_image: modelImage,
                    garment_image: garmentImage,
                    category: garmentCategory,
                },
            })
        });

        if (!runResponse.ok) {
            const errorText = await runResponse.text();
            console.error("❌ [2D Try-On] Fashn API error:", errorText);
            return res.status(500).json({
                error: `Fashn API error: ${runResponse.status}`,
                details: errorText
            });
        }

        const runData = await runResponse.json();
        const predictionId = runData.id;

        if (!predictionId) {
            return res.status(500).json({
                error: "No prediction ID received"
            });
        }

        console.log(`✅ [2D Try-On] Prediction started: ${predictionId}`);

        // Step 2: Poll status
        const maxAttempts = 15;
        const pollInterval = 3000;

        for (let i = 0; i < maxAttempts; i++) {
            console.log(`🔄 [2D Try-On] Polling ${i + 1}/${maxAttempts}`);

            const statusResponse = await fetch(`${FASHN_API_URL}/status/${predictionId}`, {
                headers: { 'Authorization': FASHN_AUTH_HEADER }
            });

            if (!statusResponse.ok) {
                return res.status(500).json({
                    error: `Status check error: ${statusResponse.status}`
                });
            }

            const statusData = await statusResponse.json();

            if (statusData.status === "completed") {
                console.log("✅ [2D Try-On] Completed!");
                return res.status(200).json({
                    output: statusData.output,
                    category: garmentCategory
                });
            }

            if (statusData.status === "failed") {
                console.error("❌ [2D Try-On] Failed:", statusData.error);
                return res.status(500).json({
                    error: statusData.error || "Try-on failed"
                });
            }

            if (i < maxAttempts - 1) {
                await new Promise(resolve => setTimeout(resolve, pollInterval));
            }
        }

        return res.status(504).json({
            error: "Try-on timed out"
        });

    } catch (err) {
        console.error("❌ [2D Try-On] Error:", err);
        return res.status(500).json({
            error: err.message || "Server error"
        });
    }
});

// ==================== 3D VIDEO GENERATION ENDPOINT ====================
app.post(
    '/api/kling/generate-tryon',
    upload.fields([
        { name: 'garmentImage', maxCount: 1 },
        { name: 'modelImage', maxCount: 1 }
    ]),
    async (req, res) => {
        console.log('\n🎬 ===== 3D VIDEO GENERATION START =====');
        console.log('⏰ Time:', new Date().toISOString());

        // Set longer timeout for this endpoint
        req.setTimeout(120000); // 2 minutes

        try {
            // Validate input
            if (!req.files) {
                console.error('❌ No files in request');
                return res.status(400).json({
                    success: false,
                    message: 'No files uploaded'
                });
            }

            if (!req.files.modelImage) {
                console.error('❌ No model image provided');
                console.log('Available files:', Object.keys(req.files));
                return res.status(400).json({
                    success: false,
                    message: 'Model image is required',
                    receivedFiles: Object.keys(req.files)
                });
            }

            const file = req.files.modelImage[0];
            console.log('📦 File received:', {
                name: file.originalname,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                mimetype: file.mimetype,
                bufferLength: file.buffer?.length || 0
            });

            if (!file.buffer || file.buffer.length === 0) {
                console.error('❌ Empty file buffer');
                return res.status(400).json({
                    success: false,
                    message: 'Uploaded file is empty'
                });
            }

            // Step 1: Upload to Cloudinary
            console.log('📤 Step 1: Uploading to Cloudinary...');
            let modelUpload;
            try {
                modelUpload = await uploadToCloudinary(file.buffer, 'kling-video/models');
                console.log('✅ Cloudinary upload successful');
                console.log('   URL:', modelUpload.secure_url);
                console.log('   Public ID:', modelUpload.public_id);
            } catch (uploadError) {
                console.error('❌ Cloudinary upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload image to cloud storage',
                    error: uploadError.message
                });
            }

            // Step 2: Generate token
            console.log('🔑 Step 2: Generating authentication token...');
            let token;
            try {
                token = generateKlingToken();
                console.log('✅ Token generated:', token.substring(0, 30) + '...');
            } catch (tokenError) {
                console.error('❌ Token generation error:', tokenError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to generate authentication token',
                    error: tokenError.message
                });
            }

            // Step 3: Prepare request
            console.log('📋 Step 3: Preparing video request...');
            const videoRequest = {
                model_name: 'kling-v1-5',
                image: modelUpload.secure_url,
                image_tail: '',
                prompt: req.body.prompt || 'Professional fashion model walking on runway, elegant movement',
                negative_prompt: 'blurry, low quality, distorted',
                cfg_scale: 0.5,
                mode: 'std',
                duration: '5'
            };

            console.log('📝 Request payload:', JSON.stringify(videoRequest, null, 2));

            // Step 4: Call Kling API
            console.log('🚀 Step 4: Calling Kling API...');
            console.log('   Endpoint:', `${KLING_API_BASE}/videos/image2video`);

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
                        timeout: 60000, // 60 seconds
                        validateStatus: (status) => status < 600 // Don't throw on any status < 600
                    }
                );

                console.log('📡 Kling API responded:');
                console.log('   Status:', videoResponse.status);
                console.log('   Status Text:', videoResponse.statusText);
                console.log('   Headers:', JSON.stringify(videoResponse.headers, null, 2));
                console.log('   Data:', JSON.stringify(videoResponse.data, null, 2));

            } catch (apiError) {
                console.error('❌ Kling API request failed:');
                console.error('   Message:', apiError.message);
                console.error('   Code:', apiError.code);

                if (apiError.response) {
                    console.error('   Response Status:', apiError.response.status);
                    console.error('   Response Data:', JSON.stringify(apiError.response.data, null, 2));
                }

                return res.status(500).json({
                    success: false,
                    message: 'Kling API request failed',
                    error: apiError.message,
                    details: apiError.response?.data,
                    code: apiError.code
                });
            }

            // Check if API call was successful
            if (videoResponse.status !== 200) {
                console.error('❌ Kling API returned non-200 status:', videoResponse.status);
                return res.status(500).json({
                    success: false,
                    message: `Kling API error: ${videoResponse.status}`,
                    details: videoResponse.data
                });
            }

            // Step 5: Extract task ID
            console.log('🔍 Step 5: Extracting task ID...');
            const responseData = videoResponse.data;

            if (!responseData) {
                console.error('❌ No response data');
                return res.status(500).json({
                    success: false,
                    message: 'No data received from Kling API'
                });
            }

            const videoTaskId = responseData.data?.task_id;

            if (!videoTaskId) {
                console.error('❌ No task ID in response');
                console.error('   Response structure:', JSON.stringify(responseData, null, 2));
                return res.status(500).json({
                    success: false,
                    message: 'No task ID received from Kling API',
                    response: responseData
                });
            }

            console.log('✅ Task created successfully!');
            console.log('   Task ID:', videoTaskId);
            console.log('===== 3D VIDEO GENERATION SUCCESS =====\n');

            // Return success response
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
            console.error('❌ UNEXPECTED ERROR in video generation:');
            console.error('   Message:', error.message);
            console.error('   Stack:', error.stack);
            console.log('===== 3D VIDEO GENERATION FAILED =====\n');

            // Make sure we always send a response
            if (!res.headersSent) {
                return res.status(500).json({
                    success: false,
                    message: 'Unexpected server error',
                    error: error.message,
                    type: error.constructor.name
                });
            }
        }
    }
);

// ==================== VIDEO STATUS CHECK ====================
app.get('/api/kling/status/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: 'Task ID is required'
            });
        }

        console.log('📊 Checking status for:', taskId);

        const token = generateKlingToken();

        const response = await axios.get(
            `${KLING_API_BASE}/videos/image2video/${taskId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );

        const data = response.data.data;
        console.log('✅ Status response:', data.task_status);

        let status = 'processing';
        let progress = 0;
        let videoUrl = null;

        switch (data.task_status) {
            case 'succeed':
                status = 'completed';
                progress = 100;
                videoUrl = data.task_result?.videos?.[0]?.url;
                break;
            case 'failed':
                status = 'failed';
                break;
            case 'processing':
                status = 'processing';
                progress = 50;
                break;
            case 'submitted':
                status = 'processing';
                progress = 10;
                break;
        }

        const statusData = {
            status: status,
            progress: progress,
            videoUrl: videoUrl,
            ...(status === 'failed' && {
                error: data.task_status_msg || 'Video generation failed'
            })
        };

        res.json({ success: true, data: statusData });

    } catch (error) {
        console.error('❌ Status check error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.message || error.message,
            details: error.response?.data
        });
    }
});

// ==================== ERROR HANDLERS ====================
// 404 handler
app.use((req, res) => {
    console.log('❌ 404:', req.path);
    res.status(404).json({
        error: "Route not found",
        path: req.path,
        availableRoutes: [
            "POST /api/tryon",
            "POST /api/kling/generate-tryon",
            "GET /api/kling/status/:taskId"
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("❌ Unhandled error:", err);

    // Don't send response if headers already sent
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        error: "Internal server error",
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log(`\n🚀 ===== SERVER STARTED =====`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`⏰ Time: ${new Date().toISOString()}`);
    console.log(`\n📋 Endpoints:`);
    console.log(`   • POST /api/tryon`);
    console.log(`   • POST /api/kling/generate-tryon`);
    console.log(`   • GET  /api/kling/status/:taskId`);
    console.log(`\n💡 Features:`);
    console.log(`   ✅ 2D Try-On (Fashn API)`);
    console.log(`   ✅ 3D Video (Kling AI v1.5)`);
    console.log(`   ✅ Cloudinary Storage`);
    console.log(`   ✅ Comprehensive Error Handling`);
    console.log(`\n=============================\n`);
});