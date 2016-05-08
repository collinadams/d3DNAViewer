$(document).on('ready', function(){

  var uniqueID = window.location.href.slice(22);
  var dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
  var dbnEnteredByUser = $('#dbninput').val();

  if(!!(uniqueID)){
    renderPersistentData(uniqueID);
  }
  
  $('#moleculeviewerbutton').on('click', function(event){
    event.preventDefault();

    $('svg').remove();
    dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
    dbnEnteredByUser = $('#dbninput').val();
    $('#dbnentered').text('The DBN you entered is: ' + dbnEnteredByUser);
    $('#dnaentered').text('The DNA you entered is: ' + dnaSequenceEnteredByUser);

    if(dnaSequenceEnteredByUser.length !== dbnEnteredByUser.length){
      window.alert('The DNA sequence (length: ' + dnaSequenceEnteredByUser.length +') and DBN sequence (length: ' + dbnEnteredByUser.length + ') must have the same length.');
      return;
    }

    var forceLayoutData = {
      nodes: dnaSequenceStringToArray(dnaSequenceEnteredByUser),
      links: findPairedBasesInDBA(dbnEnteredByUser).concat(makeLinksForPhosphateBackbone(dbnEnteredByUser))
    };

    drawDNA(forceLayoutData);
  });
});
