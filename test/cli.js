const { CLI } = require('../lib/cli.js');
const { expect } = require('chai');
const sinon = require('sinon');
const helpText = require('../lib/help.js').text;

const Differo = function () {
  this.screenshot = sinon.spy();
  this.rebase = sinon.spy();
  this.setImageWriter = sinon.spy();
};

const Browser = function () {
  this.close = sinon.spy();
  this.connect = sinon.spy();
};

describe('CLI', () => {
  it('Should write usage', () => {
    const differo = new Differo();
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

  it('Should take screenshot', async () => {
    const differo = new Differo();
    const browser = new Browser();

    const cli = new CLI({
      differo,
      browser,
      argv: ['--screenshot', '--url', 'http://localhost:9222', '--name', 'ciao']
    });

    await cli.run();
    expect(differo.screenshot.calledOnce).to.be.true;
    expect(differo.screenshot.calledWith([{ url: 'http://localhost:9222', name: 'ciao' }]))
  });

  it('Should rebase screenshot', async () => {
    const differo = new Differo();
    const browser = new Browser();

    const cli = new CLI({
      differo,
      browser,
      argv: ['--rebase', '--url', 'http://localhost:9222', '--name', 'ciao']
    });

    await cli.run();
    expect(differo.rebase.calledOnce).to.be.true;
    expect(differo.rebase.calledWith([{ url: 'http://localhost:9222', name: 'ciao' }]))
  });
});
