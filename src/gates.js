const math = require('mathjs');
const helper = require('./helper');

// Complex number i and -i for easy access
const i = math.complex(0, 1);
const negI = math.complex(0, -1);


/* #################################################
#                    Gates                         #
################################################# */
class gates {
  // Pauli-X / Not Gate
  static get X() {
    return [
      [0, 1],
      [1, 0]
    ];
  }

  // Pauli-Y Gate
  static get Y() {
    return [
      [0, negI],
      [i, 0]
    ];
  }

  // Pauli-Z Gate
  static get Z() {
    return [
      [1, 0],
      [0, -1]
    ];
  }

  // Hadamard Gate
  static get H() {
    return math.multiply(1 / math.sqrt(2), [
      [1, 1],
      [1, -1]
    ]);
  }

  // Identity Gate
  static get Id() {
    return math.eye(2);
  }

  // S & S Dagger Gate
  static get S() {
    return [
      [1, 0],
      [0, i]
    ];
  }

  static get SDagger() {
    return math.conj(
      math.transpose(
        [
          [1, 0],
          [0, i]
        ]
      )
    );
  }

  // T & T Dagger / Pi over 8 Gate
  static get T() {
    return [
      [1, 0],
      [0, math.pow(math.e, (math.multiply(i, math.pi / 4)))]
    ];
  }

  static get TDagger() {
    return math.conj(
      math.transpose(
        [
          [1, 0],
          [0, math.pow(math.e, (math.multiply(i, math.pi / 4)))]
        ]
      )
    );
  }

  /* #################################################
  #                Helper Functions                  #
  ################################################# */
  static generateGate(gate, numQubits, qubit1, qubit2 = 1) {
    if (math.typeof(gate) === 'string') {
      if (gate === 'CNOT') {
        // Set the control and target qubits
        const control = qubit1;
        const target = qubit2;

        // Grab the gates now for easy access in the function
        const identity = math.eye(2, 'sparse');
        const X = math.matrix(this.X, 'sparse');

        // This matrix is the 'Control Matrix'. At the end of the gate
        // generation, the NaN's positions will be evaluated to figure
        // out if it should be a 0 or a 1
        const C = math.matrix([
          [NaN, 0],
          [0, 1]
        ], 'sparse');

        // Turn the gate order into an array, so that it can be reduced later.
        let gateOrder = [];
        for (let i = 1; i <= numQubits; i++) {
          if (i === control) {
            gateOrder.push(C);
          } else if (i === target) {
            gateOrder.push(X);
          } else {
            gateOrder.push(identity);
          }
        }


        // Now the gateOrder array is taken and reduced using the
        // 'Kronecker Product'
        let newGate = math.matrix(
          gateOrder.reduce((a, b) => math.kron(a, b)),
          'sparse'
        );

        // Loop through the new matrix and if the NaN's are in the
        // center, then replace with a 0, otherwise, replace with a 1
        newGate = math.map(newGate, (val, index) => {
          if (math.isNaN(val)) {
            if (index[0] === index[1]) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return val;
          }
        });

        // Return the expanded gate.
        return newGate;
      } else {
          // Put the gates here for easy access
          const identity = math.eye(2, 'sparse');
          const mainGate = math.matrix(this[gate], 'sparse');

          // Again, Turn the gate order into an array, so that it can be
          // reduced later.
          let gateOrder = [];

          for (let i = 1; i <= numQubits; i++) {
            if (i === qubit1) {
              gateOrder.push(mainGate);
            } else {
              gateOrder.push(identity);
            }
          }

          // Reduce and return the expanded gate.
          return gateOrder.reduce((a, b) => math.kron(a, b));
        }
    } else if (math.typeof(gate) === 'Matrix'
      || math.typeof(gate) === 'Array') {
        // This expand / generates a gate from a user inputed matrix

        // Put the gates here for easy access
        const identity = math.eye(2, 'sparse');
        const mainGate = math.matrix(gate, 'sparse');

        // Gate must be unitary so check here
        if (!helper.isUnitary(mainGate)) {
          // It's not unitary, throw an Error
          throw new Error('The gate supplied to generateGate is not unitary');
        }

        // Again, Turn the gate order into an array, so that it can be
        // reduced later.
        let gateOrder = [];

        for (let i = 1; i <= numQubits; i++) {
          if (i === qubit1) {
            gateOrder.push(mainGate);
          } else {
            gateOrder.push(identity);
          }
        }

        // Reduce and return the expanded gate.
        return gateOrder.reduce((a, b) => math.kron(a, b));
    }

    // Doesn't match a default case, return an Id gate
    return math.eye(math.pow(2, numQubits), 'sparse');
  }
}

module.exports = gates;
