import { expect } from 'chai';

const Register = require('../src/index').Register;

/* #########################################
#                Cases                    #
######################################## */
// Single Qubit
const X = new Register(1);
X.applyGate('X', 1);

// Multiple qubits
const Multi = new Register(5);
Multi.applyGate('X', 4);

// CNOT gates
const CNOT1 = new Register(3);
CNOT1.applyGate('CNOT', 1, 3);

const CNOT2 = new Register(4);
CNOT2.applyGate('X', 3);
CNOT2.applyGate('CNOT', 3, 1);

const CNOT3 = new Register(2);
CNOT3.applyGate('X', 1);
CNOT3.applyGate('X', 2);
CNOT3.applyGate('CNOT', 1, 2);

// Apply to all
const ALL = new Register(10);
ALL.applyGateToAll('X');

describe('Register', () => {
  it('should support a single qubit in the register', () => {
    expect(X.measure()).to.equal('1');
  });

  it('should support multiple qubits in the register', () => {
    expect(Multi.measure()).to.equal('00010');
  });

  it('should support a CNOT Gate', () => {
    expect(CNOT1.measure()).to.equal('000');
    expect(CNOT2.measure()).to.equal('1010');
    expect(CNOT3.measure()).to.equal('10');
  });

  it('should support a "Remeasure" and return the same result', () => {
    expect(CNOT1.measure()).to.equal('000');
    expect(CNOT2.measure()).to.equal('1010');
    expect(CNOT3.measure()).to.equal('10');
  });

  it('should support apply a gate to every qubit in the register', () => {
    expect(ALL.measure()).to.equal('1111111111');
  });

  it('should throw error when applying a gate to measured register', () => {
    expect(CNOT1.applyGate.bind(CNOT1, 'X', 1)).to.throw(Error);
  });
});
