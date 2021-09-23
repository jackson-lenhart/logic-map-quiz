'use strict';

const express = require('express');

const app = express();

app.use(express.static('c:/projects/logic-map-quiz/public'));

app.get('/', function(req, res) {
  res.sendFile('c:/projects/logic-map-quiz/public/index.html');
});

app.listen(8080, function() {
  console.log('Listening on port 8080...');
});
