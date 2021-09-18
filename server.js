'use strict';

const express = require('express');

const app = express();

app.get('/client.js', function(req, res) {
  res.sendFile('c:/projects/logic-map-quiz/client.js');
});

app.get('/', function(req, res) {
  res.sendFile('c:/projects/logic-map-quiz/index.html');
});

app.listen(8080, function() {
  console.log('Listening on port 8080...');
});
