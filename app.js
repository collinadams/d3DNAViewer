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
}

var nodes = dnaSequenceStringToArray(rawTestDNASequenceString);
var links = [{source: 0, target: 1}, {source: 2, target: 0}, {source: 1, target: 2}];

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


















