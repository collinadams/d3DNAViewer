$(document).on('ready', function(){

  var uniqueID = window.location.href.slice(22);
  var dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
  var dbnEnteredByUser = $('#dbninput').val();
  var adenineColor = $('input[name=adenine]:checked', '#dnaform').val();
  var thymineColor = $('input[name=thymine]:checked', '#dnaform').val();
  var cytosineColor = $('input[name=cytosine]:checked', '#dnaform').val();
  var guanineColor = $('input[name=guanine]:checked', '#dnaform').val();

  if(!!(uniqueID)){
    renderPersistentData(uniqueID);
  }


  
  $('#moleculeviewerbutton').on('click', function(event){
    event.preventDefault();

    $('svg').remove();
    $('#dnaentered').empty();
    $('#dbnentered').empty();


    dnaSequenceEnteredByUser = $('#dnasequence').val().toUpperCase();
    dbnEnteredByUser = $('#dbninput').val();
    adenineColor = $('input[name=adenine]:checked', '#dnaform').val();
    thymineColor = $('input[name=thymine]:checked', '#dnaform').val();
    cytosineColor = $('input[name=cytosine]:checked', '#dnaform').val();
    guanineColor = $('input[name=guanine]:checked', '#dnaform').val();

    if(dnaSequenceEnteredByUser.length !== dbnEnteredByUser.length){
      window.alert('The DNA sequence (length: ' + dnaSequenceEnteredByUser.length +') and DBN sequence (length: ' + dbnEnteredByUser.length + ') must have the same length.');
      return;
    }

    if(dnaSequenceEnteredByUser.length === 0){
      window.alert('You must enter a DNA sequence and a DBN sequence.');
      return;
    }

    for(var i = 0; i < dnaSequenceEnteredByUser.length; i++){
      $('#dnaentered').append('<span id="dnaletter' + i + '">' + dnaSequenceEnteredByUser[i] + '</span>');
      $('#dbnentered').append('<span id="dbncharacter' + i + '">' + dbnEnteredByUser[i] + '</span>');
    }

    var forceLayoutData = {
      nodes: dnaSequenceStringToArray(dnaSequenceEnteredByUser, adenineColor, thymineColor, cytosineColor, guanineColor),
      links: makeLinksForPhosphateBackbone(dbnEnteredByUser).concat(findPairedBasesInDBA(dbnEnteredByUser))
    };

    drawDNA(forceLayoutData);
  });
});

// var sampleData = {
//   dna: 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT',
//   dbn: '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............'
// };
