const Gallery = require("../models/Gallery");

// ===========================
// Get Gallery
// ===========================

const getGallery = async (req, res) => {

  try {

    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(images);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===========================
// Add Image
// ===========================

const addGalleryImage = async (
  req,
  res
) => {

  try {

    const image = await Gallery.create(
      req.body
    );

    res.status(201).json(image);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ===========================
// Delete Image
// ===========================

const deleteGalleryImage = async (
  req,
  res
) => {

  try {

    await Gallery.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getGallery,

  addGalleryImage,

  deleteGalleryImage,

};