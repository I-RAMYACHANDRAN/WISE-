const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, "uploads/");
    },

    filename(req, file, cb) {

        const extension = file.originalname.split(".").pop();

        cb(
            null,
            "profile-" + Date.now() + "." + extension
        );
    },

});

const fileFilter = (req, file, cb) => {

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".jfif",
        ".webp"
    ];

    const extension = path.extname(file.originalname).toLowerCase();

    if (
        file.mimetype.startsWith("image/") ||
        allowedExtensions.includes(extension)
    ) {
        cb(null, true);
    } else {
        cb(
            new Error("Only image files are allowed."),
            false
        );
    }

};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;