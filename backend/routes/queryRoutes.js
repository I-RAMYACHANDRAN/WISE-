const express = require("express");

const router = express.Router();

const {

  getQueries,

  createQuery,

  replyQuery,

} = require("../controllers/queryController");

router.get("/", getQueries);

router.post("/", createQuery);

router.put("/:id/reply", replyQuery);

module.exports = router;