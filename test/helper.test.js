import { expect } from 'chai';

const qics = require('../src/index');

const helper = qics.helper;
const Register = qics.Register;

describe('isRegister', () => {
  it('Should Return True or False depending if object is register', () => {
    const reg = new Register(3);
    const obj = {};
    const str = 'Hello World';
    const num = 3;
    const func = (x) => x;

    expect(helper.isRegister(reg)).to.equal(true);
    expect(helper.isRegister(obj)).to.equal(false);
    expect(helper.isRegister(str)).to.equal(false);
    expect(helper.isRegister(num)).to.equal(false);
    expect(helper.isRegister(func)).to.equal(false);
  });
});

describe('isUnitary', () => {
  it('Should Return True or False if an array / matrix is unitary', () => {
    const unitary = [
      [1, 0],
      [0, 1]
    ];
    const alsoUnitary = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ];
    const notUnitary = [
      [1, 2, 3],
      [4, 2.6, 2],
      [9, 2, 4]
    ];

    expect(helper.isUnitary(unitary)).to.equal(true);
    expect(helper.isUnitary(alsoUnitary)).to.equal(true);
    expect(helper.isUnitary(notUnitary)).to.equal(false);
  });
});
