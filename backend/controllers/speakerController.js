const Speaker = require("../models/Speaker");

// Get all speakers
exports.getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find();

    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add speaker
exports.createSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);

    res.status(201).json(speaker);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update speaker
exports.updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(speaker);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete speaker
exports.deleteSpeaker = async (req, res) => {
  try {
    await Speaker.findByIdAndDelete(req.params.id);

    res.json({
      message: "Speaker deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};