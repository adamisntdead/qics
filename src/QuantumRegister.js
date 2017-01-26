const math = require('mathjs');
const weighted = require('weighted');
const gates = require('./gates');

class Register {
	// This is the constructor for the Register, it takes a parameter
	// `numQubits` which is the number of Qubits in the register
	constructor(numQubits) {
		this.numQubits = numQubits;
		// The number of amplitudes needed is 2^n, Where N is the number of qubits.
		// The math.zeros function Creates a matrix of 0s, ie. math.zeros(5) = [0,
		// 0, 0, 0, 0]
		this.amplitudes = math.matrix([math
			.zeros(math.pow(2, numQubits))
			.toArray()], 'sparse');

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
	applyGate(gate, qubit1, qubit2 = -1) {
		if (this.measured) {
			// If it has already been measured, then you cannot apply a gate, so an
			// Error will be thrown
			throw new Error('Cannot Apply Gate to a Measured Quantum Register');
		} else {
			// Get the gate from the generateGates function, and then multiply the
			// amplitude vector against it
			const gateMatrix = gates.generateGate(gate,
				this.numQubits,
				qubit1,
				qubit2);

			this.amplitudes = math.multiply(this.amplitudes, gateMatrix);
		}
	}

	// Apply a gate to ever qubit in a register
	applyGateToAll(gate) {
		// Loop through the number of qubits, and applyGate to i.
		for (let i = 1; i <= this.numQubits; i++) {
			applyGate(gate, i);
		}
	}

	// Measure the qubit register
	measure() {
		// If it has already been measured, just return that value
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
