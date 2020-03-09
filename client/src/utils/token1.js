const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const fs = require('fs');
let payloadObj = "./models/user.js"
// let payloadObj = "../../../models/user.js"
// const User = mongoose.model('User', UserSchema);
let PRIV_KEY = "./default.json"


let  signedjwt = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});
console.log(payloadObj)
  

//function to validate user 
function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;
module.exports = signedjwt