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
      .catch(err => res.status(422).json(err));s
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: function(req,res) {
    // jwt function here
    let payloadObj = req.body;
    let  signedjwt = jwt.sign(payloadObj, PRIV_KEY, {algorithm: 'RS256'});
    // console.log(payloadObj)
    // console.log(req.body)
    console.log(signedjwt)
    // check in database if user exists
    res.json("user found")
    // db.User
    // .create(req.body)
    // .then(dbModel => res.json(dbModel))
    // .catch(err => res.status(422).json(err));
  },
  login: function(req,res) {
    // jwt function here
    let payloadObj = req.body;
    let  signedjwt = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});
    // console.log(payloadObj)
    console.log(signedjwt)
    // console.log(req.body)
    // check in database if user exists
    res.json("user found")
  },
  verify: function(req,res) {

    let signedjwt = req.body;

    jwt.verify(signedjwt, PUB_KEY, { algorithms: ['RS256'] }, (err, payload) => {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            console.log('Whoops, your token has expired!');
            break;
          case 'JsonWebTokenError':
            console.log('That JWT is malformed!');
            break;    
          default:
            console.log(err.name);
            break;
        }
      } else {
        console.log('Your JWT was successfully validated!');
      }
      // Both should be the same
      // console.log(signedjwt);
      // console.log(payload);
    });
  }
};
