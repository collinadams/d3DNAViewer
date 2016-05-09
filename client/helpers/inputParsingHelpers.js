var dnaSequenceStringToArray = function(dnaSequenceString, adenineColor, thymineColor, cytosineColor, guanineColor){
  var dnaSequenceArray = dnaSequenceString
                          .split('')
                          .map(function(nucleotideLetter){
                            var nucleotideObject = {nucleotideLetter: nucleotideLetter};
                            if(nucleotideLetter === 'A'){
                              nucleotideObject.color = adenineColor;
                            }else if(nucleotideLetter === 'C'){
                              nucleotideObject.color = cytosineColor;
                            }else if(nucleotideLetter === 'G'){
                              nucleotideObject.color = guanineColor;
                            }else if(nucleotideLetter === 'T'){
                              nucleotideObject.color = thymineColor;
                            }else if(nucleotideLetter === 'N'){
                              nucleotideObject.color = 'yellow';
                            }
                            return nucleotideObject;
                          });

  return dnaSequenceArray;
};

var findIndexOfMatchingBase = function(DBNSubArray){
  var parenCounter = 1;
  for(var i = 1; i < DBNSubArray.length; i++){
    var currCharacter = DBNSubArray[i];
    if(currCharacter === '.'){
      continue;
    }else if(currCharacter === '('){
      parenCounter++;
    }else if(currCharacter === ')'){
      parenCounter--;
    }

    if(parenCounter === 0){
      return i;
    }
  }
};

var checkBalancedParens = function(DBNString){
  var DBNArray = DBNString.split('');
  var parensSoFar = [];
  for(var i = 0; i < DBNArray.length; i++){
    currCharacter = DBNArray[i];
    if(!(currCharacter === '.' || currCharacter === '(' || currCharacter === ')')){
      window.alert('The DBN String inputh contains at least one invalid character');
      throw new Error('The DBN String inputh contains at least one invalid character');
    }
    if(currCharacter === '('){
      parensSoFar.push(currCharacter);
    }else if(currCharacter === ')'){
      if(parensSoFar.pop() !== '('){
        return false;
      }
    }
  }
  return parensSoFar.length === 0;
};

var findPairedBasesInDBA = function(DBNString){
  if(!(checkBalancedParens(DBNString))){
    window.alert('The parentheses in the DBN string are not balanced.');
    throw new Error('The parentheses in the DBN string are not balanced.');
  }
  var arrayOfPairedBases = [];
  var DBNArray = DBNString.split('');
  for(var j = 0; j < DBNArray.length; j++){
    var currCharacter = DBNArray[j];
    if(currCharacter === '('){
      var basePairSubArray = DBNArray.slice(j);
      arrayOfPairedBases.push({
        source: j,
        target: j + findIndexOfMatchingBase(basePairSubArray)
      });
    }else{
      continue;
    }
  }
  return arrayOfPairedBases;
};

var makeLinksForPhosphateBackbone = function(DBNString){
  var arrayOfPhosphateBackboneLinks = [];
  var DBNArray = DBNString.split('');
  for(var i = 0; i < DBNArray.length - 1; i++){
    arrayOfPhosphateBackboneLinks.push({
      source: i,
      target: i + 1
    });
  }
  return arrayOfPhosphateBackboneLinks;
};

module.exports = {
  dnaSequenceStringToArray: dnaSequenceStringToArray,
  findIndexOfMatchingBase: findIndexOfMatchingBase,
  checkBalancedParens: checkBalancedParens,
  findPairedBasesInDBA: findPairedBasesInDBA,
  makeLinksForPhosphateBackbone: makeLinksForPhosphateBackbone
};