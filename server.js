var express = require('express')
 , fs = require('fs')
 , bodyParser = require('body-parser')
 , port = process.env.PORT || 1546
 , jwt = require('jsonwebtoken')
 , _ = require('underscore')
 , config = require('./config.json')
 , app = express();

var cert = fs.readFileSync(config.cert)
 , certOptions = {algorithm: 'RS256', expiresInMinutes: 30}
 , certPayload = {user: 'tim', foo: 'bar'}
 , response = {};

if(!config) {
  console.error('Failed to load config')
  process.exit(1)
}

app.use(bodyParser());
app.use(function(req, res, next){
  	console.log('%s %s', req.method, req.url);
  	next();
});

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method && 'OPTIONS' == req.method) {
    	res.send(200);
    }
    next();
});

app.post('/',actionLogin);
app.post('/login',actionLogin);

function actionLogin(req, res) {
  certPayload = _.extend(certPayload, req.body);
	certOptions.audience = req.body.app;
	response.token = jwt.sign(certPayload, cert, certOptions);
	res.send(response);
}

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});