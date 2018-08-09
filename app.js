const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const request = require('request');

/*
const crypto = require('crypto');
const iso8601 = require('iso8601');

const user = 'cafe_royal002';
const secret = 'J4jc6Vrp8BCFrYvCIrWx';

function getWsseHeader(user, secret) {
    let nonce = crypto.randomBytes(16).toString('hex');
    let timestamp = iso8601.fromDate(new Date());

    let digest = base64Sha1(nonce + timestamp + secret);

    return `UsernameToken Username="${user}", PasswordDigest="${digest}", Nonce="${nonce}", Created="${timestamp}"`
}

function base64Sha1(str) {
    let hexDigest = crypto.createHash('sha1')
        .update(str)
        .digest('hex');

    return new Buffer.from(hexDigest).toString('base64');
}

const asyncAPI = (endpoint) => {
    return new Promise((resolve, reject) => {

        request({
            url: 'http://api.emarsys.net/api/v2/' + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'X-WSSE': getWsseHeader(user, secret)
            }
        }, (err, response, body) => {
            if (err) {
                console.error(err);
                reject(JSON.parse(body))
            } else {
                resolve(JSON.parse(body));
            }
        });


    })
}

asyncAPI('field/translate/en/').then((response) => {
        // console.log('API call success', response.data);

        //let field = response.data[0].id;
        let field = '20';
        console.log(`field/${field}/choice/translate/en`);
        return asyncAPI(`field/${field}/choice/translate/en`);
    }
).then((response) => {
    console.log('Second call', response.data);

}).catch((error) => {
    console.log(error);
});

*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

