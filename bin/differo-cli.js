#!/usr/bin/env node

const { CLI } = require('../lib/cli.js');
const { Differo } = require('../lib/differo.js');
const { Browser } = require('../lib/browser.js');
const { Comparator } = require('../lib/comparator.js');

const comparator = new Comparator();
const browser = new Browser();
const differo = new Differo({ browser, comparator });

const cli = new CLI({
  write: console.log,
  argv: process.argv,
  differo,
  browser,
});

cli.run();
