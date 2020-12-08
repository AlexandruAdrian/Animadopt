const fs = require('fs');
const path = require('path')
const ErrorsFactory = require("../factories/errorsFactory");
const POST_PICTURES_PATH = path.join(__dirname, "../../uploads/posts");
const AVATAR_PICTURES_PATH = path.join(__dirname, "../../uploads/avatars");


function deletePostPictures(postId) {
  fs.readdir(POST_PICTURES_PATH, (err, files) => {
    if (err) {
      throw new ErrorsFactory('notfound', 'NotFound', 'Directory not found.');
    } else {
      files.forEach(file => {
        if (file.includes(postId)) {
          fs.unlink(`${POST_PICTURES_PATH}/${file}`, err => {
            if (err) {
              throw new ErrorsFactory('notfound', 'NotFound', 'File not found.');
            }
          });
        }
      })
    }
  });
}

function deleteUserPictures(userId) {
  fs.readdir(AVATAR_PICTURES_PATH, (err, files) => {
    if (err) {
      throw new ErrorsFactory('notfound', 'NotFound', 'Directory not found.');
    } else {
      files.forEach(file => {
        if (file.includes(userId)) {
          fs.unlink(`${AVATAR_PICTURES_PATH}/${file}`, err => {
            if (err) {
              throw new ErrorsFactory('notfound', 'NotFound', 'File not found.');
            }
          });
        }
      });
    }
  });
}

module.exports = {
  deletePostPictures,
  deleteUserPictures,
};
