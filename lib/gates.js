'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var math = require('mathjs');
var helper = require('./helper');

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

      if (math.typeof(gate) === 'string') {
        if (gate === 'CNOT') {
          // Set the control and target qubits
          var control = qubit1;
          var target = qubit2;

          // Grab the gates now for easy access in the function
          var identity = math.eye(2, 'sparse');
          var X = math.matrix(this.X, 'sparse');

          // This matrix is the 'Control Matrix'. At the end of the gate
          // generation, the NaN's positions will be evaluated to figure
          // out if it should be a 0 or a 1
          var C = math.matrix([[NaN, 0], [0, 1]], 'sparse');

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
          var newGate = math.matrix(gateOrder.reduce(function (a, b) {
            return math.kron(a, b);
          }), 'sparse');

          // Loop through the new matrix and if the NaN's are in the
          // center, then replace with a 0, otherwise, replace with a 1
          newGate = math.map(newGate, function (val, index) {
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
          var _identity = math.eye(2, 'sparse');
          var mainGate = math.matrix(this[gate], 'sparse');

          // Again, Turn the gate order into an array, so that it can be
          // reduced later.
          var _gateOrder = [];

          for (var _i2 = 1; _i2 <= numQubits; _i2++) {
            if (_i2 === qubit1) {
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
      } else if (math.typeof(gate) === 'Matrix' || math.typeof(gate) === 'Array') {
        // This expand / generates a gate from a user inputed matrix

        // Put the gates here for easy access
        var _identity2 = math.eye(2, 'sparse');
        var _mainGate = math.matrix(gate, 'sparse');

        // Gate must be unitary so check here
        if (!helper.isUnitary(_mainGate)) {
          // It's not unitary, throw an Error
          throw new Error('The gate supplied to generateGate is not unitary');
        }

        // Again, Turn the gate order into an array, so that it can be
        // reduced later.
        var _gateOrder2 = [];

        for (var _i3 = 1; _i3 <= numQubits; _i3++) {
          if (_i3 === qubit1) {
            _gateOrder2.push(_mainGate);
          } else {
            _gateOrder2.push(_identity2);
          }
        }

        // Reduce and return the expanded gate.
        return _gateOrder2.reduce(function (a, b) {
          return math.kron(a, b);
        });
      }

      // Doesn't match a default case, return an Id gate
      return math.eye(math.pow(2, numQubits), 'sparse');
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