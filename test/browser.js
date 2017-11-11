const { Browser } = require('../lib/browser.js');
const { expect } = require('chai');

describe('Browser', () => {
  it('Should connect', async () => {
    const browser = new Browser({
      host: 'localhost',
      port: 9222,
    });

    /* This should not throw */
    await browser.connect();

    await browser.close();
  });

  it('Should throw exception if cannot connect', async () => {
    const browser = new Browser({
      host: 'localhost',
      port: 9221,
    });

    try {
      await browser.connect();
    } catch (e) {
      expect(e).to.be.an.instanceof(Error);
      return;
    }

    throw new Error("Should have thrown");
  });

});

describe('A connected browser', async () => {
  const browser = new Browser({
    host: 'localhost',
    port: 9222,
  });

  before(() => browser.connect());
  after(() => browser.close());

  it('Should load a page', async () => {
    /* This url should be loaded successfully */
    await browser.load('http://localhost:9222');
  });

  it('Should capture a screenshot as png Buffer', async () => {
    /* This url should be loaded successfully */
    await browser.load('http://localhost:9222');
    const pngData = await browser.captureScreenshot();
    expect(pngData).to.be.an.instanceof(Buffer);
    expect(pngData.slice(1, 4).toString()).to.equal('PNG');
  });
});
