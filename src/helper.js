const math = require('./math/math');

module.exports = {
  sum: (array) => {
    // Find the sum of all the elements in an array
    let total = 0;
    math.forEach(array, (val) => {
      total += val;
    });

    return total;
  }
};
