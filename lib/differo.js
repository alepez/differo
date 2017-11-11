const Differo = function (options) {
  const { browser } = options;

  const screenshot = async (o) => {
    const { url } = o;
    await browser.load(url);
    const image = await browser.captureScreenshot();
    return image;
  };

  this.screenshot = screenshot;
};

module.exports = { Differo };
