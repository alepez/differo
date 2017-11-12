const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const ImageWriter = function ({ type = 'png', prefix = '', suffix = '', writeFun = writeFile } = {}) {

  const write = async ({ image, name }) => {
    if (!image) throw new Error("ImageWriter.write: image must be defined");
    if (!name) throw new Error("ImageWriter.write: name must be defined");
    const filename = `${prefix}${name}${suffix}.${type}`;
    await writeFun(filename, image);
  };

  this.write = write;
};

module.exports = { ImageWriter };
