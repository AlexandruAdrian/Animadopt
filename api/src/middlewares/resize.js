const sharp = require('sharp');
const path = require('path');
const { has } = require('lodash');
const asyncForEach = require('../utilities/asyncForEach');

async function resize(req, res, next) {
  try {
    if (has(req, 'files')) {
      await asyncForEach(req.files, file => {
        sharp(file.path)
          .resize(1000, 760)
          .jpeg({ quality: 90 })
          .toFile(path.resolve(file.destination)) ;

      });
    } else {
      await sharp(req.file.path)
        .resize(1000, 760)
        .jpeg({ quality: 90 })
        .toFile(req.file.destination);
    }
  } catch (err) {
    next(err);
  }
  next();
}

module.exports = resize;
