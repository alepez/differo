const { Differo } = require('../lib/differo.js');
const { expect } = require('chai');
const sinon = require('sinon');

const Browser = function () {
  this.load = sinon.spy();
  this.captureScreenshot = sinon.spy();
};

const ImageWriter = function () {
  this.write = sinon.spy();
};

describe('Differo', async () => {
  const browser = new Browser();
  const imageWriter = new ImageWriter();
  const differo = new Differo({ browser, imageWriter });

  it('Should take a screenshot using browser captureScreenshot and save it with ImageWriter', async () => {
    await differo.screenshot({ url: 'http://localhost', name: 'foo' });
    expect(browser.load.calledOnce).to.be.true;
    expect(browser.load.getCall(0).args).to.eql(['http://localhost']);
    expect(browser.captureScreenshot.calledOnce).to.be.true;
    expect(browser.captureScreenshot.getCall(0).args).to.eql([]);
    expect(imageWriter.write.calledOnce).to.be.true;
  });
});
