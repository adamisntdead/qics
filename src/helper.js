const math = require('mathjs');

// Checks to if a matrix is unitary. Accepts a mathjs matrix or
// array, and returns true or false accordingly
const isUnitary = (matrix) => {
  // A Square matrix is unitary if its conjugate transpose is
  // equal to its inverse
  const givenMatrix = math.matrix(matrix, 'sparse');

  // Check if its Square
  if ((math.size(givenMatrix))[0] !== (math.size(givenMatrix))[1]) {
    return false;
  }

  const conjugateTranspose = math.transpose(math.conj(givenMatrix));
  const inverse = math.inv(givenMatrix);

  return math.deepEqual(inverse, conjugateTranspose);
};

const isRegister = (reg) => reg.constructor.name === 'Register';

module.exports = {
  isUnitary: isUnitary,
  isRegister: isRegister
};
