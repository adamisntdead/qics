'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var math = require('mathjs');
var weighted = require('weighted');
var gates = require('./gates');

var Register = function () {
	// This is the constructor for the Register, it takes a parameter
	// `numQubits` which is the number of Qubits in the register
	function Register(numQubits) {
		_classCallCheck(this, Register);

		this.numQubits = numQubits;
		// The number of amplitudes needed is 2^n, Where N is the number of qubits.
		// The math.zeros function Creates a matrix of 0s, ie. math.zeros(5) = [0,
		// 0, 0, 0, 0]
		this.amplitudes = math.matrix([math.zeros(math.pow(2, numQubits)).toArray()], 'sparse');

		// Set the chance of getting all Zeros to 1
		this.amplitudes = math.subset(this.amplitudes, math.index(0, 0), 1);
		// Set the fact it has not been measured
		this.measured = false;
	}

	// Apply a gate to the register.
	// The parameters, `gate` is a string with the name of the gate from the
	// gates class. `qubit1` is the place in the register of the qubit the gate
	// is being applied to. `qubit2` is, if a CNOT Gate is being used, its the
	// target qubit, and qubit1 is the control.


	_createClass(Register, [{
		key: 'applyGate',
		value: function applyGate(gate, qubit1) {
			var qubit2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

			if (this.measured) {
				// If it has already been measured, then you cannot apply a gate, so an
				// Error will be thrown
				throw new Error('Cannot Apply Gate to a Measured Quantum Register');
			} else {
				// Get the gate from the generateGates function, and then multiply the
				// amplitude vector against it
				var gateMatrix = gates.generateGate(gate, this.numQubits, qubit1, qubit2);

				this.amplitudes = math.multiply(this.amplitudes, gateMatrix);
			}
		}
		// Measure the qubit register

	}, {
		key: 'measure',
		value: function measure() {
			// If it has already been measured, just return that value
			if (this.measured) {
				return this.value;
			}

			// Get a list of probabilities by squaring the absolute value of the
			// amplitudes.
			var probabilities = [];
			math.forEach(this.amplitudes, function (val) {
				var probability = math.pow(math.abs(val), 2);
				probabilities.push(probability);
			});

			// Choose an item by making a list of numbers 0 to the length of the
			// probabilities array. Then, use the probabilities array as the weights
			// for the picker.
			var results = math.zeros(probabilities.length).toArray().map(function (val, index) {
				return index;
			});

			// Convert to Binary, add extra 0's if needed.
			this.value = Number(weighted.select(results, probabilities)).toString(2);

			if (this.value.length < this.numQubits) {
				this.value = '0'.repeat(this.numQubits - this.value.length) + this.value;
			}

			this.measured = true;
			return this.value;
		}
	}]);

	return Register;
}();

module.exports = Register;