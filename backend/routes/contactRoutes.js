const express = require("express");

const router = express.Router();

const {
  getContact,
  updateContact,
} = require("../controllers/contactController");

// Get Contact Information
router.get("/", getContact);

// Update Contact Information
router.put("/", updateContact);

module.exports = router;