const express = require("express");

const router = express.Router();

const {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  registerSession,
} = require("../controllers/sessionController");

router.get("/", getSessions);

router.post("/", createSession);

router.put("/:id", updateSession);

router.delete("/:id", deleteSession);

router.post("/:id/register",registerSession);

module.exports = router;