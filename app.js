const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const moment = require('moment')
const cors = require('cors');

const dns = require('dns');
const https = require('https');
const fs = require('fs');


//Models Import
const Usuario = require("./models/Usuario");
const Pagamento = require("./models/Pagamento");
const Categoria = require("./models/Categoria");
const Subgrupo = require("./models/Subgrupo");
const Item = require("./models/Item");

//Certificado não valido
var server = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app);

var io = require('socket.io')(server);

//Blocking websites

app.use((req, res, next)=>{
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
app.use(cors());
next();
});

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}));
app.set('view engine', 'handlebars')    

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routers
app.get('/', function (err, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.use(express.static('public'));

app.get('/Categoria', function(req, res){
    Categoria.findAll().then(function(categorias){
        res.render('Categoria', {categorias: categorias});
    });    
});

app.get('/cad-categoria', function(req, res){
    res.render('cad-categoria');
});

app.post('/add-categoria', function(req, res){
    Categoria.create({
        descricaoCategoria: req.body.descricaoCategoria,
    }).then(function() {
         res.redirect('/categoria')
    }).catch(function(erro) {
        res.send("Houve um erro" + erro)
    });
});

    app.get('/del-categoria/:idCategoria', function(req, res){
    Categoria.destroy({
        where: {'idCategoria': req.params.idCategoria}
    }).then(function(){
        res.redirect('/categoria');
    }).catch(function(erro){
        res.send("Código não deletado, há um relacionamento com este registro!");
    });
});

//Subgrupos
app.get('/Subgrupo', function(req, res){
    Subgrupo.findAll().then(function(subgrupos){
        res.render('Subgrupo', {subgrupos: subgrupos});
    });
    
});

app.get('/cad-subgrupo', function(req, res){
    res.render('cad-subgrupo');
});

app.post('/add-subgrupo', function(req, res){
    Subgrupo.create({
        descricaoSubgrupo: req.body.descricaoSubgrupo,
        fkCategoria: req.body.fkCategoria,         

    }).then(function() {
         res.redirect('/subgrupo')
    }).catch(function(erro) {
        res.send("Houve um erro" + erro)
    });
});

//Produtos
app.get('/Item', function(req, res){
    Item.findAll().then(function(items){
        res.render('Item', {items: items});
    });    
});

app.get('/cad-item', function(req, res){
    res.render('cad-item');
});

app.post('/add-item', function(req, res){
    Item.create({
        descricaoItem: req.body.descricaoItem,
        descricaocodEanItem: req.body.codEanItem,
        fkSubgrupo: req.body.fkSubgrupo,         

    }).then(function() {
         res.redirect('/item')
    }).catch(function(erro) {
        res.send("Houve um erro" + erro)
    });
});

    app.get('/del-item/:idItem', function(req, res){
    Item.destroy({
        where: {'idItem': req.params.idItem}
    }).then(function(){
        res.redirect('/item');
    }).catch(function(erro){
        res.send("Código não deletado, há um relacionamento com este registro!");
    });
})

io.on('connection', (socket) => {
    console.log(`Socket conectado. ID: ${socket.id}`);
});

dns.lookup('wburlani', (err, address, family) => {
  console.log('address: 192.168.1.40 family: IPv4', address, family);
});


server.listen(8081, function () {
  console.log('Server Function url http://localhost:8081')
});