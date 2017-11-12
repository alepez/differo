const { Comparator} = require('../lib/comparator.js');
const { expect } = require('chai');

describe('Comparator', async () => {
  const comparator = new Comparator();

  it('Takes two images filename and visually compare', async () => {
    const result = await comparator.compare('1.png', '1.png');
    expect(result.equal).to.be.true;
  });
});

