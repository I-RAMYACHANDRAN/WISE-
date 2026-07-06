const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    organization: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["attendee", "organizer"],
      default: "attendee",
    },

    // NEW FIELD
    lastAnnouncementViewedAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);