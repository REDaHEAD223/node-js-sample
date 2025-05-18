var express = require('express')
var app = express()

function stressCPU(durationMs) {
  const end = Date.now() + durationMs;
  while (Date.now() < end) {
    // Бесконечный цикл до конца duration
    Math.sqrt(Math.random());
  }
}

setInterval(() => {
  stressCPU(3000); // каждые 5 сек даёт 3 сек CPU-нагрузки
}, 5000);


var port = process.env.APP_PORT || 5000
app.set('port', port)

app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send(`Hello from ззode.js app in OpenShift!\nAPI_KEY: ${process.env.API_KEY}`)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
