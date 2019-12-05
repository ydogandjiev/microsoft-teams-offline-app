var express = require('express');
var serveStatic = require('serve-static');

var app = express();
app.use(serveStatic(__dirname + '/build'));

app.get("*", (req, res) => {
  res.sendFile("build/index.html", { root: __dirname });
});

var port = process.env.port || 3000;
app.listen(port, function () {
  console.log('Listening on http://localhost:' + port);
});