const CDP = require('chrome-remote-interface');

const Browser = function () {
  let client = null;
  let Page, Runtime;

  const initClient = ({ host, port }) => {
    let time = 0;
    let wait = 10;
    const maxTime = 1000;

    return new Promise((resolve, reject) => {
      const connect = () => {
        time += wait;

        CDP({ host, port }, (c) => resolve(c)).on('error', (e) => {
          if (time > maxTime) return reject(new Error("Timeout"));
          if (e.code !== 'ECONNREFUSED') return reject(e);
          wait *= 2;
          time += wait;
          setTimeout(connect, wait);
        });
      };

      connect();
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
