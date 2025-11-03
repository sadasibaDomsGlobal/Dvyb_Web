import { fashnService } from "../src/services";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).json({ message: "OK" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { modelImage, garmentImage, category } = req.body || {};

    if (!modelImage || !garmentImage) {
      return res.status(400).json({ error: "Both modelImage and garmentImage URLs are required." });
    }

    console.log("🧍 Model Image:", modelImage);
    console.log("👕 Garment Image:", garmentImage);

    const predictionId = await fashnService.startTryOn(modelImage, garmentImage, category);
    console.log("📡 Prediction started:", predictionId);

    const result = await fashnService.pollStatus(predictionId);

    return res.status(200).json({
      success: true,
      output: result.output,
      category: category || "auto",
    });
  } catch (err) {
    console.error("❌ TryOn API error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
