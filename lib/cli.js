const minimist = require('minimist');
const { ImageWriter } = require('./image-writer.js');

const noop = () => {};

const CLI = function ({ write = noop, argv = [], differo, browser }) {
  argv = minimist(argv);

  if (!differo) throw new Error('differo instance must be defined');
  if (!browser) throw new Error('browser instance must be defined');

  const usage = (message) => {
    if (message) write(message + '\n');
    write(require('./help.js').text);
  }

  const run = async () => {
    if (argv['help'] || argv['h']) return usage();

    await browser.connect({
      host: argv['browser-host'],
      port: argv['browser-port']
    });

    const imageWriter = new ImageWriter();

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
  this.run = () => run().then(() => browser.close()).catch(() => browser.close());
};

module.exports = { CLI };
