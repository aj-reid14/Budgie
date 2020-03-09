const jwt = require('jsonwebtoken');
const fs = require('fs');
const signedjwt = require("./token1.js")
let PRIV_KEY = "./default.json"



// console.log(signedjwt)

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

  // if (err == 'TokenExpiredError') {
  //   console.log('Whoops, your token has expired!');
  // }
  
  // if (err == 'JsonWebTokenError') {
  //   console.log('That JWT is malformed!');
  // }
  
  // if (err === null) {
  // console.log('Your JWT was successfully validated!');
  // }

  // Both should be the same
  // console.log(signedjwt);
  // console.log(payload);
});