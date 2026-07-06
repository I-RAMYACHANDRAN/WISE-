const express = require("express");

const router = express.Router();

const {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} = require("../controllers/speakerController");

router.get("/", getSpeakers);

router.post("/", createSpeaker);

router.put("/:id", updateSpeaker);

router.delete("/:id", deleteSpeaker);

module.exports = router;