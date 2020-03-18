let fs   = require('fs');
let jwt  = require('jsonwebtoken');

let header = { 
   typ : "JWT",
   alg : "HS256" 
   }

let payload = {
   iss: "joe",
   exp: 1300819380,
   "http://example.com/is_root": true
    }