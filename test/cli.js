const { CLI } = require('../lib/cli.js');
const { expect } = require('chai');

describe('CLI', () => {
  it('Should write usage', () => {
    let out;
    const cli = new CLI({
      write: (text) => {
        out = text;
      },
      argv: ['--help']
    });

    cli.run();
    expect(out).to.be.a.string;
    expect(out.split('\n')[0]).to.equal('Usage: differo [OPTION]... [URL]');
  });
});
