const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const ImageWriter = function ({ type = 'png', prefix = '', suffix = '', writeFun = writeFile } = {}) {

  const write = async ({ src, name }) => {
    if (!src) throw new Error("ImageWriter.write: src must be defined");
    if (!name) throw new Error("ImageWriter.write: name must be defined");
    const filename = `${prefix}${name}${suffix}.${type}`;
    await writeFun(filename, src);
  };

  this.write = write;
};

module.exports = { ImageWriter };
