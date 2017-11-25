const _ = require('lodash');

const evaluate = (str) => eval('(function(){ return ' + str + '})()');

const Batch = function ({ data, Test }) {
  if (typeof data === 'string') {
    data = evaluate(data);
  } else if (typeof data !== 'object') {
    throw new Error("Batch: data must be a String or an Object");
  } else if (data instanceof Buffer) {
    data = evaluate(data.toString('utf8'));
  } else {
    /* Make sure we do not touch passed object */
    data = _.cloneDeep(data);
  }

  const tests = _.map(data.tests || [], (test) => new Test(test));

  const runAll = () => _.each(tests, (test) => test.run());

  this.getData = () => _.cloneDeep(data);
  this.getTests = () => _.cloneDeep(tests);
  this.run = runAll;
};

module.exports = { Batch };
