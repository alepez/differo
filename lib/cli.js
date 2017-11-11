const minimist = require('minimist');

const noop = () => {};

const CLI = function ({ write = noop, argv = [], differo = null }) {
  argv = minimist(argv);

  if (!differo) throw new Error('differo instance must be defined');

  const usage = () => write(require('./help.js').text);

  const run = () => {
    if (argv['help'] || argv['h']) return usage();

    /* Fallback to usage */
    return usage();
  };

  this.run = run;
};

module.exports = { CLI };
