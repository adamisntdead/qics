import { expect } from 'chai';

const gates = require('../src/index').gates;
const math = require('mathjs');

// Complex number i and -i for easy access
const i = math.complex(0, 1);
const negI = math.complex(0, -1);

/* #########################################
#                Cases                    #
######################################## */

describe('GenerateGate', () => {
  it('should create a 2 qubit CNOT gate', () => {
    expect(math.deepEqual(gates.generateGate('CNOT', 2, 1, 2), [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ])).to.equal(true);
  });

  it('should create a 3 qubit CNOT gate', () => {
    expect(math.deepEqual(gates.generateGate('CNOT', 3, 1, 3), [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0]
    ])).to.equal(true);
  });
});

describe('Gate Arrays', () => {
  it('should return correct gates', () => {
    expect(math.deepEqual(gates.X, [
      [0, 1],
      [1, 0]
    ])).to.equal(true);
    expect(math.deepEqual(gates.Y, [
      [0, negI],
      [i, 0]
    ])).to.equal(true);
    expect(math.deepEqual(gates.Z, [
      [1, 0],
      [0, -1]
    ])).to.equal(true);
    expect(math.deepEqual(gates.H, math.multiply(1 / math.sqrt(2), [
      [1, 1],
      [1, -1]
    ]))).to.equal(true);
    expect(math.deepEqual(gates.Id, [
      [1, 0],
      [0, 1]
    ])).to.equal(true);
    expect(math.deepEqual(gates.S, [
      [1, 0],
      [0, i]
    ])).to.equal(true);
    expect(math.deepEqual(gates.SDagger, math.conj(
      math.transpose(
        [
          [1, 0],
          [0, i]
        ]
      )
    ))).to.equal(true);
    expect(math.deepEqual(gates.T, [
      [1, 0],
      [0, math.pow(math.e, (math.multiply(i, math.pi / 4)))]
    ])).to.equal(true);
    expect(math.deepEqual(gates.TDagger, math.conj(
      math.transpose(
        [
          [1, 0],
          [0, math.pow(math.e, (math.multiply(i, math.pi / 4)))]
        ]
      )
    ))).to.equal(true);
  });
});
