const db = require("../models");
const jwt = require('jsonwebtoken');
const fs = require('fs');
let config = require("./config");
let bcrypt = require("bcryptjs");


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
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    db.User.create(
      {username: req.body.username,
      password: hashedPassword},
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
    db.User.findOne(
      {username: req.body.username},
      function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    })
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
