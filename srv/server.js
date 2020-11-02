var express = require('express');
var app = express();
var server = require('http').Server(app);
 
app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/index.html');
  res.send("Weclome!");
});

app.use(express.static(__dirname + '/pub'));
 

 
server.listen(8080, () => {
  console.log(`Listening on ${server.address().port}`);
});