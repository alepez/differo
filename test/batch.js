const { Batch } = require('../lib/batch.js');
const { expect } = require('chai');

describe.only('Batch', () => {
  it('Should throw if data is of wrong type', () => {
    expect(() => {
      new Batch({ data: 1 });
    }).to.throw(Error);
  });

  it('Should accept an evaluable string', () => {
    new Batch({ data: "{ foo: 42 }" });
  });

  it('Should return data with getData()', () => {
    const batch = new Batch({ data: "{ foo: 42 }" });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Should accept Buffer', () => {
    const batch = new Batch({ data: new Buffer("{foo:42}") });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Should accept Object literal', () => {
    const batch = new Batch({ data: { foo: 42 } });
    const data = batch.getData();
    expect(data.foo).to.equal(42);
  });

  it('Data return from getData should be a deep copy', () => {
    const batch = new Batch({ data: { foo: 42, inner: { bar: 11 }} });
    const data = batch.getData();
    expect(data.inner.bar).to.equal(11);
    data.inner.bar = 22;
    const data2 = batch.getData();
    expect(data2.inner.bar).to.equal(11);
  });

});
