const mongoose = require("mongoose");

const markerSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const venueImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Campus",
        "Building",
        "Floor Plan",
        "Navigation",
        "Hall",
      ],
      required: true,
    },

    building: {
      type: String,
      default: "",
      trim: true,
    },

    floor: {
      type: Number,
      default: null,
    },

    markers: {
      type: [markerSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);

const venueMapSchema = new mongoose.Schema(
  {
    images: {
      type: [venueImageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VenueMap", venueMapSchema);