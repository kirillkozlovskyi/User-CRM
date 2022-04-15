const express = require('express');
const authRouter = require('./routes/auth');
const analyticsRoute = require('./routes/analytics');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const positionRoute = require('./routes/position');

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/position', positionRoute);

module.exports = app;