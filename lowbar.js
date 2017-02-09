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


_.each = function(list, iteratee) {
  if(list.constructor === Array) {
    for(var i = 0; i < list.length; i++){
      
      iteratee(list[i], i, list);
    }
    return list;
  } else
  for(var key in list) {
    iteratee(list[key], key, list);
  }
  return list;

}

var arr = [1,2,3]
function timesTwo(number, ind, list) { return number * 2};

console.log(_.each(arr, timesTwo));
if (typeof module !== 'undefined') {
  module.exports = _;
}
