var width = 640;
var height = 480;

// var nodes = [
//   {
//     x: width/3, 
//     y: height/2
//   },
//   {
//     x: 2*width/3, 
//     y: height/2}
// ];

// var links = [
//   {
//     source: 0, 
//     target: 1
//   }
// ];

var rawTestDNASequenceString = 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT';

var rawTestDBN = '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............';


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

var nodes = dnaSequenceStringToArray(rawTestDNASequenceString);
var links = findPairedBasesInDBA(rawTestDBN).concat(makeLinksForPhosphateBackbone(rawTestDBN));

var svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

var force = d3.layout.force()
            .size([width, height])
            .nodes(nodes)
            .links(links);
            // .linkDistance(width/2);

// var link = svg.selectAll('.link')
//             .data(links)
//             .enter().append('line')
//             .attr('class', 'link');

// var node = svg.selectAll('.node')
//             .data(nodes)
//             .enter().append('circle')
//             .attr('class', 'node');

var link = svg.selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('class', 'link');

var node = svg.selectAll('circle')
            .data(nodes)
            .enter().append('circle')
            .attr('r', 5)
            .attr('fill', function(d){
              return d.color;
            });






force.on('tick', function(){
  node.attr('cx', function(d){
    return d.x;
  })
  .attr('cy', function(d){
    return d.y;
  });

  link.attr('x1', function(d){
    return d.source.x;
  })
  .attr('y1', function(d){
    return d.source.y;
  })
  .attr('x2', function(d){
    return d.target.x;
  })
  .attr('y2', function(d){
    return d.target.y;
  });
})

force.start();
// force.on('end', function(){
//   node.attr('r', width/25)
//       .attr('cx', function(d){
//         return d.x;
//       })
//       .attr('cy', function(d){
//         return d.y;
//       });

//   link.attr('x1', function(d){
//         return d.source.x;
//       })
//       .attr('y1', function(d){
//         return d.source.y;
//       })
//       .attr('x2', function(d){
//         return d.target.x;
//       })
//       .attr('y2', function(d){
//         return d.target.y;
//       });
// });


















