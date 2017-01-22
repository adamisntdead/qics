import { expect } from 'chai';

const gates = require('../src/index').gates;
const math = require('../src/math/math');

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
