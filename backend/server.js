const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

// Connect Database
connectDB();

// Import Routes
const sessionRoutes = require("./routes/sessionRoutes");
const speakerRoutes = require("./routes/speakerRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const venueMapRoutes = require("./routes/venueMapRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const queryRoutes = require("./routes/queryRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Create Express App
const app = express();

// =======================
// Middleware
// =======================
app.use(cors());

app.use(express.json());

// Static Files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);

app.use("/api/sessions", sessionRoutes);

app.use("/api/speakers", speakerRoutes);

app.use("/api/announcements", announcementRoutes);

app.use("/api/venue-map", venueMapRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/queries", queryRoutes);

app.use("/api/contact", contactRoutes);

// =======================
// Health Check
// =======================

app.get("/", (req, res) => {

  res.send("WISE Connect Backend Running 🚀");

});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});