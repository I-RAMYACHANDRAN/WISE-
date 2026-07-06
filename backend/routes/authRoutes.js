const express = require("express");

const upload = require("../middleware/upload");

const router = express.Router();

const {

    register,

    login,

    getProfile,

    updateProfile,

    uploadProfilePhoto,

} = require("../controllers/authController");

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
    "/profile/:id/photo",
    upload.single("photo"),
    uploadProfilePhoto
);

router.get(
  "/profile/:id",
  getProfile
);

router.put(
  "/profile/:id",
  updateProfile
);

module.exports = router;