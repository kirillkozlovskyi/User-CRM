const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const authRouter = require('./routes/auth');
const analyticsRoute = require('./routes/analytics');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const positionRoute = require('./routes/position');
const app = express();
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
    .then(() => { console.log('Connect to database')})
    .catch((e) => {console.error(`Connection Error: ${e}`)})
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')())

app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/position', positionRoute);

module.exports = app;