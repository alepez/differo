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

    if (argv['screenshot'] || argv['s']) {
      if (!argv['url']) return usage("Must specify an URL");
      if (!argv['name']) return usage("Must specify a name");

      const buffer = await differo.screenshot({ url: argv['url'] });
      // TODO: Maybe refactory? Is image writing responsability of CLI or CORE?
      await imageWriter.write({ src: buffer, name: argv['name'] });

      return;
    }

    /* Fallback to usage */
    return usage();
  };

  /* Always close browser when run completed */
  this.run = () => run().then(() => browser && browser.close()).catch(() => browser && browser.close());
};

module.exports = { CLI };
