const { CLI } = require('../lib/cli.js');
const { expect } = require('chai');
const sinon = require('sinon');
const helpText = require('../lib/help.js').text;

const DifferoMock = function () {
  this.screenshot = sinon.spy();
};

describe('CLI', () => {
  it('Should write usage', () => {
    const differo = new DifferoMock();
    const write = sinon.spy();

    const cli = new CLI({
      argv: ['--help'],
      write,
      differo,
    });

    cli.run();
    expect(write.calledOnce).to.be.true;
    expect(write.getCall(0).args[0]).to.equal(helpText);
  });

  it('Should take screenshot', () => {
    const differo = new DifferoMock();

    const cli = new CLI({
      differo,
      argv: ['--screenshot', '--url', 'http://localhost:9222']
    });

    cli.run();
    expect(differo.screenshot.calledWith([{ url: 'http://localhost:9222' }]))
  });
});
