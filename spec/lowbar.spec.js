/* global describe, it */
var path = require('path');
var expect = require('chai').expect;
var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });





  describe('#identity', function () {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });

    it('function should take one argument', function () {
      expect(_.identity.length).to.equal(1)
    });

    it('returns the same value that is passed as the argument', function () {
      var expected = [1, 2, 3];
      var actual = _.identity(expected);
      expect(actual).to.equal(expected);
    });
  });






  describe('#first', function () {
    it('is a function', function () {
      expect(_.first).to.be.a('function');
    });

    // it('function must have a first argument that is an array', function () {
    //   var expected
    // });

    it('function returns the first element of a passed array', function () {
      var expected = 1;
      var actual = _.first([1, 2, 3]);
      expect(actual).to.equal(expected);
    });

    it('function returns an array of the first n number of elements if n is passed', function () {
      var expected = [1, 2, 3];
      var actual = _.first([1, 2, 3, 4, 5], 3);
      expect(actual).to.eql(expected);
    });
  });







  describe('#last', function () {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });

    it('function returns the last element of a passed array', function () {
      var expected = 3;
      var actual = _.last([1, 2, 3]);
      expect(actual).to.equal(expected);
    });

    it('function returns an array of the last n number of elements if n is passed', function () {
      var expected = [3, 4, 5];
      var actual = _.last([1, 2, 3, 4, 5], 3);
      expect(actual).to.eql(expected);
    });
  });

  describe('#each', function () {
    it('is a function', function () {
      expect(_.each).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.each.length).to.equal(2);
    });
    it('if an array is the first argument, pass the element, i, list into the iteratee', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      var arr = [1, 2, 3]
      var actual = _.each(arr, timesTwo);
      expect(actual).to.equal(arr);
    });
    it('if an object is the first argument, ', function () {
      function timesTwo(number) { return number * 2 };
      var obj = { a: 1, b: 2, c: 3 };
      var actual = _.each(obj, timesTwo);
      expect(actual).to.equal(obj);
    });

  });






  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.indexOf.length).to.equal(2);
    });
    it('function should return the index of the passed element in the passed array', function () {
      var arr = [1, 2, 3];
      var actual = _.indexOf(arr, 2);
      var expected = 1;
      expect(actual).to.equal(expected);
    });
    it('function should return -1 if the value is not present in the array', function () {
      var arr = [1, 2, 3];
      var actual = _.indexOf(arr, 6);
      var expected = -1;
      expect(actual).to.equal(expected);
    });
    it('function should return -1 if the first argument is not an array', function () {
      var arr = 12345;
      var actual = _.indexOf(arr, 3);
      var expected = -1;
      expect(actual).to.equal(expected);
    });

  });

  describe('#filter', function () {
    it('is a function', function () {
      expect(_.filter).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.filter.length).to.equal(2);
    });
    it('function should return a new array that pass the predicate argument', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var func = function isEven(num) { return num % 2 === 0 }
      var actual = _.filter(arr, func);
      var expected = [2, 4, 6, 8, 10];
      expect(actual).to.eql(expected);
    });
  });

  describe('#reject', function () {
    it('is a function', function () {
      expect(_.reject).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.reject.length).to.equal(2);
    });
    it('function should return a new array that pass the predicate argument', function () {
      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var func = function isEven(num) { return num % 2 === 0 }
      var actual = _.reject(arr, func);
      var expected = [1, 3, 5, 7, 9];
      expect(actual).to.eql(expected);
    });
  });

  describe('#uniq', function () {
    it('is a function', function () {
      expect(_.uniq).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.uniq.length).to.equal(1);
    });
    it('returns an empty array if an object is passed as the first argument', function () {
      expect(_.uniq({})).to.eql([]);
    });
    it('returns a duplicate free version of the array passed as the first argument.', function () {
      var expected = [1, 2, 4, 3];
      var actual = _.uniq([1, 2, 1, 4, 1, 3]);
      expect(actual).to.eql(expected);
    });

  });

  describe('#map', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.map.length).to.be.above(1);
    });
    it('first argument should be either an array, object or string, if not return []', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      expect(_.map(123, timesTwo)).to.eql([]);
    });
    it('should return a new array of values created by passing each element to the iteratee', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      var expected = [2, 4, 6];
      var actual = _.map([1, 2, 3], timesTwo);
      expect(actual).to.eql(expected);
    });
    it('should return a new object of key value pairs created by passing each value to the iteratee', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      var expected = { a: 2, b: 4, c: 6 };
      var actual = _.map({ a: 1, b: 2, c: 3 }, timesTwo);
      expect(actual).to.eql(expected);
    });

  });

  describe('#pluck', function () {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.pluck.length).to.be.above(1);
    });
     it('function should return an empty array if the first argument is not an array', function () {
      var expected = [];
      var actual = _.pluck(1234, 'name');
      expect(actual).to.eql(expected)
    });
    it('function should take an array of objects and return an array of key values in the objects', function () {
      var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
      var expected = ["moe", "larry", "curly"];
      var actual = _.pluck(stooges, 'name');
      expect(actual).to.eql(expected)
    });
  
  });

  describe('#reduce', function () {
    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.reduce.length).to.be.above(1);
    });
    it('should return a single value from a list of values as a result of the iteratee', function () {
      function add(memo, value) { return memo + value };
      var expected = 15;
      var actual = _.reduce([1, 2, 3, 4, 5], add, 0);
      expect(actual).to.eql(expected);
    });
    it('should return a new array of iteratee values when the starting value is an array', function () {
      function double(value) { return value * 2 };
      var expected = [2, 4, 6, 8, 10];
      var actual = _.reduce([1, 2, 3, 4, 5], double, []);
      expect(actual).to.eql(expected);
    });
  });



});



// describe('What component aspect are you testing?', function () {
//   it('What should the feature do?', function () {
//     var actual = 'What is the actual output?';
//     var expected = 'What is the expected output?';
//     expect(actual).to.equal(expected);
//   });
// });