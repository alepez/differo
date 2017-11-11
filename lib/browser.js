const CDP = require('chrome-remote-interface');

const Browser = function (options) {
  const { host, port } = options;

  let client;

  const connect = async () => {
    /* CDP is an EventEmitter, we wrap it inside a promise */
    return new Promise((resolve, reject) => {
      CDP({ host, port }, async (c) => {
        client = c;
        resolve();
      }).on('error', reject);
    });
  };

  const close = () => {
    if (client) return client.close();
  }

  this.connect = connect;
  this.close = close;
};

module.exports = { Browser };
