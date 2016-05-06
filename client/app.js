var rawTestDNASequenceString = 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT';

var rawTestDBN = '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............';

$('#dbn').append('<span>' + rawTestDBN + '</span>');

var sampleData = {
  nodes: dnaSequenceStringToArray(rawTestDNASequenceString),
  links: findPairedBasesInDBA(rawTestDBN).concat(makeLinksForPhosphateBackbone(rawTestDBN))
};

var drawDNA = function(drawData){
  var width = 600;
  var height = 300;
  var alreadyPositioned = !!(drawData.nodes && drawData.nodes[0].fixed);

  if(!alreadyPositioned){
    var target = document.getElementById('spinner');
    spinner = new Spinner(spinnerOptions).spin(target);
  }

  var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);

  var force = d3.layout.force()
              .size([width, height])
              .nodes(drawData.nodes)
              .links(drawData.links)
              .linkDistance(8)
              .charge(-30);

  var link = svg.selectAll('.link')
              .data(drawData.links)
              .enter().append('line')
              .attr('class', 'link')
              .style('visibility', 'hidden');

  var node = svg.selectAll('circle')
              .data(drawData.nodes)
              .enter().append('circle')
              .attr('r', 4)
              .attr('fill', function(d){
                return d.color;
              })
              .style('visibility', 'hidden');

  var updateSvgPositions = function(){
    node.attr('cx', function(d, i){
      return d.x;
    })
    .attr('cy', function(d, i){
      return d.y;
    })
    .style('visibility', 'visible');

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
    })
    .style('visibility', 'visible');
  };     

  if(!alreadyPositioned){
    force.on('end', function(){
      updateSvgPositions();
      drawData.nodes.forEach(function(d){
        d.fixed = true;
      });
      drawDNA(drawData);
    });
    force.start();
  }else{
    // updateSvgPositions();
    $('button').on('click', function(){
      getAndRenderUniqueUrl(drawData);
    });
    spinner.stop();
  }        

  // force.on('tick', function(){

  // })
};

var getAndRenderUniqueUrl = function(graphData){
  $.ajax({
    url: 'http://localhost:4568/getUniqueUrl',
    type: 'POST',
    contentType: 'text/plain',
    data: JSON.stringify(graphData),
    dataType: "text",
    success: function(data){
      var uniqueSuffix = JSON.parse(data).uniqueSuffix;
      $('#uniqueurl').append('<div>Unique URL is: <input value="http://localhost:4568/' + uniqueSuffix + '"></div>');
    },
    error: function(jqXHR, textStatus, errorThrown){
      throw new Error(errorThrown);
    }
  });
};

drawDNA(sampleData);