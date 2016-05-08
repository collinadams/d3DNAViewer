var drawDNA = function(drawData){
  var width = 900;
  var height = 450;

  var target = document.getElementById('spinner');
  spinner = new Spinner(spinnerOptions).spin(target);

  var svg = d3.select('body').append('svg')
              .attr('width', width)
              .attr('height', height);

  var force = d3.layout.force()
              .size([width, height])
              .nodes(drawData.nodes)
              .links(drawData.links)
              .linkDistance(17)
              .charge(-30);

  var link = svg.selectAll('line')
              .data(drawData.links)
              .enter()
              .append('line')
              .attr('stroke', function(d, i){
                if(i < drawData.nodes.length - 1){
                  return 'black';
                }else{
                  return '#808080';
                }
              })
              .attr('stroke-width', 2)
              .style('visibility', 'hidden');

  var node = svg.selectAll('.node')
              .data(drawData.nodes)
              .enter()
              .append('g')
              .attr('class', 'node')
              .style('visibility', 'hidden');

              node
                .append("circle")
                .attr('r', 4)
                .attr('fill', function(d){
                  return d.color;
                });

              node
                .append("text")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(function(d, i){
                  if(i === 0){
                    return '5\' ' + d.nucleotideLetter;
                  }else if(i === drawData.nodes.length - 1){
                    return '3\' ' + d.nucleotideLetter;
                  }else{
                    return d.nucleotideLetter;
                  }
                });

  var updateSvgPositions = function(){
    node
    .attr('x', function(d, i){
      d.fixed = true;
      return d.x;
    })
    .attr('y', function(d, i){
      d.fixed = true;
      return d.y;
    })
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .on('mouseover', function(d, i){
      d3.select(this).attr('fill', 'yellow');
      $('#dnaletter' + i).css('background-color', 'yellow');
      $('#dbncharacter' + i).css('background-color', 'yellow');
    })
    .on('mouseout', function(d, i){
      d3.select(this).attr('fill', 'black');
      $('#dnaletter' + i).css('background-color', 'white');
      $('#dbncharacter' + i).css('background-color', 'white');
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

  force.on('end', function(){
    updateSvgPositions();    
    $('#uniqueurlbutton').on('click', function(){
      dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
      dbnEnteredByUser = $('#dbninput').val();
      adenineColor = $('input[name=adenine]:checked', '#dnaform').val();
      thymineColor = $('input[name=thymine]:checked', '#dnaform').val();
      cytosineColor = $('input[name=cytosine]:checked', '#dnaform').val();
      guanineColor = $('input[name=guanine]:checked', '#dnaform').val();
      renderUniqueUrl(drawData, dnaSequenceEnteredByUser, dbnEnteredByUser, adenineColor, thymineColor, cytosineColor, guanineColor);
    });
    spinner.stop();
  });
  force.start();
};