const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const ImageWriter = function ({ type = 'png', prefix = '', suffix = '', writeFun = writeFile } = {}) {

  const filename = ({ name, overridePrefix, overrideSuffix }) => {
    if (!name) throw new Error("ImageWriter.write: name must be defined");
    return `${overridePrefix || prefix}${name}${overrideSuffix || suffix}.${type}`;
  };

  const write = async ({ image, name, overridePrefix, overrideSuffix }) => {
    const f = filename({ name, overridePrefix, overrideSuffix });
    if (!image) throw new Error("ImageWriter.write: image must be defined");
    await writeFun(f, image);
    console.log(f);
    return f;
  };

  this.write = write;
  this.filename = filename;
};

module.exports = { ImageWriter };
