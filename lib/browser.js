const Browser = function (options) {
  const { hostname, port } = options;

  const ready = () => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(true);
      }, 1000);
    });
  };

  this.ready = ready;
};

module.exports = { Browser };
