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
    _.each(list, function(x) {
      newList.push(iteratee.apply(context, [x, i, list]));
      i++
    })
  


return newList

}

_.pluck = function (list, propName) {
  const result = [];
  for(var key in list) {
    result.push(list[key][propName])
  }
  return result;
}

_.contains = function(list, val, fromIndex) {

  if(!fromIndex) fromIndex = 0;
  if(Array.isArray(list)){
  for(var i = fromIndex; i < list.length; i++){
    if(list[i] === val) return true;
  }
}else 
  for(var key in list){
    if(list[key] === val){
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
  for(let i = 1; i < arguments.length; i++){
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


if (typeof module !== 'undefined') {
  module.exports = _;
}
