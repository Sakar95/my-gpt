const express = require("express");
const multer = require("multer");
const { uploadAndGenerateContent } = require("../controllers/Image");
const { auth } = require("../middlewares/auth");

const router = express.Router();

// Set up multer for file handling, no need for local storage
const upload = multer({
    storage : multer.diskStorage({}),
    limits : {fileSize : 500000}
});

// Route for uploading file and generating content
router.post("/upload-and-generate", upload.single("file"), auth, uploadAndGenerateContent);

module.exports = router;
