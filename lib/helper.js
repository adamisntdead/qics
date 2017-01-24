'use strict';

var math = require('mathjs');

// Finds the sum of all the elements in an array
var sum = function sum(array) {
  var total = 0;
  math.forEach(array, function (val) {
    // Itterate through the array, adding to the total variable
    total += val;
  });

  // Return the sum
  return total;
};

// Checks to if a matrix is unitary. Accepts a mathjs matrix or
// array, and returns true or false accordingly
var isUnitary = function isUnitary(matrix) {
  // A Square matrix is unitary if its conjugate transpose is
  // equal to its inverse
  var givenMatrix = math.matrix(matrix, 'sparse');

  // Check if its Square
  if (math.size(givenMatrix)[0] !== math.size(givenMatrix)[1]) {
    return false;
  }

  var conjugateTranspose = math.transpose(math.conj(givenMatrix));
  var inverse = math.inv(givenMatrix);

  return math.deepEqual(inverse, conjugateTranspose);
};

module.exports = {
  sum: sum,
  isUnitary: isUnitary
};