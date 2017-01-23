const math = require('mathjs');

// Finds the sum of all the elements in an array
const sum = (array) => {
  let total = 0;
  math.forEach(array, (val) => {
    // Itterate through the array, adding to the total variable
    total += val;
  });

  // Return the sum
  return total;
};

module.exports = {
  sum: sum
};
