var expect = require('chai').expect;

var inputParsingHelpers = require('../../client/helpers/inputParsingHelpers.js');

describe('Input Parsing Helper Functions', function(){

  it('should successfully run true tests', function(done){
    expect(true).to.equal(true);
    done();
  });

  describe('Helper function to convert DNA string to array of color-coded objects', function(){

    it('should return an array', function(done){
      expect(inputParsingHelpers.dnaSequenceStringToArray(mockDNAString)).to.be.instanceof(Array);
      done();
    });

    it('should return an array with as many indeces as letters in the original string', function(done){
      expect(inputParsingHelpers.dnaSequenceStringToArray(mockDNAString).length).to.equal(mockDNAString.length);
      done();
    });

    it('should return an array with color-coded objects', function(done){
      for(var i = 0; i < mockDNAString.length; i++){
        expect(
          inputParsingHelpers.dnaSequenceStringToArray(mockDNAString)[i].color === 'green' ||
          inputParsingHelpers.dnaSequenceStringToArray(mockDNAString)[i].color === 'red' ||
          inputParsingHelpers.dnaSequenceStringToArray(mockDNAString)[i].color === 'blue' ||
          inputParsingHelpers.dnaSequenceStringToArray(mockDNAString)[i].color === 'black');
      }
      done();
    });
  });
  
  describe('Helper function to find complementary base pair connections', function(){

    it('should return an array', function(done){
      expect(inputParsingHelpers.findPairedBasesInDBA(mockDBNString)).to.be.instanceof(Array);
      done();
    });

    it('should return an array with as many indeces as pairs of parens in DBN String', function(done){
      expect(inputParsingHelpers.findPairedBasesInDBA(mockDBNString).length).to.equal(countParenPairs(mockDBNString));
      done();
    });

    it('should return link objects with accurate source and target node references', function(done){
      expect(inputParsingHelpers.findPairedBasesInDBA(mockDBNString)[0].source).to.equal(0);
      expect(inputParsingHelpers.findPairedBasesInDBA(mockDBNString)[0].target).to.equal(5);
      done();  
    });
  });

  describe('Helper function to make links for phosphate backbone', function(){

    it('should return an array', function(done){
      expect(inputParsingHelpers.makeLinksForPhosphateBackbone(mockDBNString)).to.be.instanceof(Array);
      done();
    });

    it('should return an array with one less index than letters in the original string', function(done){
      expect(inputParsingHelpers.makeLinksForPhosphateBackbone(mockDBNString).length).to.equal(mockDBNString.length - 1);
      done();
    });

    it('should connect each node to the node that immediately follows', function(done){
      for(var i = 0; i < mockDBNString.length - 1; i++){
        expect(inputParsingHelpers.makeLinksForPhosphateBackbone(mockDBNString)[i].target).to.equal(i + 1);
      }
      done();
    });
  });   
});

var mockDNAString = 'AATTGGCCAA';
var mockDBNString = '(....)....';

var countParenPairs = function(sampleDBNString){
  var numOfParens = 0;
  for(var i = 0; i < sampleDBNString.length; i++){
    if(sampleDBNString[i] === '(' || sampleDBNString[i] === ')'){
      numOfParens++;
    }
  }
  return numOfParens/2;
};