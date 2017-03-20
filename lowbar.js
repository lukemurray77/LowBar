const _ = {};


_.identity = function (value) {
  return value;
}

_.first = function (arr, n) {
  if (n) {
    return arr.slice(0, n);
  }
  return arr[0];
}

_.last = function (arr, n) {
  if (n) return arr.slice(-n);
  return arr[arr.length - 1];
}

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


}


_.indexOf = function (arr, value, isSorted) {
  if (isSorted) {
    return binarySearch(arr, value);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
}


function binarySearch(list, value) {

  let start = 0;
  let end = list.length - 1;
  let midpoint = Math.floor((start + end) / 2);

  for (var i = 0; i < list.length; i++) {
    if (value > list[midpoint]) {
      start = midpoint + 1;
      midpoint = Math.floor((start + end) / 2);
    }
    if (value < list[midpoint]) {
      end = midpoint - 1;
      midpoint = Math.floor((start + end) / 2);
    }
    if (list[midpoint] === value) return midpoint;
  }
  return -1;
}

_.filter = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr
}

_.reject = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr
}



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
}

_.map = function (list, iteratee, context) {
  const newList = []
  let i = 0;
  _.each(list, function (x) {
    newList.push(iteratee.apply(context, [x, i, list]));
    i++
  })



  return newList

}

_.pluck = function (list, propName) {
  const result = [];
  for (var key in list) {
    result.push(list[key][propName])
  }
  return result;
}

_.contains = function (list, val, fromIndex) {

  if (!fromIndex) fromIndex = 0;
  if (Array.isArray(list)) {
    for (var i = fromIndex; i < list.length; i++) {
      if (list[i] === val) return true;
    }
  } else
    for (var key in list) {
      if (list[key] === val) {
        return true
      }
    }
  return false
}

_.reduce = function (list, iteratee, memo, context) {
  if (!context) context = this;
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (memo === undefined) {
        memo = list[i];
        i++
        memo = iteratee.apply(context, [memo, list[i], i, list]);
      } else
        memo = iteratee.apply(context, [memo, list[i], i, list]);
    }
  } else {
    const keys = Object.keys(list);
    for (var i = 0; i < keys.length; i++) {
      if (memo === undefined) {
        memo = list[keys[i]];
        i++
        memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
      } else
        memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
    }
  }
  return memo;
}



_.extend = function (destination, sources) {
  for (let i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      destination[key] = arguments[i][key];
    }

  }
  return destination;

}

_.defaults = function (object, defaults) {
  for (var key in defaults) {
    if (!object[key]) {
      object[key] = defaults[key]
    }
  }
  return object;
}


_.every = function (list, predicate, context) {
  if (!context) context = this;
  let every = true;
  for (var key in list) {
    if (!predicate.call(context, list[key])) {
      every = false;
    }
  }
  return every;
}

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
}

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
  }
}

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
/** Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

 */
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
    if (arguments.length === 3) {
        return binarySearch(_.sortBy(list, iteratee), value);
    }
    function binarySearch(list, name) {
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
    return binarySearch(list, value);
}

_.every = function (list, predicate) {
    var array = [];
    _.each(list, function (element) {
        if (predicate(element)) array.push(element);
    });
    if (array.length === list.length) return true;
    return false;
    // I am sure there is a way to refactor this with reduce!
}


/** Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level. */

_.flatten = function (list) {
    const res = [];
    var flattenRecursion = function (list) {
        list.forEach(function (element) {
            if (!Array.isArray(list)) {
                res.push(list);
            }
            else {
                return flattenRecursion(element);
            }
        });
    }
    flattenRecursion(list);
    return res;
}





if (typeof module !== 'undefined') {
  module.exports = _;
}


/**
 * var _ = {};


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

_.memoize = function (func) {
    const cache = {};
    const speedy = function () {
        // grab the first argument
        const arg = JSON.stringify(arguments[0]);
        // has it been called with this argument before?
            // if so, lookin the cache and return the value for this argument
            if (cache[arg]) return cache[arg];
            else {

            // if not call the function
            const res = func.apply(null, arguments);
            // save the value to cache
            cache[arg] = res;
            // return value
            return res;
    

        }
    };
        speedy.cache = cache;

        return speedy;
    
  };
        
_.delay = function (func, elapse) {
     // set a delay
     /// grab extra args
     const args = Array.from(arguments).slice(2);
     setTimeout(function() {
        // call the function
        func.apply(null, arguments);
     }, elapse)
}

_.shuffle = function (list) {
var arr = [];
for (var i = 0; i < list.length; i++) {
        var randomNo = getRandomInt(0, list.length);
        var temp = list[randomNo];
        arr.push(temp);
        list = list.slice(0, randomNo).concat(list.slice(randomNo + 1));
    }
    
    
    return arr;

};
function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;

}

console.log(_.shuffle([1,2,3,4,5]));


if (typeof module !== 'undefined') {
  module.exports = _;
}

 */