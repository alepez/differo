const CDP = require('chrome-remote-interface');

const Browser = function (options) {
  const { host, port } = options;

  let client;
  let Page, Runtime;

  const init = async () => {
    ({ Page, Runtime } = client);
    await Promise.all([
      Page.enable(),
      Runtime.enable(),
    ]);
  };

  const connect = async () => {
    /* CDP is an EventEmitter, we wrap it inside a promise */
    return new Promise((resolve, reject) => {
      CDP({ host, port }, async (c) => {
        client = c;
        await init();
        resolve();
      }).on('error', reject);
    });
  };

  const close = () => {
    if (client) return client.close();
  };

  const load = async (url) => {
    await Page.navigate({ url });
    await Page.loadEventFired();
  };

  this.connect = connect;
  this.close = close;
  this.load = load;
};

module.exports = { Browser };
