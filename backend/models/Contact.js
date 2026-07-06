const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // Conference Chair
    chairName: {
      type: String,
      default: "",
    },

    chairDesignation: {
      type: String,
      default: "Conference Chair",
    },

    chairEmail: {
      type: String,
      default: "",
    },

    chairPhone: {
      type: String,
      default: "",
    },

    // Conference Coordinator 1
    coordinator1Name: {
      type: String,
      default: "",
    },

    coordinator1Designation: {
      type: String,
      default: "Conference Coordinator",
    },

    coordinator1Email: {
      type: String,
      default: "",
    },

    coordinator1Phone: {
      type: String,
      default: "",
    },

    // Conference Coordinator 2
    coordinator2Name: {
      type: String,
      default: "",
    },

    coordinator2Designation: {
      type: String,
      default: "Conference Coordinator",
    },

    coordinator2Email: {
      type: String,
      default: "",
    },

    coordinator2Phone: {
      type: String,
      default: "",
    },

    // Help Desk
    helpDeskLocation: {
      type: String,
      default: "",
    },

    helpDeskHours: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);