var _ = {};

_.identity = function(value) {
    return value
};

_.first = function(array, n) {
    if (arguments.length >= 2) {
      return array.slice(0,n);
    }
    return array[0];
};

_.last = function(array,n) {
    if (arguments.length >=2) {
      return array.slice(-n);
    }
    return array[array.length-1];
}

if (typeof module !== 'undefined') {
  module.exports = _;
}
