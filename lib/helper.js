'use strict';

var math = require('./math/math');

module.exports = {
  sum: function sum(array) {
    // Find the sum of all the elements in an array
    var total = 0;
    math.forEach(array, function (val) {
      total += val;
    });

    return total;
  }
};