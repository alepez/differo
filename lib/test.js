const Result = {
  OK: 0,
  REBASE: 1,
  FAIL: 2,
  ERROR: 255,
};

const Test = function ({ name, format }) {
  const run = async () => {
    console.log(`Running test "${name}"`);

    // FIXME test always ok, implement something!
    const result = { result: Result.OK, name };
    format.test(result);
    return result;
  };

  this.getName = () => name;
  this.run = run;
};

module.exports = { Test, Result };
