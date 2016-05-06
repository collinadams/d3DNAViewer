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
  console.log(req.body.data);
  var userSubmittedDNAMolecule = req.body.data;
  var randomSuffix = generateRandomSuffix();
  while(mockDatabaseKeyValueStore[randomSuffix]){
    randomSuffix = generateRandomSuffix();
  }
  mockDatabaseKeyValueStore[randomSuffix] = userSubmittedDNAMolecule;
  res.send({uniqueSuffix: randomSuffix});
});

app.listen(port, function(){
  console.log('this is dirname: ',__dirname);
  console.log('Now listening on port: ' + port);
});