const math = require('./math/math');

// Complex number i and negI (-i) for easy access
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
      const control = qubit1;
      const target = qubit2;

      const identity = math.eye(2);
      const X = this.X;
      // NaN is the C from the Multi Qubit Gate generation
      // Formula.
      const C = [
        [NaN, 0],
        [0, 1]
      ];

      // Turn the gate order into an array
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

      // Generate the new gate then replace the
      // NaNs to Id gates, if they are in the center.
      let newGate = gateOrder.reduce((a, b) => math.kron(a, b));

      if (math.typeof(newGate) === 'Matrix') {
        newGate = newGate.toArray();
      }

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
      return newGate;
    } else {
      const identity = math.eye(2);
      const mainGate = this[gate];

      let gateOrder = [];

      for (let i = 1; i <= numQubits; i++) {
        if (i === qubit1) {
          gateOrder.push(mainGate);
        } else {
          gateOrder.push(identity);
        }
      }

      return gateOrder.reduce((a, b) => math.kron(a, b));
    }
  }

}

module.exports = gates;
