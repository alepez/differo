const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const ImageWriter = function ({ type = 'png', prefix = '', suffix = '', writeFun = writeFile } = {}) {

  const write = async ({ image, name, overridePrefix, overrideSuffix }) => {
    if (!image) throw new Error("ImageWriter.write: image must be defined");
    if (!name) throw new Error("ImageWriter.write: name must be defined");
    const filename = `${overridePrefix || prefix}${name}${overrideSuffix || suffix}.${type}`;
    await writeFun(filename, image);
  };

  this.write = write;
};

module.exports = { ImageWriter };
