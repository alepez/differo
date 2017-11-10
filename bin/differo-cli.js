#!/usr/bin/env node

const { CLI } = require('../lib/cli.js');

const cli = new CLI({
  write: console.log,
  argv: process.argv,
});

cli.run();
