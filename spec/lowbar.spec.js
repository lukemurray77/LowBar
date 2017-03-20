/* global describe, it */
const path = require('path');
const expect = require('chai').expect;
const _ = require(path.join(__dirname, '..', './lowbar.js'));
const sinon = require('sinon');


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
});






describe('#first', function () {
  it('is a function', function () {
    expect(_.first).to.be.a('function');
  });

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
  it('if an object is the first argument, ', function () {
    function timesTwo(number) { return number * 2 };
    var obj = { a: 1, b: 2, c: 3 };
    var actual = _.each(obj, timesTwo);
    expect(actual).to.equal(obj);
  });
  it('should test the function runs on each element of the array', function () {
    var spy = sinon.spy();

    _.each('hello', spy)
    expect(spy.callCount).to.equal(5);
  });
  it('should work when using the values of each', () => {
    const expected = [2, 4, 6];
    const actual = [];
    _.each([1, 2, 3], function (x) { actual.push(x * 2) })
    expect(actual).to.eql(expected);
  });

});






  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.indexOf.length).to.be.above(2);
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
      expect(_.filter.length).to.be.above(1);
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
      expect(_.reject.length).to.be.above(1);
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
      expect(_.uniq.length).to.be.above(0);
    });
    it('returns an empty array if an object is passed as the first argument', function () {
      expect(_.uniq({})).to.eql([]);
    });
    it('returns a duplicate free version of the array passed as the first argument.', function () {
      var expected = [1, 2, 4, 3];
      var actual = _.uniq([1, 2, 1, 4, 1, 3]);
      expect(actual).to.eql(expected);
    });
    it('should work if optional iteratee is passed', () => {
      const expected = [2, 4, 8, 6];
      function timesTwo (x) {return x * 2};
      const actual = _.uniq([1,1,2, 4, 3,3, 2,1], false, timesTwo)
      expect(actual).to.eql(expected)
    });

  });

  describe('#map', function () {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.map.length).to.be.above(1);
    });
    it('should return a new array of values created by passing each element to the iteratee', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      var expected = [2, 4, 6];
      var actual = _.map([1, 2, 3], timesTwo);
      expect(actual).to.eql(expected);
    });
    it('should return a new object of key value pairs created by passing each value to the iteratee', function () {
      function timesTwo(number, ind, list) { return number * 2 };
      var expected = [2,4,6];
      var actual = _.map({ a: 1, b: 2, c: 3 }, timesTwo);
      expect(actual).to.eql(expected);
    });

  });

//   describe('#pluck', function () {
//     it('is a function', function () {
//       expect(_.pluck).to.be.a('function');
//     });
//     it('function should take at least 2 arguments', function () {
//       expect(_.pluck.length).to.be.above(1);
//     });
//     it('function should return an empty array if the first argument is not an array', function () {
//       var expected = [];
//       var actual = _.pluck(1234, 'name');
//       expect(actual).to.eql(expected)
//     });
//     it('function should take an array of objects and return an array of key values in the objects', function () {
//       var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
//       var expected = ["moe", "larry", "curly"];
//       var actual = _.pluck(stooges, 'name');
//       expect(actual).to.eql(expected)
//     });

