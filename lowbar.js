var _ = {};

_.identity = function (value) {
  return value
};

_.first = function (array, n) {
  if (arguments.length >= 2) {
    return array.slice(0, n);
  }
  return array[0];
};

_.last = function (array, n) {
  if (arguments.length >= 2) {
    return array.slice(-n);
  }
  return array[array.length - 1];
}


_.each = function (list, iteratee) {
  if (list.constructor === Array) {
    for (var i = 0; i < list.length; i++) {

      iteratee(list[i], i, list);
    }
    return list;
  } else
    for (var key in list) {
      iteratee(list[key], key, list);
    }
  return list;

}

_.indexOf = function (array, value) {
  if (!Array.isArray(array)) {
    return -1
  }

  for (var i = 0; i < array.length; i++) {
    if (value === array[i]) {
      return i;
    }
  }
  return -1;
}

_.filter = function (list, predicate) {
  var arr = []
  for (var i = 0; i < list.length; i++) {
    if (predicate(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr;
}

_.reject = function (list, predicate) {
  var arr = []
  for (var i = 0; i < list.length; i++) {
    if (!predicate(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr;

}

_.uniq = function (array) {
  if (Array.isArray(array) || typeof array === 'string') {
    var arr = [];

    for (var i = 0; i < array.length; i++) {
      if(_.indexOf(arr, array[i]) === -1){
        arr.push(array[i]);
      }


    }
    return arr;

  } 
  return [];
}

_.map = function(list, iteratee) {
  if(typeof list === 'object' || typeof list === 'string') {
    if(Array.isArray(list) || typeof list === 'string') {
      var mappedArr = [];
      for(var i = 0; i < list.length; i++){
        var val = iteratee(list[i], i, list )
        mappedArr.push((val))
      }
      return mappedArr;
    } else
    var mappedObj = {};
    for(var key in list) {
      mappedObj[key] = iteratee(list[key]);
    }
    return mappedObj







  }
  return [];


}
function timesTwo(number, ind, list) { return number * 2}; 
console.log(_.map({a: 1, b: 2, c: 3}, timesTwo))

if (typeof module !== 'undefined') {
  module.exports = _;
}
