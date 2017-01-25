const gates = require('./gates');
const Register = require('./QuantumRegister');
const helper = require('./helper');

// Exports the Gates class and the Register Class
module.exports = {
  gates: gates,
  Register: Register,
  helper: {
    isUnitary: helper.isUnitary,
    isRegister: helper.isRegister
  }
};
