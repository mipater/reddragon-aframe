const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/systems', express.static(__dirname + '/systems'));
app.use('/objects', express.static(__dirname + '/objects'));
app.use('/model', express.static(__dirname + '/model'));

var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(process.env.PORT || 8080);