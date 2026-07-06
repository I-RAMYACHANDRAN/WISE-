const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Speaker", speakerSchema);