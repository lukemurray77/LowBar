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
    })
    it('returns the same value that is passed as the argument', function (){
      var expected = [1,2,3];
      var actual = _.identity(expected);
      expect(actual).to.equal(expected);
    })

  });
});



// describe('What component aspect are you testing?', function () {
//   it('What should the feature do?', function () {
//     var actual = 'What is the actual output?';
//     var expected = 'What is the expected output?';
//     expect(actual).to.equal(expected);
//   });
// });