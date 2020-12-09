const fs = require('fs');
const ErrorsFactory = require("../factories/errorsFactory");

function deletePictures(modelId, path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      throw new ErrorsFactory('notfound', 'NotFound', 'Directory not found.');
    } else {
      deleteFiles(modelId, files, path);
    }
  });
}

function deleteFiles(modelId, files, path) {
  files.forEach(file => {
    if (file.includes(modelId)) {
      fs.unlink(`${path}/${file}`, err => {
        if (err) {
          throw new ErrorsFactory('notfound', 'NotFound', 'File not found.');
        }
      });
    }
  })
}

module.exports = deletePictures;
