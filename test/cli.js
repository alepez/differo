const { CLI } = require('../lib/cli.js');
const { expect } = require('chai');

const DifferoMock = function () {
  this.state = '';
  this.screenshot = (o) => this.state = 'screenshot:' + o.url;
};

describe('CLI', () => {
  it('Should write usage', () => {
    let out;
    const cli = new CLI({
      argv: ['--help'],
      write: (text) => out = text,
    });

    cli.run();
    expect(out).to.be.a.string;
    expect(out.split('\n')[0]).to.equal('Usage: differo [OPTION]... [URL]');
  });

  it.only('Should take screenshot', () => {
    const differo = new DifferoMock();

    const cli = new CLI({
      differo,
      argv: ['--screenshot', '--url', 'http://localhost:9222']
    });

    cli.run();
    expect(differo.state).to.equal('screenshot:http://localhost:9222')
  });
});
