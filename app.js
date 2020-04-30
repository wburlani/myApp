//Server configuration
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const https = require('https');
const fs = require('fs');
const moment = require('moment');
//var moment = require('moment-timezone');
const handlebars = require('express-handlebars')
const logger = require('./src/utils/logger');


//moment().tz("America/Sao_Paulo")

//Certificate not validated
var production = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app);


var development = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app);

var io = require('socket.io')(production, development);
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars({
    defaultLayout: 'main', 
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}));
app.set('view engine', 'handlebars')

  //Default router
  app.use(express.static('public'));
  app.get('/', function(req, res){
    res.send('Hello World!');
   });


    //Others routes
    const router = require('./src/router.js');
    app.use(router);

io.on('connection', (socket) => {
    console.log(`Socket conectado. ID: ${socket.id}`);
});

dns.lookup('localhost', (err, address, family) => {
  console.log('address: localhost family: IPv4', address, family);
});

/**
production.listen(3000, function () {
  //console.log('Server available on port: 3000.');
  logger.info('Server available on port: 3000.');
});
**/

development.listen(6500, function () {
  //console.log('Server available on port: 4000.');
  logger.info('Server available on port: 6500.');
});





