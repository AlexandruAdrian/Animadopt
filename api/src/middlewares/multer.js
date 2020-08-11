const multer = require("multer");
const path = require("path");
const fs = require("fs");

const avatarsDir = path.join(__dirname, "../../uploads/avatars");
const postsDir = path.join(__dirname, "../../uploads/posts");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("avatar")) {
      checkDirAndCreate(avatarsDir, cb);
    } else if (req.originalUrl.includes("posts")) {
      checkDirAndCreate(postsDir, cb);
    }
  },
  filename: (req, file, cb) => {
    if (req.originalUrl.includes("avatar")) {
      cb(
        null,
        req.user._id + "-" + Date.now() + path.extname(file.originalname)
      );
    } else if (req.originalUrl.includes("posts")) {
      cb(null, "post-" + Date.now() + path.extname(file.originalname));
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error: Doar imagini");
  }
}

function checkDirAndCreate(dir, cb) {
  // Check for uploads folder first
  const uploadsDir = path.join(__dirname, "../../uploads/");
  fs.access(uploadsDir, (err) => {
    if (err) {
      fs.mkdir(uploadsDir, (err) => {
        return;
      });
    }
    return;
  });

  fs.access(dir, (err) => {
    // Check if the folder exists and if it doesn't
    if (err) {
      // Create the folder
      fs.mkdir(dir, (err) => {
        // Save the file
        cb(null, dir);
      });
    } else {
      // If the folder already exists
      cb(null, dir); // save the file
    }
  });
}

module.exports = upload;
