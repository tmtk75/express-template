#!/usr/bin/env node
express = require("express");
jade = require("jade");
assets = require("connect-assets");
bodyParser = require('body-parser');
methodOverride = require('method-override');
logger = require("morgan");
cookieParser = require("cookie-parser");
cookieSession = require("cookie-session");
serveFavicon = require("serve-favicon");
path = require("path");
http = require("http");

var app, listen;
app = express();
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(cookieSession({ keys: ['adf19dfe1a4bbdd949326870e3997d799b758b9b'] }));
app.use(logger('dev'));
app.use(require("./locals"));
app.use(assets());
app.use('/public', express["static"](path.join(__dirname, "public")));
app.use(require("./text"));

easy.jade.filters.some = function(block, args) {
  return "" + block + ", " + args.type;
};

easy.app.get("/", function(req, res) {
  req.session.username = "John Doe";
  return res.render("index");
});

http.createServer(app).listen(app.get("port"), function() {
    console.log("my-app listening at " + app.get("port"));
});

