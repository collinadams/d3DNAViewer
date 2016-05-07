var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = 4568;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

var mockDatabaseKeyValueStore = {};

var generateRandomSuffix = function(){
  var randomSuffix = '';
  for(var i = 0; i < 7; i++){
    randomSuffix += Math.floor(Math.random() * 10);
  }
  return randomSuffix;
}

app.get('/', function(req, res){
  res.sendFile(path.resolve('client/index.html'));
});

app.post('/getUniqueUrl', function(req, res){
  var userSubmittedDNAMolecule = req.body.data;
  var randomSuffix = generateRandomSuffix();
  while(mockDatabaseKeyValueStore[randomSuffix]){
    randomSuffix = generateRandomSuffix();
  }
  mockDatabaseKeyValueStore[randomSuffix] = userSubmittedDNAMolecule;
  res.send({uniqueSuffix: randomSuffix});
});

app.get('/*', function(req, res){
  var uniqueSuffix = req.params[0];
  var persistedState = mockDatabaseKeyValueStore[uniqueSuffix];
  if(persistedState){
    res.json({persistedState: persistedState});
  }else{
    res.status(404).send('The URL you requested is not in the database');
  }
});

app.listen(port, function(){
  console.log('Now listening on port: ' + port);
});