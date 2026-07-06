const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDir = path.resolve(__dirname, "../uploads");

console.log("Upload directory:", uploadDir);
console.log("Exists:", fs.existsSync(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination callback called");

    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    console.log("Filename callback called");

    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.json({
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;