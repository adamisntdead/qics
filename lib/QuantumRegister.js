'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var math = require('./math/math');
var weighted = require('weighted');
var gates = require('./gates');

var Register = function () {
	function Register(numQubits) {
		_classCallCheck(this, Register);

		this.numQubits = numQubits;
		// The number of amplitudes needed is 2^n, Where N is the number of qubits.
		// The math.zeros function Creates a matrix of 0s, ie. math.zeros(5) = [0,
		// 0, 0, 0, 0]
		this.amplitudes = math.zeros(math.pow(2, numQubits)).toArray();
		// Set the chance of getting all Zeros to 1
		this.amplitudes[0] = 1;
		// Set the fact it has not been measured
		this.measured = false;
	}

	_createClass(Register, [{
		key: 'applyGate',
		value: function applyGate(gate, qubit1) {
			var qubit2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

			if (this.measured) {
				throw new Error('Cannot Apply Gate to a Measured Quantum Register');
			} else {
				var gateMatrix = gates.generateGate(gate, this.numQubits, qubit1, qubit2);
				this.amplitudes = math.multiply(this.amplitudes, gateMatrix);
			}
		}
	}, {
		key: 'measure',
		value: function measure() {
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