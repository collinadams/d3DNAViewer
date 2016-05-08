var renderPersistentData = function(uniqueID){
  $.ajax({
    url: 'http://localhost:4568/graphdata',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({uniqueid: uniqueID}),
    dataType: 'text',
    success: function(data){
      var persistentData = JSON.parse(data);
      $('#dnaentered').text('5\'-to-3\' DNA entered: ' + persistentData.uniqueDNA);
      $('#dbnentered').text('5\'-to-3\' DBN entered: ' + persistentData.uniqueDBN);
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