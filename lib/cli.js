const minimist = require('minimist');

const CLI = function (options) {
  const { write } = options;

  const argv = minimist(options.argv);

  const usage = () => {
    write(require('./help.js').text);
  }

  const run = () => {
    if (argv['help'] || argv['h']) return usage();

    /* Fallback to usage */
    return usage();
  };

  this.run = run;
};

module.exports = { CLI };
