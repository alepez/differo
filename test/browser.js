const { Browser } = require('../lib/browser.js');
const { expect } = require('chai');

describe('Browser', () => {
  it('Should connect', async () => {
    const browser = new Browser({
      hostname: 'localhost',
      port: 9222,
    });

    const ok = await browser.ready();
    expect(ok).to.be.true;
  });
});
