const express = require('express');
const cors = require('cors');
const app = express();

const { sequelize, connectionTest } = require('../db/db');

const urls = require('./urls.js');

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5000', 'http://localhost:3000', 'http://localhost:4173'] }));
app.use('/api', urls);

app.get('/', (req, res) => {
    res.send('test test');
});

app.listen(3000, async () => {
    try {
        await sequelize.sync();
        await connectionTest();
        console.log('listening on port 3000');
    } catch (err) {
        console.error('Startup failed! Error:', err);
        process.exit(1);
    }
});

module.exports = app;
