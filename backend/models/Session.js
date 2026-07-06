const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "",
    },

    speakers: [
  {
    speakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "Speaker",
    },
      },
    ],

    venue: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    capacity: {
      type: Number,
      default: 100,
    },

    attendees: [
  {
    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    attendeeName: {
      type: String,
      required: true,
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },
    },
    ],

    feedbackSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);