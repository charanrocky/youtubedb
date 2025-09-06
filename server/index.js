import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const VideoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  channel: String,
  thumbnail: String,
  duration: String,
});

//MONGO_URL=mongodb+srv://charanrocky441_db_user:rocky@cluster0.dvyvxp0.mongodb.net/

const Video = mongoose.model("Video", VideoSchema);

// YouTube API
const YT_API = "https://www.googleapis.com/youtube/v3/videos";
const YT_KEY = process.env.YOUTUBE_API_KEY;

/**
 * STEP 1: SEED metadata from YouTube API and save to DB
 */
app.get("/seed", async (req, res) => {
  try {
    const docs = await Video.find({}, { videoId: 1, _id: 0 });
    if (!docs.length) {
      return res.status(400).json({ message: "No videoIds in DB" });
    }

    const ids = docs.map((d) => d.videoId).join(",");
    console.log("📡 Fetching YouTube metadata for:", ids);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${YT_KEY}`
    );

    const ytData = await response.json();

    console.log("📩 YT API Response:", ytData);

    if (!ytData.items) {
      return res.status(500).json({ error: "YouTube API failed" });
    }

    // Update DB with metadata
    for (let item of ytData.items) {
      await Video.updateOne(
        { videoId: item.id },
        {
          $set: {
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.medium.url,
            duration: item.contentDetails.duration,
          },
        }
      );
    }

    res.json({ message: "✅ Metadata seeded into MongoDB" });
  } catch (err) {
    console.error("❌ Error seeding:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * STEP 2: Fetch enriched videos from DB
 */
app.get("/videos", async (req, res) => {
  try {
    const enrichedVideos = await Video.find({});
    res.json(enrichedVideos);
  } catch (err) {
    console.error("❌ Error fetching videos:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
