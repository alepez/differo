const Result = {
  OK: 0,
  REBASE: 1,
  FAIL: 2,
  ERROR: 255,
};

const Test = function ({ name }) {
  const run = async () => {
    console.log(`Running test "${name}"`);

    const result = Result.OK;
    return { result };
  };

  this.getName = () => name;
  this.run = run;
};

module.exports = { Test, Result };
