//jshint esversion:6

const express = require('express')
const bodyParser = require("body-parser")

const ejs = require("ejs");
const { default: mongoose } = require('mongoose');
const session = require('express-session')
const password = require("passport")
const passwordLocalMongoose = require("passport-local-mongoose");
const passport = require('passport');
const app = express();
const port = 3000
    // var encrypt = require('mongoose-encryption');



app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

}))
app.use(password.initialize())
app.use(password.session)

require("./conneect")
const userSchema = new mongoose.Schema({
    email: String,

    password: String,
})
userSchema.plugin(passwordLocalMongoose)

const Users = new mongoose.model("user", userSchema);
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

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


});
//checking in the database if correct user id enterimg lthesercert page
app.post("/login", function(req, res) {

})


app.listen(3000, function(req, res) {
    console.log("server started at port 3000")
});