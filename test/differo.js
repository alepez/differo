const { Differo } = require('../lib/differo.js');
const { expect } = require('chai');

const { Browser } = require('../lib/browser.js'); // FIXME Mock

describe('Differo', async () => {
  const browser = new Browser({ host: 'localhost', port: 9222 });

  before(() => browser.connect()); // FIXME mock should not need it
  after(() => browser.close()); // FIXME mock should not need it

  const differo = new Differo({ browser });

  it('Should take a screenshot, gived an URL, return a PNG buffer', async () => {
    const result = await differo.screenshot({ 'url': 'http://localhost' });
    expect(result).to.be.an.instanceof(Buffer);
    expect(result.slice(1, 4).toString()).to.equal('PNG');
  });
});
