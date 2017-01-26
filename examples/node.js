var qics = require('../lib/index.js');

// ############################################
//            Quantum Mesurment              #
// ############################################
// This experement will prepare 2 states, of a
// Single qubit, and of 5 qubits, and will just
// Measure them

// New Register with 1 qubit
var oneQubit = new qics.Register(1);
console.log('One Qubit: ' + oneQubit.measure());

// New Register with 5 qubits
var fiveQubits = new qics.Register(5);
console.log('Five Qubits: ' + fiveQubits.measure());

// #############################################
//            Correct Notation                #
// #############################################
// This Experement is the same as the last, but just puts the
// Correct Notation When Printed. (Its called Dirac or Bra-Ket Notation)

console.log('One Qubit (Correct Notation): |' + oneQubit.measure() + '>');
console.log('Five Qubits (Correct Notation): |' + fiveQubits.measure() + '>');

// #############################################
//          Simple Quantum Experement        #
// #############################################
// This experement will just apply a pauli-X / NOT Gate
// to a single qubit, and then measure!
// New Single Qubit Quantum Register, if mesured now it would result in 0

var NOT = new qics.Register(1);
// Apply Pauli-X Gate
NOT.applyGate('X', 1);
// Now we have a finished State, we can measure and print it to the console
console.log('NOT Gate: |' + NOT.measure() + '>');


// #############################################
//                 Swap 2 Qubits             #
// #############################################
// Here, We Will Apply a Pauli-X Gate / NOT Gate
// To the first qubit, and then after the algorithm,
// it will be swapped to the second qubit.

// New Quantum Register of 2 qubits
var Swap = new qics.Register(2);
// Apply The NOT Gate. If Measured Now, it should be 10
Swap.applyGate('X', 1);

// Start the swap algorithm
Swap.applyGate('CNOT', 1, 2);
Swap.applyGate('H', 1);
Swap.applyGate('H', 2);
Swap.applyGate('CNOT', 1, 2);
Swap.applyGate('H', 1);
Swap.applyGate('H', 2);
Swap.applyGate('CNOT', 1, 2);
// End the swap algorithm

// Measure the State, Should be 01
console.log('SWAP: |' + Swap.measure() + '>');

// #############################################
//               Fair Coin Flip              #
// #############################################
// Shown in this 'Experement', is a so called 'Fair Coin Flip',
// Where a state will be prepared, that has an equal chance of
// Flipping to Each Possible State. to do this, the Hadamard
// Gate will be used.

// New Quantum Register of 1 Qubit (As a coin has only 2 states)
var FairCoinFlip = new qics.Register(1);
// If measured at this point, it should be |0>

// Apply the hadamard gate, now theres an even chance of measuring 0 or 1
FairCoinFlip.applyGate('H', 1);
// Now its flipped, so we can test

// Now, the state will be measured, flipping the state to
// either 0 or 1. If its 0, we will say "Heads", or if its
// 1, we will say "Tails"
var FairCoinFlipAnswer = FairCoinFlip.measure();

if (FairCoinFlipAnswer === '0') {
  console.log('FairCoinFlip: Heads');
} else if (FairCoinFlipAnswer === '1') {
  console.log('FairCoinFlip: Tails');
}

// #############################################
// #             CNOT Gate                     #
// #############################################
// In this experement, 4 states will be prepared, {00, 01, 10, 11}
// And then the same CNOT Gate will be run on them,
// To Show The Effects of the CNOT.
// The Target Qubit will be 2, and the control 1

// New Quantum Register of 2 Qubits, done 4 times.
// If any are measured at this time, the result will be 00
var ZeroZero = new qics.Register(2);
var ZeroOne = new qics.Register(2);
var OneZero = new qics.Register(2);
var OneOne = new qics.Register(2);

// Now prepare Each Into The State Based On Their Name
// ZeroZero Will be left, as thats the first state anyway
ZeroOne.applyGate('X', 2);
OneZero.applyGate('X', 1);
OneOne.applyGate('X', 1);
OneOne.applyGate('X', 2);

// Now, a CNOT Will Be Applied To Each.
ZeroZero.applyGate('CNOT', 1, 2);
ZeroOne.applyGate('CNOT', 1, 2);
OneZero.applyGate('CNOT', 1, 2);
OneOne.applyGate('CNOT', 1, 2);

// Print the results.
console.log('CNOT on 00: |' + ZeroZero.measure() + '>');
console.log('CNOT on 01: |' + ZeroOne.measure() + '>');
console.log('CNOT on 10: |' + OneZero.measure() + '>');
console.log('CNOT on 11: |' + OneOne.measure() + '>');


// #############################################
// #             Random Big Circut             #
// #############################################
// This is just a big circut... No real point to it

var Random = new qics.Register(5);
Random.applyGate('H', 1);
Random.applyGate('Z', 2);
Random.applyGate('S', 3);
Random.applyGate('Z', 4);
Random.applyGate('SDagger', 5);
Random.applyGate('CNOT', 1, 2);
Random.applyGate('Y', 3);
Random.applyGate('S', 4);
Random.applyGate('Id', 5);
Random.applyGate('SDagger', 1);
Random.applyGate('X', 3);
Random.applyGate('H', 5);
Random.applyGate('S', 2);
Random.applyGate('CNOT', 5, 4);
Random.applyGate('Id', 1);
Random.applyGate('S', 2);
Random.applyGate('CNOT', 4, 3);
Random.applyGate('SDagger', 5);
Random.applyGate('T', 2);
Random.applyGate('T', 3);
Random.applyGate('TDagger', 2);

console.log('Big Circut: |' + Random.measure() + '>');

// #############################################
// #               Add Functions               #
// #############################################
// This will create a new subclass of register with a
// function, notAll which will add a NOT gate to every
// qubit in the register.
// NOTE: Uses ES2015 Class Syntax


class betterRegister extends qics.Register {
    notAll() {
        for (let i = 1; i <= this.numQubits; i++) {
            this.applyGate('X', i);
        }
    }
}

const reg = new betterRegister(3);
reg.notAll();

console.log(reg.measure());
