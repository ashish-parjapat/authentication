//jshint esversion:6

const express = require('express')
const bodyParser = require("body-parser")

const ejs = require("ejs");
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000
var encrypt = require('mongoose-encryption');

require("./conneect")

app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})
const secret = "thisisourlittlesecret";
userSchema.plugin(encrypt, {
    secret: secret,
    encryptedFields: ["password"]
})
const Users = new mongoose.model("user", userSchema);

app.get("/", function(req, res) {
    res.render("home")
});

app.get("/login", function(req, res) {
    res.render("login")
});
app.get("/register", function(req, res) {
    res.render("register")
});
//getting p\assword and email id from user for regiseter \page
app.post("/register", function(req, res) {
    const newUser = new Users({
        email: req.body.username,
        password: req.body.password
    })
    newUser.save(function(error) {
        if (error) {
            console.log(error);
        } else {
            res.render("secrets")
        }
    })

});
//checking in the database if correct user id enterimg lthesercert page
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    Users.findOne({ email: username }, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                } else {
                    console.log("wrong password")
                }
            }
        }
    })
})


app.listen(3000, function(req, res) {
    console.log("server started at port 3000")
});