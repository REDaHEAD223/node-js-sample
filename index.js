var express = require('express')
var app = express()

app.set('port', (var port = process.env.APP_PORT || 5000;
))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello from updated Node.js app in OpenShift!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
