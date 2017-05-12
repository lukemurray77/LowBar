const _ = {};


_.identity = function (value) {
  return value;
};

_.first = function (arr, n) {
  
  if (n) {
    return arr.slice(0, n);
  }
  return arr[0];
};

_.last = function (arr, n) {
  if (n) return arr.slice(-n);
  return arr[arr.length - 1];
};

_.each = function (arr, iteratee) {
  if (Array.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      iteratee(arr[i], i, arr);
    }
    return arr;
  } else {
    for (var key in arr) {
      iteratee(arr[key], key, arr);
    }
    return arr;
  }


};


_.indexOf = function (arr, value, isSorted) {
  if (isSorted) {
    return binarySearch(arr, value);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};

_.filter = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr;
};

_.reject = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr;
};


_.uniq = function (array, isSorted, iteratee) {
  const newArr = [];

  for (let i = 0; i < array.length; i++) {
    if (iteratee) {
      if (_.indexOf(newArr, iteratee(array[i])) === -1) newArr.push(iteratee(array[i]));
    } else
      for (let i = 0; i < array.length; i++) {
        if (_.indexOf(newArr, array[i]) === -1) newArr.push(array[i]);
      }
  }
  return newArr;
};

_.map = function (list, iteratee, context) {
  const newList = [];
  let i = 0;
  _.each(list, function (x) {
    newList.push(iteratee.apply(context, [x, i, list]));
    i++;
  });


  return newList;

};

_.pluck = function (list, propName) {
  const result = [];
  for (var key in list) {
    result.push(list[key][propName]);
  }
  return result;
};

_.contains = function (list, val, fromIndex) {

  if (!fromIndex) fromIndex = 0;
  if (Array.isArray(list)) {
    for (var i = fromIndex; i < list.length; i++) {
      if (list[i] === val) return true;
    }
  } else
    for (var key in list) {
      if (list[key] === val) {
        return true;
      }
    }
  return false;
};

_.reduce = function (list, iteratee, memo, context) {
  if (!context) context = this;
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (memo === undefined) {
        memo = list[i];
        i++;
        memo = iteratee.apply(context, [memo, list[i], i, list]);
      } else
        memo = iteratee.apply(context, [memo, list[i], i, list]);
    }
  } else {
    const keys = Object.keys(list);
    for (var i = 0; i < keys.length; i++) {
      if (memo === undefined) {
        memo = list[keys[i]];
        i++;
        memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
      } else
        memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
    }
  }
  return memo;
};


_.extend = function (destination, sources) {
  for (let i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      destination[key] = arguments[i][key];
    }

  }
  return destination;

};

_.defaults = function (object, defaults) {
  for (var key in defaults) {
    if (!object[key]) {
      object[key] = defaults[key];
    }
  }
  return object;
};


_.every = function (list, predicate, context) {
  if (!context) context = this;
  let every = true;
  for (var key in list) {
    if (!predicate.call(context, list[key])) {
      every = false;
    }
  }
  return every;
};

_.some = function (list, predicate, context) {
  if (!context) context = this;
  for (var key in list) {
    if (!predicate) {
      if (list[key]) return true;
    }
    else if (predicate.call(context, list[key])) {
      return true;
    }
  }
  return false;
};

_.memoize = function (func) {
  const cache = {};
  return function () {
    const arg = arguments[0];
    if (cache[arg]) {
      return cache[arg];
    } else {
      const ans = func(arg);
      cache[arg] = ans;
      return cache[arg];
    }
  };
};

_.sortBy = function (list, iteratee) {
  if (typeof iteratee === 'string') {
    let orderedArray = [];
    list.forEach(function (element) {
      orderedArray.push(element[iteratee]);
    });
    orderedArray.sort();
    var result = [];
    orderedArray.forEach(function (element) {
      list.forEach(function (key) {
        if (key[iteratee] === element) {
          result.push(key);
        }
      });
    });
    return result;
  }
  if (Array.isArray(list)) {
    return list.sort(function (a, b) {
      return iteratee(a) - iteratee(b);
    });
  }
};

_.zip = function () {
  const results = [];
  for (var i = 0; i < arguments[0].length; i++) {
    let tempArr = [];
    for (var j = 0; j < arguments.length; j++) {
      tempArr.push(arguments[j][i]);
    }
    results.push(tempArr);
  }
  return results;
};

_.sortedIndex = function (list, value, iteratee) {
  if (iteratee) {
    return binarySearch(_.sortBy(list, iteratee), value);
  } else
    return binarySearch(list, value);
};

_.once = function (func) {
  var ran = false, memo;
  return function () {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;

  };

};

_.flatten = function (list, bool) {
  const res = [];
  if (bool) {
    list.forEach(function (el) {
      if (!Array.isArray(el)) {
        res.push(el);
      } else {
        el.forEach(function (el2) {
          res.push(el2);
        });
      }
    });
  } else {

    var flattenRecursion = function (arr) {
      if (!Array.isArray(arr)) {
        res.push(arr);
      }
      else {
        arr.forEach(function (element) {
          return flattenRecursion(element);
        });

      }
    };
  flattenRecursion(list);
  }
  return res;

};

_.delay = function (iteratee, wait) {
  const args = Array.from(arguments).slice(2);
  
  setTimeout(() => {
    iteratee.apply(null, args);
  }, wait);
};


_.shuffle = function (list) {
  const shuffled = [];
  while (list.length > 0) {
    let randomNo = getRandomInt(0, list.length);
    shuffled.push(list[randomNo]);
    list = list.slice(0, randomNo).concat(list.slice(randomNo + 1));
  }
  return shuffled;

};

_.invoke = function (list, methodName, ...args) {
  let copy = list.slice();
  const func = _[methodName];
  for (var key in copy) {
    copy[key] = func.apply(this, [copy[key], ...args]);
  }
  return copy;
};

_.intersection = function (arrays) {
  const args = [...arguments];
  const res = [];
  for (var i = 0; i < args[0].length; i++) {
    const val = args[0][i];
  if (
  _.every(args, function (array) {
    return _.contains(array, val);
  })

  ) {
    res.push(val);
  }
  }
  return res;
};

_.difference = function (array, others) {
  const args = [...arguments].slice(1);
  const res = [];
  for (var i = 0; i < array.length; i++) {
    const val = array[i];
    if (
      _.every(args, function (array) {
        return !_.contains(array, val);
      })
    )
    res.push(val);
  }
  return res;
};


// _.throttle = function () {
  
// }

function binarySearch (list, name) {
  var s = 0;
  var e = list.length - 1;
  for (var i = 0; i < 10; i++) {
    var m = Math.floor((e + s) / 2);
    if (list[m] === name) {
      return m;
    }
    if (name < list[m]) {
      e = m - 1;
    }
    if (name > list[m]) {
      s = m + 1;
    }
  }
  return m + 1;
}

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;

}

if (typeof module !== 'undefined') {
  module.exports = _;
}

