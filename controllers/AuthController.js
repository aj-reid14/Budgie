/*
Remember, authentication is the act of logging a user in. 
Authorization is the act of verifying the access rights of a user to interact with a resource.

Middleware functions are used as bridges between some pieces of code. 
When used in the function chain of an endpoint they can be incredibly useful in authorization and error handling.
*/
let express = require("express");
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let User = require('../user/User');
let VerifyToken = require("./VerifyToken");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let config = require("../config");


router.post("/register", function (req, res) {


    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },

        function (err, user) {
            if (err) return res.status(500).send("Couldn't register User.")

            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });
            res.status(200).send({ auth: true, token: token });


        });

});


router.get('/me', VerifyToken, function (req, res,next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id,
            { password: 0 }, // projection
            function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                res.status(200).send(user);
            });
    });
});



router.post('/login', function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });

});

router.get("/logout", function(req,res) {

res.status(200).send({ auth: false, token: null});

});



module.exports = router;