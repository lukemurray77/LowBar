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

















// var _ = {};

// _.identity = function (value) {
//   return value
// };

// _.first = function (array, n) {
//   if (arguments.length >= 2) {
//     return array.slice(0, n);
//   }
//   return array[0];
// };

// _.last = function (array, n) {
//   if (arguments.length >= 2) {
//     return array.slice(-n);
//   }
//   return array[array.length - 1];
// }


// _.each = function (list, iteratee) {
//   if (list.constructor === Array) {
//     for (var i = 0; i < list.length; i++) {

//       iteratee(list[i], i, list);
//     }
//     return list;
//   } else
//     for (var key in list) {
//       iteratee(list[key], key, list);
//     }
//   return list;

// }

// _.indexOf = function (array, value) {
//   if (!Array.isArray(array)) {
//     return -1
//   }

//   for (var i = 0; i < array.length; i++) {
//     if (value === array[i]) {
//       return i;
//     }
//   }
//   return -1;
// }

// _.filter = function (list, predicate) {
//   var arr = []
//   for (var i = 0; i < list.length; i++) {
//     if (predicate(list[i])) {
//       arr.push(list[i]);
//     }
//   }
//   return arr;
// }

// _.reject = function (list, predicate) {
//   var arr = []
//   for (var i = 0; i < list.length; i++) {
//     if (!predicate(list[i])) {
//       arr.push(list[i]);
//     }
//   }
//   return arr;

// }

// _.uniq = function (array) {
//   if (Array.isArray(array) || typeof array === 'string') {
//     var arr = [];

//     for (var i = 0; i < array.length; i++) {
//       if (_.indexOf(arr, array[i]) === -1) {
//         arr.push(array[i]);
//       }


//     }
//     return arr;

//   }
//   return [];
// }

// _.map = function (list, iteratee) {
//   if (typeof list === 'object' || typeof list === 'string') {
//     if (Array.isArray(list) || typeof list === 'string') {
//       var mappedArr = [];
//       for (var i = 0; i < list.length; i++) {
//         var val = iteratee(list[i], i, list)
//         mappedArr.push((val))
//       }
//       return mappedArr;
//     } else
//       var mappedObj = {};
//     for (var key in list) {
//       mappedObj[key] = iteratee(list[key]);
//     }
//     return mappedObj
//   }
//   return [];
// }

// _.pluck = function (list, propertyName) {
//   if (Array.isArray(list)) {

//     var pluckedArr = [];
//     for (var i = 0; i < list.length; i++) {
//       pluckedArr.push(list[i][propertyName]);
//     }
//     return pluckedArr
//   }
//   return [];
// }

// _.reduce = function (list, iteratee, memo) {

//   if (Array.isArray(list)) {
//     for (var i = 0; i < list.length; i++) {
//       memo = iteratee(memo, list[i])
//     }
//   return memo;
// } else
//   for(var key in list) {
//     memo = iteratee(memo, list[key]);
//   }
//   return memo;

// }



// _.contains = function (list, value) {
//   if (arguments.length < 2 || !Array.isArray(list) || !typeof list === 'object') {
//     return false;
//   }

//   if (_.indexOf(list, value) !== -1) {
//     return true;
//   }

//   return false;

// }

// _.every = function (list, predicate) {
//   // if(arguments.length <= 1) {return true;};

//   if (Array.isArray(list)) {
//     for (var i = 0; i < list.length; i++) {
//       if (!predicate(list[i])) return false;
//     }
//   } else
//     for (var key in list) {
//       if(!predicate(list[key])) return false;


//     }

//     return true;

//   // neeed to refactor so it works for objects
// }


if (typeof module !== 'undefined') {
  module.exports = _;
}
