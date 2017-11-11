const CDP = require('chrome-remote-interface');

const Browser = function (options) {
  const { host, port } = options;

  let client = null;
  let Page, Runtime;

  const initClient = () => {
    /* CDP is an EventEmitter, we wrap it inside a promise */
    return new Promise((resolve, reject) => {
      CDP({ host, port }, (c) => resolve(c))
        .on('error', reject);
    });
  };

  const connect = async () => {
    client = await initClient();
    ({ Page, Runtime } = client);
    await Promise.all([
      Page.enable(),
      Runtime.enable(),
    ]);
  };

  const close = () => {
    if (!client) return;
    client.close();
    client = null;
  };

  const load = async (url) => {
    await Page.navigate({ url });
    await Page.loadEventFired();
  };

  const captureScreenshot = async () => {
    const image = await client.Page.captureScreenshot({
      format: 'png',
      fromSurface: false
    });

    return Buffer.from(image.data, 'base64');
  };

  this.connect = connect;
  this.close = close;
  this.load = load;
  this.captureScreenshot = captureScreenshot;
};

module.exports = { Browser };
