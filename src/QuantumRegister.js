const math = require('./math/math');
const weighted = require('weighted');
const gates = require('./gates');

class Register {
	constructor(numQubits) {
		this.numQubits = numQubits;
		// The number of amplitudes needed is 2^n, Where N is the number of qubits.
		// The math.zeros function Creates a matrix of 0s, ie. math.zeros(5) = [0,
		// 0, 0, 0, 0]
		this.amplitudes = math
			.zeros(math.pow(2, numQubits))
			.toArray();
		// Set the chance of getting all Zeros to 1
		this.amplitudes[0] = 1;
		// Set the fact it has not been measured
		this.measured = false;
	}

	applyGate(gate, qubit1, qubit2 = -1) {
		if (this.measured) {
			throw new Error('Cannot Apply Gate to a Measured Quantum Register');
		} else {
			const gateMatrix = gates.generateGate(gate,
				this.numQubits,
				qubit1,
				qubit2);
			this.amplitudes = math.multiply(this.amplitudes, gateMatrix);
		}
	}

	measure() {
		if (this.measured) {
			return this.value;
		}

		// Get a list of probabilities by squaring the absolute value of the
		// amplitudes.
		let probabilities = [];
		math.forEach(this.amplitudes, (val) => {
			let probability = math.pow(math.abs(val), 2);
			probabilities.push(probability);
		});

		// Choose an item by making a list of numbers 0 to the length of the
		// probabilities array. Then, use the probabilities array as the weights
		// for the picker.
		let results = math
			.zeros(probabilities.length)
			.toArray()
			.map((val, index) => index);


		// Convert to Binary, add extra 0's if needed.
		this.value = Number(weighted.select(results, probabilities)).toString(2);

		if (this.value.length < this.numQubits) {
			this.value = '0'.repeat(this.numQubits - this.value.length) + this.value;
		}

		this.measured = true;
		return this.value;
	}
}

module.exports = Register;