//   });

  describe('#reduce', function () {
    it('is a function', function () {
      expect(_.reduce).to.be.a('function');
    });
    it('function should take at least 2 arguments', function () {
      expect(_.reduce.length).to.be.above(1);
    });
    it('should sum an array of values to return one number', function () {
      function add(memo, num) { return memo += num }
      var expected = 545;
      var actual = _.reduce([34, 23, 342, 123, 23], add);
      expect(actual).to.equal(expected);
    });

    it('should return a new array of iteratee values when the starting value is an array', function () {
      function double(memo, value) {
        memo.push(value * 2);
        return memo;
      };
      var expected = [2, 4, 6, 8, 10];
      var actual = _.reduce([1, 2, 3, 4, 5], double, []);
      expect(actual).to.eql(expected);
    });
    it('should work for objects', () => {
      function add(memo, num) { return memo += num }
      var expected = 545;
      var actual = _.reduce({a:34, b:23, c:342, d:123, e:23}, add);
      expect(actual).to.equal(expected);
    });

  });

  describe.only('#extend', function () {
   it('should be a function', function () {
     expect(_.extend).to.be.a("function");
   });
   it('should copy shallowly all properties in source object to the destination object', function () {
     expect(_.extend({ name: 'moe' }, { age: 50 })).to.eql({ name: 'moe', age: 50 });
   });
   it("copies the properties of the source object into the target", function () {
     var actual = _.extend({}, { name: "Sam" });
     var expected = { name: "Sam" };
     expect(actual).to.eql(expected);
   })
   it("overwrites existing properties", function () {
     var actual = _.extend({}, { name: "joe", name: "Sam" });
     var expected = { name: "Sam" };
     expect(actual).to.eql(expected);
   })
   it("copies properties from multiple source arguments", function () {
     var actual = _.extend({ name: "sam" }, { name: "Joe" }, { name: "Mauro", age: 27 })
     var expected = { name: "Mauro", age: 27 }
     expect(actual).to.eql(expected);
   });
 });

//   describe('#contains', function () {
//     it('is a function', function () {
//       expect(_.contains).to.be.a('function');
//     });
//     it('takes 2 or more arguments', function () {
//       expect(_.contains.length).to.be.above(1);
//     });
//     it('takes an array or object as the first argument, otherwise returns false', function () {
//       expect(_.contains()).to.equal(false);
//       expect(_.contains(123)).to.equal(false);
//       expect(_.contains([12, 2, 3], 5)).to.equal(false);
//     });
//     it('returns true if the value provided in the second argument is present in the array', function () {
//       var expected = true;
//       var actual = _.contains([1, 2, 3, 4, 5], 4);
//       expect(actual).to.eql(expected);
//     });
//   });


//   describe('#every', function () {
//     it('is a function', function () {
//       expect(_.every).to.be.a('function');
//     });
//     it('takes 1 or more arguments', function () {
//       expect(_.every.length).to.be.above(0);
//     });
//     it('should return true if all the values in the list pass the truth test provided in the second argument', function () {
//       function isEven(num) { return num % 2 === 0; };
//       var expected = false;
//       var actual = _.every([2, 4, 5], isEven);
//       expect(actual).to.equal(expected);
//       function wordLength(word) { return word.length > 5 };
//       var wordsArr = ['helloworld', 'northcoders', 'iamacoder'];
//       var actual = _.every(wordsArr, wordLength);
//       expect(actual).to.equal(true);
//     });
//     it('should work for objects', () => {
//       function isEven(num) { return num % 2 === 0; };
//       var actual = _.every({a: 2, b: 4, c: 10}, isEven);
//       expect(actual).to.equal(true);
//       function wordLength(word) { return word.length > 5 };
//       var wordsArr = {a:'helloworld', b:'northcoders', c:'notaclue'};
//       var actual = _.every(wordsArr, wordLength);
//       expect(actual).to.equal(true);

//     });

//   });
//   describe('#some', () => {
//     it('is a function', () => {
//       expect(_.some).to.be.a('function');
//     });
//     it('should return true if no 2nd argument is given', () => {
//       expect(_.some([1,2,3,4])).to.equal(true);
//     });
//     it('should take a list as an argument, and return true if just one element of the list passes the truth test', () => {
//       const shouldBeTrue = _.some([5,10,20,50,100], function(x){return x > 50});
//       const shouldBeFalse = _.some([5,10,20,50,35], function(x){return x > 50});
//       expect(shouldBeTrue).to.equal(true);
//       expect(shouldBeTrue).to.equal(false);
//     });
//     it('should work for objects', () => {
//       const shouldBeTrue = _.some({a: 10, b: 20, c: 45, d: 500}, function(x){return x > 50});
//       const shouldBeFalse = _.some({a: 10, b: 20, c: 45, d: 50}, function(x){return x > 50});
//       expect(shouldBeTrue).to.equal(true);
//       expect(shouldBeTrue).to.equal(false);
//     });
//   });


// });
