const jwt = require('jsonwebtoken');
const fs = require('fs');
let payloadObj = "../../../models/user.js"
let PRIV_KEY = "./default.json"

let  signedjwt = jwt.sign(payloadObj, PRIV_KEY, { algorithm: 'RS256'});
  