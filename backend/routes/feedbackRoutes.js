const express = require("express");

const router = express.Router();

const {

  getFeedback,

  submitFeedback,

  deleteFeedback,

} = require("../controllers/feedbackController");

router.get("/", getFeedback);

router.post("/", submitFeedback);

router.delete(
  "/:id",
  deleteFeedback
);

module.exports = router;