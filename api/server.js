const express = require("express");
const AccountsRouter = require('./router');
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex Daily Project</h3>');
});

module.exports = server;
