//tell the page where to find things
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mongoose = require('mongoose');
//provides login info while ensuring the login info doesn't get passed on to other people who use this program.
var db_url = process.env.MONGO_URL;

mongoose.connect(db_url, {useMongoClient: true})
    .catch( (err) => {
    console.log(err);
});
mongoose.Promise = global.Promise;

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure flash messaging. Do this after cookieParser
app.use(session( {secret: 'top secret', resave : false, saveUninitialized: false  } ));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));


    app.use('/', index);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

//all code needs to be above this or it won't run.
module.exports = app;
