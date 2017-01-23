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

module.exports = {
  sum: sum
};