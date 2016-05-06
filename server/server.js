var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 4568;

app.get('/', function(req, res){
  res.send('Hello world!');
});

app.listen(port, function(){
  console.log('Now listening on port: ' + port);
});