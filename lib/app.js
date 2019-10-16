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
const twitReq = require('./routes/twitter-requests');
const popHashtags = require('./routes/twitter-requests');
app.use('/api/auth', auth);
app.use('/api/responses', responses);
app.use('/api/twitreq', twitReq);
app.use('/api/twitreq/popHashtags', popHashtags);


const api404 = require('./middleware/api-404');
app.use('/api', api404);

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;