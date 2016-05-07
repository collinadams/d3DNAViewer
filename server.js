var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = 4568;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

var mockDatabase = {};

var generateRandomSuffix = function(){
  var randomSuffix = '';
  for(var i = 0; i < 7; i++){
    randomSuffix += Math.floor(Math.random() * 10);
  }
  return randomSuffix;
};

app.post('/getUniqueUrl', function(req, res){
  var userSubmittedDNAMolecule = req.body.graphdata;
  var randomSuffix = generateRandomSuffix();
  while(mockDatabase[randomSuffix]){
    randomSuffix = generateRandomSuffix();
  }
  mockDatabase[randomSuffix] = userSubmittedDNAMolecule;
  res.send({uniqueSuffix: randomSuffix});
});

app.post('/graphdata', function(req, res){
  var uniqueSuffix = req.body.uniqueid;
  var persistentGraphData = mockDatabase[uniqueSuffix];
  if(persistentGraphData){
    res.json({persistentGraphData: persistentGraphData});
  }else{
    res.status(404).send('The graph data you requested is not in the database');
  }
});

app.get('/*', function(req, res){
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(port, function(){
  console.log('Now listening on port: ' + port);
});