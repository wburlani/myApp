﻿//Server configuration
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const https = require('https');
const fs = require('fs');
const moment = require('moment');
const handlebars = require('express-handlebars')
const logger = require('./src/utils/logger');
const serverOptions = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};


const cors = require('cors')

const dnsHostName = 'wburlani';
const hostname = '192.168.1.97'
const listenPort = 6500;

//Certificate not validated
var production = https.createServer(serverOptions, app);
var development = https.createServer(serverOptions, app);

var io = require('socket.io')(production, development);
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
app.get('/', function (req, res) {
		res.end('Hello World!');
});

//Others routes
const router = require('./src/router.js');
app.use(router);

io.on('connection', (socket) => {
	console.log(`Socket conectado. ID: ${socket.id}`);
});

dns.lookup(dnsHostName, (err, address, family) => {
	console.log('address: 192.168.1.97 family: IPv4', address, family, dnsHostName);
});

development.listen(listenPort, hostname, function () {
	logger.info('Server available on port: ' + listenPort + ".");
});