const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');

const readPNG = (filename) => {
  return new Promise((resolve, reject) => {
    const img = fs.createReadStream(filename)
      .pipe(new PNG())
      .on('parsed', () => resolve(img))
      .on('error', reject);
  });
}

const haveSameSize = ({ l, r }) => {
  return l.width === r.width && l.height === r.height;
}

const visuallyCompare = async ({ l, r, settings }) => {
  // FIXME should compare images of different size, like resemble.js do
  if (!haveSameSize({l, r})) throw new Error('Cannot compare images of different size');

  const limg = await readPNG(l);
  const rimg = await readPNG(r);
  const { width, height } = limg;
  const diff = new PNG({ width, height });
  const result = pixelmatch(limg.data, rimg.data, diff.data, width, height, settings);

  return {
    mismatchRatio: result,
    pngStream: diff.pack(),
  };
};

const Comparator = function ({ threshold = 0.0000 } = {}) {

  const settings = { threshold };

  const compare = async (l, r) => {
    const result = await visuallyCompare({ l, r, settings });
    const { mismatchRatio, pngStream } = result;
    const equal = mismatchRatio <= threshold;
    return { equal, mismatchRatio, pngStream };
  };

  this.compare = compare;
};

module.exports = { Comparator };
