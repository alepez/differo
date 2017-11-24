const { Comparator} = require('../lib/comparator.js');
const { expect } = require('chai');

describe('Comparator', async () => {
  const comparator = new Comparator();

  /* DISABLED because it really compares two images */
  it.skip('Takes two images filename and visually compare', async () => {
    const result = await comparator.compare('1.png', '1.png');
    expect(result.equal).to.be.true;
  });

  /* DISABLED because it really compares two images */
  it.skip('Takes two images filename and visually compare', async () => {
    const result = await comparator.compare('1.png', '2.png');
    expect(result.equal).to.be.false;
  });
});

