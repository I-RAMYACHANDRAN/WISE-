const express = require("express");

const router = express.Router();

const controller = require("../controllers/venueMapController");

console.log("Controller =", controller);

router.get("/", controller.getVenueMap);

router.put("/", controller.updateVenueMap);

module.exports = router;