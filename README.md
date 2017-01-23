# Qics - _Quantum Idealistic Computer Simulator_

[![Greenkeeper badge](https://badges.greenkeeper.io/adamisntdead/qics.svg)](https://greenkeeper.io/)

[![GitHub issues](https://img.shields.io/github/issues/adamisntdead/qics.svg)](https://github.com/adamisntdead/qics/issues)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/adamisntdead/qics/master/LICENSE)
[![Travis](https://img.shields.io/travis/adamisntdead/qics.svg)](https://travis-ci.org/adamisntdead/qics)
[![npm](https://img.shields.io/npm/v/qics.svg)](https://www.npmjs.com/package/qics)

Qics is an Idealistic, Quantum Computer Simulation Library.
It works by holding a Quantum Register as a Matrix,
and then multiplying that against various
Gate Matrices.
For more information about the working,
see the `src` directory for the source code,
or see `examples/node.js` or the __Usage__ Section for information
on the usage of the module.

***

### Features
* A ['Universally Complete'](https://en.wikipedia.org/wiki/Quantum_gate#Universal_quantum_gates),  [Quantum Circuit](https://en.wikipedia.org/wiki/Quantum_circuit) Based Simulator
* Gate Expansion Function (To make a single qubit gate work on a register with multiple qubits)
* Relatively Simple To Use
* Inline Documentation with Docco

***

### Usage
Currently the library is available using Node.js and NPM.
To install the module, use the command:
```shell
npm install qics
```
(_NOTE: Works with Node.js Versions >= 4_)

If you want to use this in the browser, just add the `qics.js` or `qics.min.js`
from the `dist` folder

Then you are able to use the module.
When it's installed, _Qics_ exposes two classes,
`qics.Register` and `qics.gates`.

`qics.Register` is the main class, and is the basis of
the simulator.
It is used like any other class using the `new` keyword.
Once initiated, there is a number of methods, see below or
the Documentation.

`qics.gates` exposes all of the single qubit gates as 2D arrays.
It also has some static methods, such as `generateGate()`.
Again, see the documentation.

__Example simulation:__
```javascript
// Import the module
const qics = require('qics');

// Create a new Quantum Register with 3 Qubits
const reg = new qicks.Register(3);

// Apply some gates.
// Hadamard Gate
reg.applyGate('H', 1);
// CNOT Gate, with control as qubit 1, and the
// target as qubit 3
reg.applyGate('CNOT', 1, 3) ;

// Now measure the register. Should return either "000" or "101"
console.log(reg.measure());
```

***

### Documentation

This library is documented using Inline Prose Comments, and then generated using Docco.
The documentation is just source code comments, but the source isn't too complex, and the functions
are quite clear to use.

__To read the docs, Clone this repo and check out the `docs` folder!__
***

### Build
First you need to clone the repo from github:
```shell
git clone git://github.com/adamisntdead/qics.git
cd qics
```

Then install the dependencies:
```shell
npm install
```
Then you can run the build script:
```shell
npm run build
```
This will build the module, and output to the `lib` folder.
If you want to build for client side (i.e. in the browser), run
`npm run build:all` and then it will output _qics.js_ and _qics.min.js_ to the `dist` folder.

### Tests
To run the test for this module, after cloning and installing,
run:
```shell
npm run test
```
And it will run all of the tests.
