const { Differo, BASE_SUFFIX, DIFF_SUFFIX, NEW_SUFFIX } = require('../lib/differo.js');
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

  beforeEach(() => {
    browser.load.reset();
    browser.captureScreenshot.reset();
    imageWriter.write.reset();
  });

  it('Should take a screenshot using browser captureScreenshot and save it with ImageWriter', async () => {
    await differo.screenshot({ url: 'http://localhost', name: 'foo' });
    expect(browser.load.calledOnce).to.be.true;
    expect(browser.load.getCall(0).args).to.eql(['http://localhost']);
    expect(browser.captureScreenshot.calledOnce).to.be.true;
    expect(browser.captureScreenshot.getCall(0).args).to.eql([]);
    expect(imageWriter.write.calledOnce).to.be.true;
  });

  it('Should rebase and save it with ImageWriter', async () => {
    await differo.rebase({ url: 'http://localhost', name: 'foo' });
    expect(browser.load.calledOnce).to.be.true;
    expect(browser.load.getCall(0).args).to.eql(['http://localhost']);
    expect(browser.captureScreenshot.calledOnce).to.be.true;
    expect(browser.captureScreenshot.getCall(0).args).to.eql([]);
    expect(imageWriter.write.calledOnce).to.be.true;
    expect(imageWriter.write.getCall(0).args[0].overrideSuffix).to.equal(BASE_SUFFIX);
  });

  it('Should diff and save new and diff with ImageWriter', async () => {
    await differo.diff({ url: 'http://localhost', name: 'foo' });
    expect(browser.load.calledOnce).to.be.true;
    expect(browser.load.getCall(0).args).to.eql(['http://localhost']);
    expect(browser.captureScreenshot.calledOnce).to.be.true;
    expect(browser.captureScreenshot.getCall(0).args).to.eql([]);
    expect(imageWriter.write.calledTwice).to.be.true;
    expect(imageWriter.write.getCall(0).args[0].overrideSuffix).to.equal(NEW_SUFFIX);
    expect(imageWriter.write.getCall(1).args[0].overrideSuffix).to.equal(DIFF_SUFFIX);
  });
});
