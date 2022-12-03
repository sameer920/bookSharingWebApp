const express = require("express");
const session = require("express-session");
const passport = require("passport");


//setting up express:
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "bh3VfYC#JnQFPQ3k*atBW7#dXA@%a6mSFb5!w%YB",
    resave: false,  //resaves a session even if no changes were made
    saveUninitialized: false //saves a cookie when it is new but unmodified. false is good for gdpr compliance and logins.
}));

//setting up passport
app.use(passport.initialize());
app.use(passport.session());



