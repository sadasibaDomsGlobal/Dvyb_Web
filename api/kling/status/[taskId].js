// api/kling/status/[taskId].js

import axios from 'axios';
import crypto from 'crypto';

const KLING_API_BASE = 'https://api.klingai.com/v1';
const KLING_ACCESS_KEY = process.env.KLING_ACCESS_KEY;
const KLING_SECRET_KEY = process.env.KLING_SECRET_KEY;

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
    console.error('Token generation failed:', error);
    throw new Error('Failed to generate authentication token');
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    //  GET taskId from query params (Vercel way)
    const { taskId } = req.query;
    
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
    console.log(' Status response:', data.task_status);

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
      default:
        status = 'processing';
        progress = 25;
    }

    const statusData = {
      status: status,
      progress: progress,
      videoUrl: videoUrl,
      rawStatus: data.task_status,
      ...(status === 'failed' && { 
        error: data.task_status_msg || 'Video generation failed' 
      })
    };

    return res.status(200).json({ 
      success: true, 
      data: statusData 
    });

  } catch (error) {
    console.error(' Status check error:', error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
      details: error.response?.data
    });
  }
}