const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  fileUri: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FileUpload", fileUploadSchema);
