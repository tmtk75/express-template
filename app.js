#!/usr/bin/env node
var express        = require("express"),
    jade           = require("jade"),
    assets         = require("connect-assets"),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    logger         = require("morgan"),
    cookieParser   = require("cookie-parser"),
    cookieSession  = require("cookie-session"),
    path           = require("path"),
    http           = require("http");

var app = express();
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(cookieSession({ keys: ['adf19dfe1a4bbdd949326870e3997d799b758b9b'] }));
app.use(logger('dev'));
app.use( function(req, res, next) {
  res.locals.session = req.session;
  return next();
});
app.use(assets());
app.use('/public', express["static"](path.join(__dirname, "public")));
app.use(function(req, res, next) {
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      return req.text += chunk;
    });
    return req.on('end', next);
  } else {
    return next();
  }
});

jade.filters.some = function(block, args) {
  return "" + block + ", " + args.type;
};

app.get("/", function(req, res) {
  res.redirect('/index');
});

app.get("/:page([a-z0-9_-]+)", function(req, res) {
  req.session.username = "John Doe";
  req.session.query = req.query
  res.render("index");
});

http.createServer(app).listen(app.get("port"), function() {
    console.log("my-app listening at " + app.get("port"));
});

