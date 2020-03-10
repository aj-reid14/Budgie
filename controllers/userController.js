const db = require("../models");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
let config = require("./config");


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
    // console.log(req.body)
    db.User
      .create({username: req.body.username,
          password: req.body.password},
          function (err, user) {
          if (err) {
            console.log(err)
            return res.status(500).send("Couldn't register User.")
          }
          let token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400
          });
          res.status(200).send({ auth: true, token: token });
        })
  },
  login: function(req,res) {

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
