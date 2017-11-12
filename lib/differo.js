const Differo = function ({ browser, imageWriter } = {}) {

  const screenshot = async ({ url, name }) => {
    if (!url) throw new Error("URL must be provided");
    if (!name) throw new Error("Name must be provided");

    await browser.load(url);
    const image = await browser.captureScreenshot();

    await imageWriter.write({ image, name });
  };

  const setImageWriter = (newImageWriter) => imageWriter = newImageWriter;

  this.screenshot = screenshot;
  this.setImageWriter = setImageWriter;
};

module.exports = { Differo };
