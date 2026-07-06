const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
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

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    sessionTitle: {
      type: String,
      required: true,
    },

   overallRating: {
      type: Number,
      required: true,
    },

    contentRating: {
      type: Number,
      required: true,
    },

    speakerRating: {
      type: Number,
      required: true,
    },

    organizationRating: {
      type: Number,
      required: true,
    },

    inspirationRating: {
      type: Number,
      required: true,
    },

    comments: {
      type: String,
      default: "",
    },

      
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);