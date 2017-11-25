const _ = require('lodash');
const { Result } = require('./test.js');

const Format = function ({ write = console.log } = {}) {

  const formatResult = (code) => {
    switch (code) {
      case Result.OK:
        return 'OK';
      case Result.REBASE:
        return 'REBASE';
      case Result.FAIL:
        return 'FAIL';
      case Result.ERROR:
        return 'ERROR';
    }
  }

  const test = ({ name, result }) => {
    write(`${name} ${formatResult(result)}`);
  };

  const batch = ({ tests }) => {
    _.each(tests, (t) => test(t));
  }

  this.test = test;
  this.batch = batch;
};

module.exports = { Format };
