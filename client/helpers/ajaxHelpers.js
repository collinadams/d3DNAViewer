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
      for(var i = 0; i < persistentData.uniqueDNA.length; i++){
        $('#dnaentered').append('<span id="dnaletter' + i + '">' + persistentData.uniqueDNA[i] + '</span>');
        $('#dbnentered').append('<span id="dbncharacter' + i + '">' + persistentData.uniqueDBN[i] + '</span>');
      }
      drawDNA(persistentData.uniqueGraphData);
    },
    error: function(jqXHR, textStatus, errorThrown){
      throw new Error(errorThrown);
    }
  });
};

var renderUniqueUrl = function(graphData, dnaSequence, dbn){
  $.ajax({
    url: 'http://localhost:4568/getUniqueUrl',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      graphdata: graphData,
      dna: dnaSequence,
      dbn: dbn
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