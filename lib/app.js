const express = require('express');
const app = express();

require('./models/register-plugins');

const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);

app.get('/hello', (req, res) => res.send('world'));

const auth = require('./routes/auth');
const responses = require('./routes/responses');
app.use('/api/auth', auth);
app.use('/api/responses', responses);

const api404 = require('./middleware/api-404');
app.use('/api', api404);

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;