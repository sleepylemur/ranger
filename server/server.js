var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyparser.json());

require('./routes.js')(app);

if (require.main == module) {
  app.listen(3000, function() {
    console.log("started ranger on port 3000");
  });
} else {
  module.exports = app;
}
