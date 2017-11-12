const minimist = require('minimist');
const { ImageWriter } = require('./image-writer.js');
const path = require('path');

const noop = () => {};

const CLI = function ({ write = noop, argv = [], differo, browser }) {
  argv = minimist(argv);

  if (!differo) throw new Error('differo instance must be defined');

  const usage = (message) => {
    if (message) write(message + '\n');
    write(require('./help.js').text);
  }

  const run = async () => {
    if (argv['help'] || argv['h']) return usage();

    if (argv['screenshot'] && argv['rebase']) {
      return usage('--screenshot and --rebase are incompatible');
    }

    if (!browser) throw new Error('browser instance must be defined');

    await browser.connect({
      host: argv['browser-host'],
      port: argv['browser-port']
    });

    const options = {
      fs: {
        workdir: argv['workdir'] || '.',
        prefix: argv['prefix'] || '',
        suffix: argv['suffix'] || '',
      },
    };

    /* If a leading / is present, the path will override the workdir. */
    if (options.fs.prefix[0] !== '/') {
      options.fs.prefix = path.join(options.fs.workdir, options.fs.prefix);
    }

    const imageWriter = new ImageWriter({
      prefix: options.fs.prefix,
      suffix: options.fs.suffix,
    });

    differo.setImageWriter(imageWriter);

    if (argv['screenshot'] || argv['s']) {
      if (!argv['url']) return usage("Must specify an URL");
      if (!argv['name']) return usage("Must specify a name");

      await differo.screenshot({ url: argv['url'], name: argv['name'] });
      return;
    }

    if (argv['rebase']) {
      if (!argv['url']) return usage("Must specify an URL");
      if (!argv['name']) return usage("Must specify a name");

      await differo.rebase({ url: argv['url'], name: argv['name'] });
      return;
    }

    if (argv['diff']) {
      if (!argv['url']) return usage("Must specify an URL");
      if (!argv['name']) return usage("Must specify a name");

      await differo.diff({ url: argv['url'], name: argv['name'] });
      return;
    }

    /* Fallback to usage */
    return usage();
  };

  this.run = async () => {
    try {
      await run();
    } catch (e) {
      await write(e);
    }
    /* Always close browser when run completed */
    if (browser) await browser.close();
  }
};

module.exports = { CLI };
