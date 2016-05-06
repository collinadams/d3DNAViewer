var dnaSequenceStringToArray = function(dnaSequenceString){
  var dnaSequenceArray = dnaSequenceString
                          .split('')
                          .map(function(nucleotideLetter){
                            var nucleotideObject = {nucleotideLetter: nucleotideLetter};
                            if(nucleotideLetter === 'A'){
                              nucleotideObject.color = 'green';
                            }else if(nucleotideLetter === 'C'){
                              nucleotideObject.color = 'blue';
                            }else if(nucleotideLetter === 'G'){
                              nucleotideObject.color = 'black';
                            }else if(nucleotideLetter === 'T'){
                              nucleotideObject.color = 'red';
                            }else if(nucleotideLetter === 'N'){
                              nucleotideObject.color = 'yellow';
                            }
                            return nucleotideObject;
                          });

  return dnaSequenceArray;
};

//the below function assumes that the dbnString input has balanced parens
//TODO: optimize quadratic time complexity
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
    }else{
      return 'The DBN String inputh contains an invalid character';
    }
    if(parenCounter === 0){
      return i;
    }
  }
};

var findPairedBasesInDBA = function(DBNString){
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