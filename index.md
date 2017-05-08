# LowBar.js

This project is my attempt at reimplementing some key methods of the underscore.js library. 

If you want to see the tests in action or check out the code just follow these steps:
```s
git clone https://github.com/lukemurray77/LowBar.git LowBar

cd LowBar

npm install

npm test
```

# Methods


<span id="identity"></span>
### _.identity:
``` javascript
_.identity = function () {
  return arguments[0];
};

// example 
var stooge = {name: 'moe'};
stooge === _.identity(stooge);
=> true

```

<span id="first"></span>
### _.first:
``` javascript
_.first = function (arr, n) {
  if (n) {
    return arr.slice(0, n);
  }
  return arr[0];
}

// example 

_.first([5, 4, 3, 2, 1]);
=> 5
```

<span id="last"></span>
### _.last:
``` javascript
_.last = function (arr, n) {
  if (n) return arr.slice(-n);
  return arr[arr.length - 1];
}

//example 

_.last([5, 4, 3, 2, 1]);
=> 1
```

<span id="each"></span>
### _.each:
``` javascript
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
// example
_.each([1, 2, 3], alert);
=> alerts each number in turn...
_.each({one: 1, two: 2, three: 3}, alert);
=> alerts each number value in turn...

```

<span id="indexof"></span>
### _.indexOf:
``` javascript
_.indexOf = function (arr, value, isSorted) {
  if (isSorted) {
      // uses my own binary search helper function
    return binarySearch(arr, value);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
}

//example 
_.indexOf([1, 2, 3], 2);
=> 1
```

<span id="filter"></span>
### _.filter:
``` javascript
_.filter = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr;
}

// example 
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [2, 4, 6]
```

<span id="reject"></span>
### _.reject:
``` javascript
_.reject = function (list, predicate, context) {
  if (!context) context = this;
  const newArr = [];
  for (let i = 0; i < list.length; i++) {
    if (!predicate.call(context, list[i])) newArr.push(list[i]);
  }
  return newArr
}

// example 
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
=> [1, 3, 5]
```

<span id="uniq"></span>
### _.uniq:
``` javascript
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

// example 
_.uniq([1, 2, 1, 4, 1, 3]);
=> [1, 2, 4, 3]
```

<span id="map"></span>
### _.map:
``` javascript
_.map = function (list, iteratee, context) {
  const newList = []
  let i = 0;
  _.each(list, function (x) {
    newList.push(iteratee.apply(context, [x, i, list]));
    i++
  })
  return newList;
}

// example
_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]

```

<span id="pluck"></span>
### _.pluck:
``` javascript
_.pluck = function (list, propName) {
  const result = [];
  for (var key in list) {
    result.push(list[key][propName])
  }
  return result;
}

// example 
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
=> ["moe", "larry", "curly"]
```

<span id="reduce"></span>
### _.reduce:
``` javascript
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

// example 
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6

```

<span id="contains"></span>
### _.contains:
``` javascript
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

// example
_.contains([1, 2, 3], 3);
=> true
```

<span id="every"></span>
### _.every:
``` javascript
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

// example
_.every([2, 4, 5], function(num) { return num % 2 == 0; });
=> false
```

<span id="some"></span>
### _.some:
``` javascript
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

// example
_.some([null, 0, 'yes', false]);
=> true
```

<span id="extend"></span>
### _.extend:
``` javascript
_.extend = function (destination, sources) {
  for (let i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      destination[key] = arguments[i][key];
    }
  }
  return destination;
}

// example

_.extend({name: 'moe'}, {age: 50});
=> {name: 'moe', age: 50}
```

<span id="defaults"></span>
### _.defaults:
``` javascript
_.defaults = function (object, defaults) {
  for (var key in defaults) {
    if (!object[key]) {
      object[key] = defaults[key]
    }
  }
  return object;
}

// example
var iceCream = {flavor: "chocolate"};
_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
=> {flavor: "chocolate", sprinkles: "lots"}
```

<span id="once"></span>
### _.once:
``` javascript
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

// example 
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
```

<span id="memoize"></span>
### _.memoize:
``` javascript
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

// example 
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
```

<span id="delay"></span>
### _.delay:
``` javascript
_.delay = function(iteratee, wait) {
  const args = Array.from(arguments).slice(2);
  
  setTimeout(() => {
    iteratee.apply(null, args);
  }, wait);
};

// example

var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
=> 'logged later' // Appears after one second.
```

<span id="shuffle"></span>
### _.shuffle:
``` javascript
_.shuffle = function (list) {
  const shuffled = [];
  while (list.length > 0) {
    let randomNo = getRandomInt(0, list.length);
    shuffled.push(list[randomNo]);
    list = list.slice(0, randomNo).concat(list.slice(randomNo+1))
  }
  return shuffled;
}

// example 
_.shuffle([1, 2, 3, 4, 5, 6]);
=> [4, 1, 6, 3, 5, 2]
```

<span id="invoke"></span>
### _.invoke:
``` javascript
_.invoke = function (list, methodName, ...args) {
  let copy = list.slice();
  const func = _[methodName];
  for(var key in copy) {
    copy[key] = func.apply(this, [copy[key], ...args]);
  }
  return copy
}
// example

_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
=> [[1, 5, 7], [1, 2, 3]]
```

<span id="sortby"></span>
### _.sortBy:
``` javascript
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

// example 
_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
=> [5, 4, 6, 3, 1, 2]

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.sortBy(stooges, 'name');
=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];

```

<span id="zip"></span>
### _.zip:
``` javascript
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

// example 

_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
=> [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]
```

<span id="sortedindex"></span>
### _.sortedIndex:
``` javascript
_.sortedIndex = function (list, value, iteratee) {
  if (iteratee) {
    return binarySearch(_.sortBy(list, iteratee), value);
  } else
    return binarySearch(list, value);
}

// example

_.sortedIndex([10, 20, 30, 40, 50], 35);
=> 3

var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
_.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
=> 1
```

<span id="flatten"></span>
### _.flatten:
``` javascript
_.flatten = function (list, bool) {
  const res = [];
  if (bool) {
    list.forEach(function (el) {
      if (!Array.isArray(el)) {
        res.push(el);
      } else {
        el.forEach(function (el2) {
          res.push(el2)
        })
      }
    })
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
    }
  flattenRecursion(list);
  }
  return res;
}

// example 

_.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
```

<span id="intersection"></span>
### _.intersection:
``` javascript
_.intersection = function(arrays) {
  const args = [...arguments];
  const res = [];
  for(var i = 0; i < args[0].length; i++){
    const val = args[0][i];
  if(
  _.every(args, function(array) {
    return _.contains(array, val)
  })

  ) {
    res.push(val);
  }
  }
  return res;
}

// example 

_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
=> [1, 2]
```

<span id="difference"></span>
### _.difference:
``` javascript
_.difference = function(array, others) {
  const args = [...arguments].slice(1);
  const res = [];
  for(var i = 0; i < array.length; i++) {
    const val = array[i];
    if(
      _.every(args, function(array) {
        return !_.contains(array, val);
      })
    )
    res.push(val);
  }
  return res;
}

// example 

_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
=> [1, 3, 4]
```

<span id="helpers"></span>

### binarySearch
``` javascript
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
```

