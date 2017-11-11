const CDP = require('chrome-remote-interface');

const Browser = function () {
  let client = null;
  let Page, Runtime;

  const initClient = ({ host, port }) => {
    /* CDP is an EventEmitter, we wrap it inside a promise */
    return new Promise((resolve, reject) => {
      CDP({ host, port }, (c) => resolve(c))
        .on('error', reject);
    });
  };

  const connect = async ({ host = 'localhost', port = 9222 }) => {
    client = await initClient({ host, port });
    ({ Page, Runtime } = client);
    await Promise.all([
      Page.enable(),
      Runtime.enable(),
    ]);
  };

  const close = async () => {
    if (!client) return;
    await client.close();
    client = null;
  };

  const load = async (url) => {
    await Page.navigate({ url });
    await Page.loadEventFired();
  };

  const captureScreenshot = async () => {
    const image = await Page.captureScreenshot({
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
