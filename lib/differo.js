const { existsSync } = require('fs');

const BASE_SUFFIX = '.0_base';
const NEW_SUFFIX = '.1_new';
const DIFF_SUFFIX = '.2_diff';

const Differo = function ({ browser, imageWriter, comparator } = {}) {

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
    await imageWriter.write({ image, name, overrideSuffix: BASE_SUFFIX });
  };

  const diff = async ({ url, name }) => {
    const baseFilename = imageWriter.filename({ name, overrideSuffix: BASE_SUFFIX })

    if (!existsSync(baseFilename)) {
      console.log(`${baseFilename} does not exist. Rebase...`);
      return rebase({ url, name });
    }

    const image = await screenshot({ url, name, write: false });
    const newFilename = await imageWriter.write({ image, name, overrideSuffix: NEW_SUFFIX });

    const result = await comparator.compare(baseFilename, newFilename);

    await imageWriter.write({
      image: result.pngStream(),
      name,
      overrideSuffix: DIFF_SUFFIX
    });
  };

  const setImageWriter = (newImageWriter) => imageWriter = newImageWriter;

  this.screenshot = screenshot;
  this.rebase = rebase;
  this.diff = diff;

  /* Not very clean, but CLI must change it after differo instance has
   * been created and injected into CLI */
  this.setImageWriter = setImageWriter;
};

module.exports = { Differo, BASE_SUFFIX, NEW_SUFFIX, DIFF_SUFFIX };
