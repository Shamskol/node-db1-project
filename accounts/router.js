const express = require('express');

//databasse access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get("/", (req, res) => {
    // get a list of posts from the database
    // select * from posts;
    db.select("*")
      .from("accounts")
      .then(accounts => {
        res.status(200).json({ data: accounts });
      })
      .catch(error => {
        // save it to a log somewhere
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });

  router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first() // pick the first record from the array
      .then(account => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(404).json({ message: "No accounts by that ID" });
        }
      })
      .catch(error => {
        // save it to a log somewhere
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });
  router.post("/", (req, res) => {
    const account = req.body;
  
    // an account must have name and budget
    if (isValidAccount(account)) {
      // once you know the account is valid then try to save to the db
      db("accounts")
        // there will be a warning in the console about .returnnin(), ignore it for SQLite
        .insert(account, "id")
        .then(ids => {
          res.status(201).json({ data: ids });
        })
        .catch(error => {
          // save the error to a log somewhere
          console.log(error);
          res.status(500).json({ message: error.messsage });
        });
    } else {
      res
        .status(400)
        .json({ message: "please provide name and budget for the account" });
    }
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    // validate the data
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        // the count is the number of records updated
        // if the count is 0, it means, the record was not found
        if (count > 0) {
          res.status(200).json({ data: count });
        } else {
          res.status(404).json({ message: "record not found by that Id" });
        }
      })
      .catch(error => {
        // save the error to a log somewhere
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  }); 

  router.delete("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .del()
      .then(count => {
        // the count is the number of records updated
        // if the count is 0, it means, the record was not found
        if (count > 0) {
          res.status(200).json({ data: count });
        } else {
          res.status(404).json({ message: "record not found by that Id" });
        }
      })
      .catch(error => {
        // save the error to a log somewhere
        console.log(error);
        res.status(500).json({ message: error.messsage });
      });
  });
  
function isValidAccount(account) {
  return Boolean(account.name && account.budget);
}




  
  module.exports = router;
