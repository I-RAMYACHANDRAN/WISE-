const multer = require("multer");

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, "uploads/");

    },

    filename(req, file, cb) {

        const extension =
            file.originalname.split(".").pop();

        cb(
            null,
            "profile-" +
            Date.now() +
            "." +
            extension
        );

    },

});

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

        cb(null, true);

    } else {

        cb(
            new Error("Only images allowed."),
            false
        );

    }

};

module.exports = multer({

    storage,

    fileFilter,

});