const express = require("express");
const PostRouter = require('./routers');
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/routers', PostRouter);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex Daily Project</h3>');
});

module.exports = server;
