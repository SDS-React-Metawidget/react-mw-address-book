var express = require('express');
var app = express();

app.use(express.static('views'));
app.get('/', function (req, res) {
	res.sendFile(__dirname + "/index.html");
	console.log(req.connection.remoteAddress);
})

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("on port: %s", port);
})
