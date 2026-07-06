const express = require("express");

const router = express.Router();

const {
  getAnnouncements,
  getUnreadAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  markAnnouncementsViewed,
} = require("../controllers/announcementController");

// Get all announcements
router.get("/", getAnnouncements);

// Get unread announcements for a user
router.get("/unread/:userId", getUnreadAnnouncements);

// Create announcement
router.post("/", createAnnouncement);

// Update announcement
router.put("/:id", updateAnnouncement);

// Mark announcements as viewed
router.put("/viewed/:userId", markAnnouncementsViewed);

// Delete announcement
router.delete("/:id", deleteAnnouncement);

module.exports = router;