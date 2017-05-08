# LowBar.js

This project is my attempt at reimplementing some key methods of the underscore.js library. 


```s


cd Lowbar

npm install

npm test
```

# Methods

## Utility Methods

***identity***

 _.identity(value)

Returns the same value that is used as the argument. In math: f(x) = x
This function looks useless, but is used throughout Underscore as a default iteratee.
```javascript

// Example
_.identity = value => value;

// Example
var stooge = {name: 'moe'};
stooge === _.identity(stooge);
// => true
```

***iteratee***

 _.iteratee(value)

Generates a callback that can be applied to each element in a collection. Used in filter, reject and map to generate new functions

```javascript
// Example
_.iteratee = (method) => {
  if (typeof method === 'function') return method;
  return function (el) {
    return el;
  };
};

// Example
// No value
_.iteratee();
// => _.identity()

// Function
_.iteratee(function(n) { return n * 2; });
// => function(n) { return n * 2; }

// Anything else
_.iteratee('firstName');
// => _.property('firstName');
```

## Array Methods

***first***

 _.first(array, [n])

Returns the first element of an array. Passing n will return the first n elements of the array.
```javascript
_.first = (array, n) => {
  if (typeof array === 'string') array = array.split('');
  if (!Array.isArray(array)) return undefined;
  return n > 1 ? array.slice(0, n) : array[0];
};

// Example
_.first([5, 4, 3, 2, 1]);
// => 5
```

***last***

 _.last(array, [n])

 Returns the last element of an array. Passing n will return the last n elements of the array.

```javascript
_.last = (array, n) => {
  if (typeof array === 'string') array = array.split('');
  if (!Array.isArray(array)) return undefined;
  return n > 1 ? array.slice(array.length - n) : array[array.length - 1];
};

// Example
_.last([5, 4, 3, 2, 1]);
// => 1
```

***indexOf***

_.indexOf(array, value, [isSorted]) 

Returns the index at which value can be found in the array, or -1 if value is not present in the array. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.

```javascript
_.indexOf = (array, value, isSorted) => {
  if (!Array.isArray(array)) return -1;
  if (isSorted) {
    binSearch(array, value);
  } else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
  }
  return -1;
};

// Example
_.indexOf([1, 2, 3], 2);
// => 1
```
This function uses binary search:

```javascript
const binSearch = (list, target) => {
  let start = 0, end = list.length - 1;
  for (let i = 0; i < list.length; i++) {
    let current = Math.floor((start + end) / 2);
    if (list[current].target === target) return current;
    if (target < list[current]) end = current - 1;
    if (target > list[current]) start = current + 1;
  }
  return -1;
};
```

***uniq***

_.uniq(array)

Produces a duplicate-free version of the array, using === to test object equality. In particular only the first occurence of each value is kept.

```javascript
_.uniq = array => {
  let result = [];
  if (typeof array === 'string')
    array.length > 1 ? array = array.split('') : result.push(array);
  if (!Array.isArray(array)) return result;
  _.each(array, el => {
      if (_.indexOf(result, el) === -1) result.push(el);
  });
  return result;
};

// Example
_.uniq([1, 2, 1, 4, 1, 3]);
// => [1, 2, 4, 3]
```

***sortBy***

_.sortBy(list, iteratee) 
Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee.

```javascript
_.sortBy = (list, iteratee) => {
  if (typeof iteratee === 'string') {
    let res = [];
    const ordered = _.map(list, el => el[iteratee]).sort();
    ordered.forEach(el => {
      list.forEach(key => {
        if (key[iteratee] === el) res.push(key);
      });
    });
    return res;
  }
  if (Array.isArray(list)) {
    return list.sort((a, b) => iteratee(a) - iteratee(b));
  }
  return [];
};

// Example
_.sortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); });
=> [5, 4, 6, 3, 1, 2]

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.sortBy(stooges, 'name');
=> [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
```

***zip***

 _.zip(*arrays) 

Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

```javascript
_.zip = function () {
  const arrays = Array.from(arguments);
  _.each(arrays, el => {
    if (typeof el !== 'string' && !Array.isArray(el)) el = [];
  });
  let final = [], longest = 0;
  if (!arrays.length) return [];
  _.each(arrays, (el, i) => {
    longest = arrays[i].length > longest ? arrays[i].length : longest;
  });
  for (let i = 0; i < longest; i++) {
    final[i] = [];
    _.each(arrays, (el, j) => {
      final[i].push(arrays[j][i]);
    });
  }
  return final;
};

// Example
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
// => [["moe", 30, true], ["larry", 40, false], ["curly", 50, false]]
```

***sortedIndex***

_.sortedIndex(list, value, [iteratee]) 
Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. If an iteratee function is provided, it will be used to compute the sort ranking of each value, including the value you pass. 

```javascript
_.sortedIndex = function (list, value, iteratee) {
  return iteratee
    ? binarySearch(_.sortBy(list, iteratee), value)
    : binarySearch(list, value);
};

// Example
_.sortedIndex([10, 20, 30, 40, 50], 35);
// => 3

var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
_.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
// => 1
```

