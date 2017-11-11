const { ImageWriter } = require('../lib/image-writer.js');
const { expect } = require('chai');
const sinon = require('sinon');

describe('ImageWriter', () => {
  const writeFun = sinon.spy();

  const imageWriter = new ImageWriter({
    type: 'png',
    prefix: '',
    suffix: '',
    writeFun,
  });

  it('Should throw when trying to write nothing', async () => {
    try {
      await imageWriter.write();
    } catch (e) {
      expect(e).to.be.an.instanceof(Error);
      return;
    }
    throw new Error("Should have thrown");
  });

  it('Should write a png buffer to a file', async () => {
    const src = new Buffer('00', 'hex');
    const name = 'test';
    await imageWriter.write({ src, name });
    expect(writeFun.calledOnce).to.be.true;
    expect(writeFun.getCall(0).args[0]).to.eql('test.png');
  });
});