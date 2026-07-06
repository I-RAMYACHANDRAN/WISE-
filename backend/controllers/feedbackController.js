const Feedback = require("../models/Feedback");
const Session = require("../models/Session");

// ====================================
// Get All Feedback
// ====================================

const getFeedback = async (req, res) => {

  try {

    const feedback = await Feedback.find().sort({
      createdAt: -1,
    });

    res.json(feedback);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ====================================
// Save Feedback
// ====================================

const submitFeedback = async (req, res) => {

  try {

    const {

      attendeeId,
      attendeeName,

      sessionId,
      sessionTitle,

      overallRating,
      contentRating,
      speakerRating,
      organizationRating,
      inspirationRating,

      comments,

    } = req.body;

    const feedback = await Feedback.create({

      attendeeId,
      attendeeName,

      sessionId,
      sessionTitle,

      overallRating,
      contentRating,
      speakerRating,
      organizationRating,
      inspirationRating,

      comments,

    });

    await Session.findByIdAndUpdate(
      sessionId,
      {
        feedbackSubmitted: true,
      }
    );

    res.status(201).json(feedback);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};
// ====================================
// Delete Feedback
// ====================================

const deleteFeedback = async (req, res) => {

  try {

    await Feedback.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {

  getFeedback,

  submitFeedback,

  deleteFeedback,

};