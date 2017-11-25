const { Test, Result } = require('../lib/test.js');
const { expect } = require('chai');

describe.only('Test', () => {
  it('Should run and return a result', async () => {
    const test = new Test({ name: 'foo' });
    expect(test.getName()).to.equal('foo');
    const result = await test.run();
    expect(result).to.be.an('object');
    expect(result).to.be.an('object');
    expect(result.result).to.be.a('Number');
    expect(result.result).to.equal(Result.OK)
  });
});
