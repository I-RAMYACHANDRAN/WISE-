const VenueMap = require("../models/VenueMap");

// GET Venue Map
exports.getVenueMap = async (req, res) => {
  try {
    let venue = await VenueMap.findOne();

    if (!venue) {
      venue = await VenueMap.create({
        images: [],
      });
    }

    res.json(venue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Venue Map
exports.updateVenueMap = async (req, res) => {
  try {
    let venue = await VenueMap.findOne();

    if (!venue) {
      venue = await VenueMap.create({
        images: req.body.images || [],
      });
    } else {
      venue.images = req.body.images || [];

      await venue.save();
    }

    res.json(venue);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};