This function uses a variation of binary search as seen above with _.indexOf.

***flatten***

_.flatten(array, [shallow]) 
Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

```javascript
_.flatten = function (array, shallow) {
  return shallow
    ? array.reduce((a, b) => a.concat(b), [])
    : array.reduce((a, b) => a.concat(Array.isArray(b) ? _.flatten(b) : b),[]);
};

// Example
_.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, [[4]]];
```

***intersection***

_.intersection(*arrays) 
Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

```javascript
_.intersection = function () {
  const arrays = Array.from(arguments);
  const remainingArrays = arrays.slice(1), final = arrays[0];
  return _.reduce(final, (acc, curr) => {
      let passing = true;
      remainingArrays.forEach(el => {
        if (!_.contains(el, curr)) passing = false;
      });
      if (passing) acc.push(curr);
      return acc;
    },[]);
};

// Example
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]
```

***difference***

 difference_.difference(array, *others) 
Returns the values from array that are not present in the other arrays.

```javascript
_.difference = function () {
  let object = {}, result = [];
  const arrays = Array.from(arguments);
  _.each(_.uniq(_.flatten(arrays, true)), el => {
    _.each(arrays, v => {
      if (_.contains(v, el)) {
        object[el] ? object[el] += 1 : object[el] = 1;
      }
    });
  });
  for (let key in object) {
    if (object[key] === 1) result.push(Number(key));
  }
  return result;
};

// Example
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
// => [1, 3, 4]
```


## Collection Methods

***each***

_.each(list, iteratee, [context])

Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list.

```javascript
_.each = (list, iteratee, context) => {
  if (typeof list !== 'object') return [];
  iteratee = iteratee.bind(context);
  let i = 0;
  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
  } else {
    const keys = Object.keys(list);
    for (i; i < keys.length; i++) {
      iteratee(list[keys[i]], keys[i], list);
    }
  }
  return list;
};

// Example
_.each([1, 2, 3], alert);
// => alerts each number in turn...
_.each({one: 1, two: 2, three: 3}, alert);
// => alerts each number value in turn...
```

***filter***

_.filter(list, predicate, [context])

Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

```javascript
_.filter = (list, predicate, context) => {
  predicate = _.iteratee(predicate).bind(context);
  if (typeof list === 'string') return list.split('');
  if (typeof list !== 'object') return [];
  return !predicate ? list
  : _.reduce(list, (acc, el) => {
    if (predicate(el)) acc.push(el);
    return acc;
  }, []);
};

// Example
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]
```

***reject***

_.reject(list, predicate, [context]) 

Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.

```javascript
_.reject = (list, predicate) => {
  predicate = _.iteratee(predicate).bind(context);
  if (typeof list === 'string') return list.split('');
  if (typeof list !== 'object') return [];
  return !predicate ? list
  : _.reduce(list, (acc, el) => {
    if (!predicate(el)) acc.push(el);
    return acc;
  }, []);
};


// Example
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [1, 3, 5]
```

***map***

_.map(list, iteratee, [context])

Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

```javascript
_.map = (list, iteratee, context) => {
  let func = _.iteratee(iteratee).bind(context),
    result = [];
  if (typeof list === 'string') return list.split('');
  _.each(list, (el, i) => {
    let res = func(el, i, list);
    result.push(res);
  });
  return result;
};

// Example
_.map([1, 2, 3], function(num){ return num * 3; });
// => [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
// => [3, 6, 9]
_.map([[1, 2], [3, 4]], _.first);
// => [1, 3]
```

***pluck***

_.pluck(list, propertyName) 

A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

```javascript
_.pluck = (list, propertyName) => {
  let result = [];
  if (typeof list === 'string') {
    if (list.length > 1) {
      for (let i = 0; i < list.length; i++) result.push(undefined);
    } else return [undefined];
  }
  if (!Array.isArray(list)) return result;
  for (let i = 0; i < list.length; i++)
    result.push(list[i][propertyName]);
  return result;
};

// Example
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
_.pluck(stooges, 'name');
// => ["moe", "larry", "curly"]
```

***reduce***

_.reduce(list, iteratee, [memo])
Reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed three arguments: the memo, then the index (or key) of the iteration, and finally a reference to the entire list.

```javascript
_.reduce = (list, iteratee, memo) => {
  let doesAccExist = arguments.length < 3;
  _.each(list, (arrayi, el) => {
    if (doesAccExist) {
      doesAccExist = false;
      memo = arrayi;
    } else {
      memo = iteratee(memo, arrayi, el);
    }
  });
  return memo;
};

// Example
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
=> 6
```

***contains***

_.contains(list, value, [fromIndex]) 

Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

```javascript
_.contains = (list, target, fromIndex) => {
  if (typeof list !== 'object') return false;
  if (!Array.isArray(list)) list = _.values(list);
  if (fromIndex > 0) {
    list = list.slice(fromIndex);
    return _.some(list, el => el === target);
  }
  return _.some(list, el => el === target);
};

// Example
_.contains([1, 2, 3], 3);
// => true
```

