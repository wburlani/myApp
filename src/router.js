const express = require('express');
const router = express.Router();
const logger = require('./utils/logger');
const User = require("./database/models/user");

	router.get('/home', function (req, res) {
		//res.sendFile(__dirname + "/views/users-register.html");
		res.render('home');
	});	
  	router.get('/users-listen', function(req, res){	
  		logger.info("Accessed page: users-listen");	
      //res.send('Listen Users');
          User.findAll().then(function(users){
        res.render('users-listen', {users: users});
    	});
	});  
  	router.get('/users-register', function(req, res){
  	 	logger.info("Accessed page: users-register");
  	 	//res.send('Listen Users');
         User.findAll().then(function(users){
        res.render('users-register', {users: users});
    	});
	});  
	router.get('/users-register', function (req, res) {
		//res.sendFile(__dirname + "/views/users-register.html");
		res.render('users-register');
	});	
	router.post('/users-post', function(req, res){
	    User.create({
	        name: req.body.name,
	        password: req.body.password,
	        email: req.body.email,
	    }).then(function() {
	    	//res.send('Usuário cadastrado');
	        res.redirect('/users-listen');
	        logger.info("Users successfully registered");
	    }).catch(function(erro) {
	        res.send("Houve um erro" + erro)
	    });
	});

module.exports = router;
