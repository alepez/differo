const Differo = function ({ browser, imageWriter } = {}) {

  const screenshot = async ({ url, name, write = true }) => {
    if (!url) throw new Error("URL must be provided");
    if (!name) throw new Error("Name must be provided");

    await browser.load(url);
    const image = await browser.captureScreenshot();

    if (write) await imageWriter.write({ image, name });

    return image;
  };

  const rebase = async ({ url, name }) => {
    const image = await screenshot({ url, name, write: false });
    await imageWriter.write({ image, name, overrideSuffix: '.base' });
  };

  const setImageWriter = (newImageWriter) => imageWriter = newImageWriter;

  this.screenshot = screenshot;
  this.rebase = rebase;

  /* Not very clean, but CLI must change it after differo instance has
   * been created and injected into CLI */
  this.setImageWriter = setImageWriter;
};

module.exports = { Differo };
