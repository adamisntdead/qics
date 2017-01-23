const math = require('mathjs');

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
    if (gate === 'CNOT') {
      // Set the control and target qubits
      const control = qubit1;
      const target = qubit2;

      // Grab the gates now for easy access in the function
      const identity = math.eye(2);
      const X = this.X;

      // This matrix is the 'Control Matrix'. At the end of the gate generation,
      // the NaN's positions will be evaluated to figure out if it should be a
      // a 0 or a 1
      const C = [
        [NaN, 0],
        [0, 1]
      ];

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
      let newGate = gateOrder.reduce((a, b) => math.kron(a, b));

      // This needs to now be converted into an array if it is
      // returned from math.js as a matrix
      if (math.typeof(newGate) === 'Matrix') {
        newGate = newGate.toArray();
      }

      // Loop through the new matrix and if the NaN's are in the
      // center, then replace with a 0, otherwise, replace with a 1
      for (let i = 0; i < newGate.length; i++) {
        for (let j = 0; j < newGate[i].length; j++) {
          if (math.isNaN(newGate[i][j])) {
            if (i === j) {
              newGate[i][j] = 1;
            } else {
              newGate[i][j] = 0;
            }
          }
        }
      }
      // Return the expanded gate.
      return newGate;
    } else {
      // Put the gates here for easy access
      const identity = math.eye(2);
      const mainGate = this[gate];

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
  }

}

module.exports = gates;
