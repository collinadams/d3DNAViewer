var drawDNA = function(drawData){
  var width = 600;
  var height = 300;

  var target = document.getElementById('spinner');
  spinner = new Spinner(spinnerOptions).spin(target);

  var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);

  var force = d3.layout.force()
              .size([width, height])
              .nodes(drawData.nodes)
              .links(drawData.links)
              .linkDistance(8)
              .charge(-30);

  var link = svg.selectAll('line')
              .data(drawData.links)
              .enter().append('line')
              .attr('stroke', '#777')
              .attr('stroke-width', 2)
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
    node
    .attr('cx', function(d, i){
      d.fixed = true;
      return d.x;
    })
    .attr('cy', function(d, i){
      d.fixed = true;
      return d.y;
    })
    .style('visibility', 'visible');

    link
    .attr('x1', function(d){
      d.fixed = true;
      return d.source.x;
    })
    .attr('y1', function(d){
      d.fixed = true;
      return d.source.y;
    })
    .attr('x2', function(d){
      d.fixed = true;
      return d.target.x;
    })
    .attr('y2', function(d){
      d.fixed = true;
      return d.target.y;
    })
    .style('visibility', 'visible');
  }; 

  // force.on('tick', function(){
  //   updateSvgPositions();
  // });

  force.on('end', function(){
    updateSvgPositions();    
    $('#uniqueurlbutton').on('click', function(){
      dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
      dbnEnteredByUser = $('#dbninput').val();
      renderUniqueUrl(drawData, dnaSequenceEnteredByUser, dbnEnteredByUser);
    });
    spinner.stop();
  });
  force.start();
};