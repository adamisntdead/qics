'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var math = require('mathjs');

// Complex number i and -i for easy access
var i = math.complex(0, 1);
var negI = math.complex(0, -1);

/* #################################################
#                    Gates                         #
################################################# */

var gates = function () {
  function gates() {
    _classCallCheck(this, gates);
  }

  _createClass(gates, null, [{
    key: 'generateGate',


    /* #################################################
    #                Helper Functions                  #
    ################################################# */
    value: function generateGate(gate, numQubits, qubit1) {
      var qubit2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      if (gate === 'CNOT') {
        // Set the control and target qubits
        var control = qubit1;
        var target = qubit2;

        // Grab the gates now for easy access in the function
        var identity = math.eye(2);
        var X = this.X;

        // This matrix is the 'Control Matrix'. At the end of the gate generation,
        // the NaN's positions will be evaluated to figure out if it should be a
        // a 0 or a 1
        var C = [[NaN, 0], [0, 1]];

        // Turn the gate order into an array, so that it can be reduced later.
        var gateOrder = [];
        for (var _i = 1; _i <= numQubits; _i++) {
          if (_i === control) {
            gateOrder.push(C);
          } else if (_i === target) {
            gateOrder.push(X);
          } else {
            gateOrder.push(identity);
          }
        }

        // Now the gateOrder array is taken and reduced using the
        // 'Kronecker Product'
        var newGate = gateOrder.reduce(function (a, b) {
          return math.kron(a, b);
        });

        // This needs to now be converted into an array if it is
        // returned from math.js as a matrix
        if (math.typeof(newGate) === 'Matrix') {
          newGate = newGate.toArray();
        }

        // Loop through the new matrix and if the NaN's are in the
        // center, then replace with a 0, otherwise, replace with a 1
        for (var _i2 = 0; _i2 < newGate.length; _i2++) {
          for (var j = 0; j < newGate[_i2].length; j++) {
            if (math.isNaN(newGate[_i2][j])) {
              if (_i2 === j) {
                newGate[_i2][j] = 1;
              } else {
                newGate[_i2][j] = 0;
              }
            }
          }
        }
        // Return the expanded gate.
        return newGate;
      } else {
        // Put the gates here for easy access
        var _identity = math.eye(2);
        var mainGate = this[gate];

        // Again, Turn the gate order into an array, so that it can be
        // reduced later.
        var _gateOrder = [];

        for (var _i3 = 1; _i3 <= numQubits; _i3++) {
          if (_i3 === qubit1) {
            _gateOrder.push(mainGate);
          } else {
            _gateOrder.push(_identity);
          }
        }

        // Reduce and return the expanded gate.
        return _gateOrder.reduce(function (a, b) {
          return math.kron(a, b);
        });
      }
    }
  }, {
    key: 'X',

    // Pauli-X / Not Gate
    get: function get() {
      return [[0, 1], [1, 0]];
    }

    // Pauli-Y Gate

  }, {
    key: 'Y',
    get: function get() {
      return [[0, negI], [i, 0]];
    }

    // Pauli-Z Gate

  }, {
    key: 'Z',
    get: function get() {
      return [[1, 0], [0, -1]];
    }

    // Hadamard Gate

  }, {
    key: 'H',
    get: function get() {
      return math.multiply(1 / math.sqrt(2), [[1, 1], [1, -1]]);
    }

    // Identity Gate

  }, {
    key: 'Id',
    get: function get() {
      return math.eye(2);
    }

    // S & S Dagger Gate

  }, {
    key: 'S',
    get: function get() {
      return [[1, 0], [0, i]];
    }
  }, {
    key: 'SDagger',
    get: function get() {
      return math.conj(math.transpose([[1, 0], [0, i]]));
    }

    // T & T Dagger / Pi over 8 Gate

  }, {
    key: 'T',
    get: function get() {
      return [[1, 0], [0, math.pow(math.e, math.multiply(i, math.pi / 4))]];
    }
  }, {
    key: 'TDagger',
    get: function get() {
      return math.conj(math.transpose([[1, 0], [0, math.pow(math.e, math.multiply(i, math.pi / 4))]]));
    }
  }]);

  return gates;
}();

module.exports = gates;