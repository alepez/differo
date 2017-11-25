const _ = require('lodash');

const evaluate = (str) => eval('(function(){ return ' + str + '})()');

const Batch = function ({ data }) {
  if (typeof data === 'string') {
    data = evaluate(data);
  } else if (typeof data !== 'object') {
    throw new Error("Batch: data must be a String or an Object");
  }

  if (data instanceof Buffer) {
    data = evaluate(data.toString('utf8'));
  } else {
    /* Make sure we do not touch passed object */
    data = _.cloneDeep(data);
  }

  this.getData = () => _.cloneDeep(data);
};

module.exports = { Batch };
