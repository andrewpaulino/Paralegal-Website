const express = require('express');
const logger = require('morgan');
const expressValidator = require('express-validator');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash');
const Handlebars = require('express-handlebars')
const frontPage = require('./routes/frontPage');
const services = require('./routes/services');
// const frontPage = require('./routes/frontPage');
// const frontPage = require('./routes/frontPage');
// const frontPage = require('./routes/frontPage');
// Will add later depending on how many pages will exist
var app = express();

// app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
var hbs = Handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
  
      foo: function () { return 'FOO!'; },
      bar: function () { return 'BAR!'; }
    }
  });
app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', frontPage);
 app.use('/services', services);
// app.use('/dashboard', dashboard)
// app.use('/contactus', contactus)
// app.use('/products', products)
module.exports = app;