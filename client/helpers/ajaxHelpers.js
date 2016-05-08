var renderPersistentData = function(uniqueID){
  $.ajax({
    url: 'http://localhost:4568/graphdata',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({uniqueid: uniqueID}),
    dataType: 'text',
    success: function(data){
      var persistentData = JSON.parse(data);

      $('#dnaentered').empty();
      $('#dbnentered').empty();
      $('input[name=adenine][value=' + persistentData.uniqueAdenine + ']', '#dnaform').prop('checked', true);
      $('input[name=thymine][value=' + persistentData.uniqueThymine + ']', '#dnaform').prop('checked', true);
      $('input[name=cytosine][value=' + persistentData.uniqueCytosine + ']', '#dnaform').prop('checked', true);
      $('input[name=guanine][value=' + persistentData.uniqueGuanine + ']', '#dnaform').prop('checked', true);
      $('#noderadius').val(persistentData.uniqueNodeRadius);

      for(var i = 0; i < persistentData.uniqueDNA.length; i++){
        $('#dnaentered').append('<span id="dnaletter' + i + '">' + persistentData.uniqueDNA[i] + '</span>');
        $('#dbnentered').append('<span id="dbncharacter' + i + '">' + persistentData.uniqueDBN[i] + '</span>');
      }
      drawDNA(persistentData.uniqueGraphData, persistentData.uniqueNodeRadius);
    },
    error: function(jqXHR, textStatus, errorThrown){
      throw new Error(errorThrown);
    }
  });
};

var renderUniqueUrl = function(graphData, dnaSequence, dbn, adenineColor, thymineColor, cytosineColor, guanineColor, nodeRadius){
  $.ajax({
    url: 'http://localhost:4568/getUniqueUrl',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      graphdata: graphData,
      dna: dnaSequence,
      dbn: dbn,
      adenineColor: adenineColor,
      thymineColor: thymineColor,
      cytosineColor: cytosineColor,
      guanineColor: guanineColor,
      nodeRadius: nodeRadius
    }),
    dataType: "text",
    success: function(data){
      var uniqueSuffix = JSON.parse(data).uniqueSuffix;
      $('#uniqueurl').append('<span>Unique URL is: <input value="http://localhost:4568/' + uniqueSuffix + '"></span>');
    },
    error: function(jqXHR, textStatus, errorThrown){
      throw new Error(errorThrown);
    }
  });
};