var express = require('express');
var app = express();
var path = require('path');

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/templates', express.static(__dirname + '/templates'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);