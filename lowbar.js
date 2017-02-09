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

_.indexOf = function(array, value) {
  if (!Array.isArray(array)) {
    return -1
  }

  for (var i =0; i<array.length; i++) {
    if (value === array[i]) {
      return i;
    }
  }
    return -1;
}

_.filter = function(list, predicate) {
  var arr = []
  for (var i=0; i<list.length; i++) {
    if (predicate(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr;
}

_.reject = function(list, predicate) {
  var arr = []
  for (var i=0; i<list.length; i++) {
    if (!predicate(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr;
  
}


if (typeof module !== 'undefined') {
  module.exports = _;
}
