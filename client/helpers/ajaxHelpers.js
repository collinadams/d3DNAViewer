var renderPersistentData = function(uniqueID){
  $.ajax({
    url: 'http://localhost:4568/graphdata',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({uniqueid: uniqueID}),
    dataType: 'text',
    success: function(data){
      var persistentData = JSON.parse(data);
      $('#dbnentered').text('The DBN you entered is: ' + persistentData.uniqueDBN);
      $('#dnaentered').text('The DNA you entered is: ' + persistentData.uniqueDNA);
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