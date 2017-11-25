const { Batch } = require('../lib/batch.js');
const { expect } = require('chai');
const sinon = require('sinon');

const Test = function (data) {
  this.run = sinon.spy();
  this.name = data.name;
};

describe('Batch', () => {
  it('Should throw if data is of wrong type', () => {
    expect(() => {
      new Batch({ data: 1 });
    }).to.throw(Error);
  });

  it('Should accept an evaluable string', () => {
    new Batch({ data: "{ foo: 42 }", Test });
  });

  it('Should return data with getData()', () => {
    const batch = new Batch({ data: "{ foo: 42 }", Test });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Should accept Buffer', () => {
    const batch = new Batch({ data: new Buffer("{foo:42}"), Test });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Should accept Object literal', () => {
    const batch = new Batch({ data: { foo: 42 }, Test });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Data return from getData should be a deep copy', () => {
    const batch = new Batch({ data: { foo: 42, inner: { bar: 11 } }, Test });
    const data = batch.getData();
    expect(data.inner.bar).to.equal(11);
    data.inner.bar = 22;
    const data2 = batch.getData();
    expect(data2.inner.bar).to.equal(11);
  });

  it('Should read tests from tests array in data', () => {
    const batch = new Batch({ data: { tests: [{ name: 'foo' }] }, Test });
    const tests = batch.getTests();
    expect(tests[0].name).to.equal('foo');
  });

  it('Should run all tests', () => {
    const batch = new Batch({ data: { tests: [{ name: 'foo' }, { name: 'bar' }] }, Test });
    batch.run();
    expect(batch.getTests()[0].run.calledOnce).to.be.true;
    expect(batch.getTests()[1].run.calledOnce).to.be.true;
  });

});
