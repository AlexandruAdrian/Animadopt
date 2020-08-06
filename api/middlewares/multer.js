const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dir = "./uploads/avatars";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("avatar")) {
      fs.access(dir, (err) => {
        // Check if the folder exists and if it doesn't
        if (err) {
          // Create the folder
          fs.mkdir(dir, (err) => {
            // Save the file
            cb(null, "./uploads/avatars");
          });
        } else {
          // If the folder already exists
          cb(null, "./uploads/avatars"); // save the file
        }
      });
    }
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
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

module.exports = upload;

// if (err) {
//   fs.mkdir("avatars", (err) => {
//     console.log(err);
//   });

//   if (req.originalUrl.includes("avatar")) {
//     cb(null, "./uploads/avatars");
//   } else {
//     cb(null, "./uploads/posts");
//   }
// } else {
//   if (req.originalUrl.includes("avatar")) {
//     cb(null, "./uploads/avatars");
//   } else {
//     cb(null, "./uploads/posts");
//   }
// }
