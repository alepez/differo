const { resemble } = require('resemble');

const visuallyCompare = (l, r) => {
  return new Promise((resolve) => resemble(l).compareTo(r).onComplete(resolve));
};

const Comparator = function ({ threshold = 0.0000 } = {}) {

  const settings = {
    errorColor: { red: 255, green: 0, blue: 255 },
    errorType: 'movement',
    transparency: 0.25,
    largeImageThreshold: 2048,
    useCrossOrigin: false,
  };

  // TODO: Are resemble settings global to module?
  resemble.outputSettings(settings);

  const compare = async (l, h) => {
    const result = await visuallyCompare(l, h);
    const { misMatchPercentage, pngStream } = result;
    const mismatch = misMatchPercentage / 100;
    const equal = mismatch <= threshold;
    return { equal, mismatch, pngStream };
  };

  this.compare = compare;
};

module.exports = { Comparator };
