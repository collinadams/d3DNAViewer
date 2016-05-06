var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = 4568;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));



app.get('/', function(req, res){
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(port, function(){
  console.log('this is dirname: ',__dirname);
  console.log('Now listening on port: ' + port);
});