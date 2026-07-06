const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
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

    subject: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    reply: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Query", querySchema);