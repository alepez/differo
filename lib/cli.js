const minimist = require('minimist');

const noop = () => {};

const CLI = function ({ write = noop, argv = [] }) {
  argv = minimist(argv);

  const usage = () => write(require('./help.js').text);

  const run = () => {
    if (argv['help'] || argv['h']) return usage();

    /* Fallback to usage */
    return usage();
  };

  this.run = run;
};

module.exports = { CLI };
