const express = require("express");
const AccountsRouter = require('../accounts/router.js');

const server = express();


server.use(express.json());
server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex Daily Project</h3>');
});

module.exports = server;
