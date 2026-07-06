const Announcement = require("../models/Announcement");
const User = require("../models/User");

// GET ALL ANNOUNCEMENTS
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      createdAt: -1,
    });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET UNREAD ANNOUNCEMENTS
exports.getUnreadAnnouncements = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const announcements = await Announcement.find({
      createdAt: {
        $gt: user.lastAnnouncementViewedAt,
      },
    }).sort({
      createdAt: -1,
    });

    res.json({
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE ANNOUNCEMENT
exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);

    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE ANNOUNCEMENT
exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(announcement);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE ANNOUNCEMENT
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);

    res.json({
      message: "Announcement deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// MARK ANNOUNCEMENTS AS VIEWED
exports.markAnnouncementsViewed = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.lastAnnouncementViewedAt = new Date();

    await user.save();

    res.json({
      message: "Announcements marked as viewed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};