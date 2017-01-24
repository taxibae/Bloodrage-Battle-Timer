var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* Api Versioning */
var version = {
    v001 : express.Router(),
    v002 : express.Router(),
};
// ver 0.0.1
version.v001.use('/informations', require('./routes/informations'));

// ver 0.0.1
version.v002.use('/informations', require('./routes/informations'));

// Set Api Version
app.use('/api/v0.0.1', version.v001);
app.use('/api/v0.0.2', version.v002);

// Default Api Version
app.use('/api', version.v002);

// HTML5 Route Setting
app.all('/*', function (req, res, next) {
    res.sendFile('index.html', {
        root: __dirname + "/public"
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

