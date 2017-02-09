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
    it('is a function', function() {
      expect(_.identity).to.be.a('function');
    });
    
    it('function should take one argument', function () {
      expect(_.identity.length).to.equal(1)
    });
    
    it('returns the same value that is passed as the argument', function (){
      var expected = [1,2,3];
      var actual = _.identity(expected);
      expect(actual).to.equal(expected);
    });
 });






  describe('#first', function () {
      it('is a function', function() {
        expect(_.first).to.be.a('function');
      }); 
      
      // it('function must have a first argument that is an array', function () {
      //   var expected
      // });
      
      it('function returns the first element of a passed array', function (){
        var expected = 1;
        var actual = _.first([1,2,3]);
        expect(actual).to.equal(expected);
      });

      it('function returns an array of the first n number of elements if n is passed', function (){
        var expected = [1,2,3];
        var actual = _.first([1,2,3,4,5], 3);
        expect(actual).to.eql(expected);
      });
  });







  describe('#last', function () {
      it('is a function', function() {
        expect(_.last).to.be.a('function');
      }); 
      
      it('function returns the last element of a passed array', function (){
        var expected = 3;
        var actual = _.last([1,2,3]);
        expect(actual).to.equal(expected);
      });

      it('function returns an array of the last n number of elements if n is passed', function (){
        var expected = [3,4,5];
        var actual = _.last([1,2,3,4,5], 3);
        expect(actual).to.eql(expected);
      });
  });
  
  describe('#each', function () {
      it('is a function', function() {
        expect(_.each).to.be.a('function');
      }); 
      it('function should take at least 2 arguments', function() {
        expect(_.each.length).to.equal(2);
      });
      it('if an array is the first argument, pass the element, i, list into the iteratee', function() {
        function timesTwo(number, ind, list) { return number * 2}; 
        var arr = [1,2,3]
        var actual = _.each(arr, timesTwo);
        expect(actual).to.equal(arr);
      });
      it('if an object is the first argument, ', function() {
        function timesTwo(number) { return number * 2}; 
        var obj = {a:1, b:2, c:3};
        var actual = _.each(obj, timesTwo);
        expect(actual).to.equal(obj);
      });
      
  });






  describe('#indexOf', function () {
      it('is a function', function() {
        expect(_.indexOf).to.be.a('function');
      }); 
      it('function should take at least 2 arguments', function() {
        expect(_.indexOf.length).to.equal(2);
      });
      it('function should return the index of the passed element in the passed array', function() {
        var arr = [1,2,3];
        var actual = _.indexOf(arr, 2);
        var expected = 1;
        expect(actual).to.equal(expected);
      });
      it('function should return -1 if the value is not present in the array', function() {
        var arr = [1,2,3];
        var actual = _.indexOf(arr, 6);
        var expected = -1;
        expect(actual).to.equal(expected);
      });
      it('function should return -1 if the first argument is not an array', function() {
        var arr = 12345;
        var actual = _.indexOf(arr, 3);
        var expected = -1;
        expect(actual).to.equal(expected);
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