***some***

_.some(list, [predicate], [context]) 
Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.

```javascript
_.some = (list, predicate) => {
  if (typeof predicate !== 'function') return false;
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }
  return false;
};

// Example
_.some([null, 0, 'yes', false]);
// => true
```

***every***
_.every(list, [predicate], [context]) 

Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found.

```javascript
_.every = (list, predicate) => {
  if (typeof predicate !== 'function') return true;
  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }
  return true;
};

// Example
_.every([2, 4, 5], function(num) { return num % 2 == 0; });
=> false
```

***where***

_.where(list, properties) 

Looks through each value in the list, returning an array of all the values that contain all of the key-value pairs listed in properties.

```javascript
_.where = (list, properties) => {
  return _.reduce(list, (acc, el) => {
      let passes = true;
      for (let key in properties) {
        if (el[key] !== properties[key]) passes = false;
      }
      return passes ? acc.concat(el) : acc;
    },[]);
};

// Example
_.where(listOfPlays, {author: "Shakespeare", year: 1611});
// => [{title: "Cymbeline", author: "Shakespeare", year: 1611},
//    {title: "The Tempest", author: "Shakespeare", year: 1611}]
```

***shuffle***

_.shuffle(list) 
Returns a shuffled copy of the list.

```javascript
_.shuffle = list => {
  if (typeof list === 'object' && !Array.isArray(list)) {
    list = _.reduce(list, (acc, el) => acc.concat(el), []);
  }
  let l = list.length, current = 0, random;
  while (current < l) {
    random = Math.floor(Math.random() * l);
    [list[current], list[random]] = [list[random], list[current]];
    current++;
  }
  return list;
};

// Example
_.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]
```

***invoke***

_.invoke(list, methodName, *arguments) 
Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

```javascript
_.invoke = function (list, method) {
  const args = Array.from(arguments).slice(2);
  return _.map(list, el => el[method].apply(el, args));
};

// Example
_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
```


## Object Methods

***values***

_.values(object) 
Return all of the values of the object's own properties.

```javascript
_.values = object => {
  let result = [];
  for (let key in object) {
    result.push(object[key]);
  }
  return result;
};

// Example
_.values({one: 1, two: 2, three: 3});
// => [1, 2, 3]
```

***extend***
 
 _.extend(destination, *sources) 

Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

```javascript
_.extend = function (destination) {
  let args = [...arguments].slice(1);
  const reduced = _.reduce(args, (acc, el) => {
    return el !== destination ? acc.concat(el) : acc;
  }, []);
  return typeof destination === 'object'
    ? Object.assign({}, ...reduced)
    : destination;
};

// Example
_.extend({name: 'moe'}, {age: 50});
// => {name: 'moe', age: 50}
```

***defaults***

_.defaults(object, *defaults) 

Fill in undefined properties in object with the first value present in the following list of defaults objects.

```javascript
_.defaults = function (destination) {
  let args = Object.assign({}, ...[...arguments].slice(1));
  for (let source in args) {
    if (!destination[source]) destination[source] = args[source];
  }
  return destination;
};

// Example
var iceCream = {flavor: "chocolate"};
_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
// => {flavor: "chocolate", sprinkles: "lots"}
```

## Function Methods

***once***

_.once(function) 

Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

```javascript
_.once = func => {
  let called = 0;
  return () => {
    if (called < 1) {
      called++;
      return func();
    }
  };
};

// Example
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
```

***memoize***

_.memoize(function) 
Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. The cache of memoized values is available as the cache property on the returned function.

```javascript
_.memoize = function (func) {
  let cache = {};
    return function () { 
        const key = arguments[0];
        if (!cache[key]) {
            cache[key] = func.apply(null, arguments);
        }
        return cache[key];
    };
};

// Example
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
```

***delay***

_.delay(function, wait, *arguments) 

Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.

```javascript
_.delay = (func, wait) => {
  const args = Array.from(arguments);
  setTimeout(() => func.apply(null, args), wait);
};

// Example
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
// => 'logged later' // Appears after one second.
```

***throttle***

_.throttle(function, wait) 
Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

```javascript
_.throttle = function (callback, limit) {
    let timer;
    return () => {
        clearTimeout(timer);
        const args = [].slice.call(arguments);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, limit);
    };
};

// Example
var throttled = _.throttle(updatePosition, 100);
$(window).scroll(throttled);
```

***debounce***

_.debounce(function, wait, [immediate]) 
Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing behavior that should only happen after the input has stopped arriving. For example: rendering a preview of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.

At the end of the wait interval, the function will be called with the arguments that were passed most recently to the debounced function.

Pass true for the immediate argument to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.

```javascript
_.debounce = function (func, wait, immediate) {
	let timeout;
	return function () {
		const hold = () => {
			timeout = null;
			if (!immediate) func.apply(null, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(hold, wait);
		if (immediate && !timeout) func.apply(null, arguments);
	};
};

// Example
var lazyLayout = _.debounce(calculateLayout, 300);
$(window).resize(lazyLayout);
```