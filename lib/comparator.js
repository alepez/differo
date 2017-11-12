const Comparator = function ({ threshold = 0.00 } = {}) {

  const compare = async (l, h) => {
    return {
      equal: true
    };
  };

  this.compare = compare;
};

module.exports = { Comparator };
