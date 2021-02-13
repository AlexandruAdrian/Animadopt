const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890abcdef', 10)
const AVATARS_DIR = path.join(__dirname, "../public/uploads/avatars");
const POSTS_DIR = path.join(__dirname, "../public/uploads/posts");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      req.originalUrl.includes("avatar") ||
      req.originalUrl.includes("register")
    ) {
      checkDirAndCreate(AVATARS_DIR, cb);
    } else if (req.originalUrl.includes("posts")) {
      checkDirAndCreate(POSTS_DIR, cb);
    }
  },
  filename: (req, file, cb) => {
    if (req.originalUrl.includes("avatar")) {
      cb(
        null,
        req.user._id + "-" + nanoid() + path.extname(file.originalname)
      );
    } else if ( req.originalUrl.includes("posts")) {
      cb(null, "post-" + nanoid() +  path.extname(file.originalname))
    } else if (req.originalUrl.includes("register")) {
      cb(
        null,
        req.body.email + "-" + nanoid() + path.extname(file.originalname)
      );
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
  const UPLOADS_DIR = path.join(__dirname, "../public/uploads/");

  fs.access(UPLOADS_DIR, (err) => {
    if (err) {
      fs.mkdir(UPLOADS_DIR, (err) => {
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
