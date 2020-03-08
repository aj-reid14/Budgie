const db = require("../models");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');


// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: function(req,res) {
    let payloadObj = req.body;
    let  signedjwt = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});
    console.log(payloadObj)
    console.log(signedjwt)
    // console.log("signed")
    // jwt function here
    // console.log(req.body)
    // check in database if user exists
    // res.json("user found")
  }
};
