require("dotenv").config({ path: "./server/.env" }); // environment variables
const { Client } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const { ElevatorSharp } = require("@mui/icons-material");

//setting up express:
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_STRING,
    resave: false,  //resaves a session even if no changes were made
    saveUninitialized: false //saves a cookie when it is new but unmodified. false is good for gdpr compliance and logins.
}));

//Setting up database:

const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS.toString(),
    port: process.env.DB_PORT,
});

client.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
});


//setting up passport:

passport.use(new LocalStrategy((email, password, cb) => {
    //searching email in database:
    client.query(`SELECT email,password from users where email = $1`, [email], (err, result) => {
        if (err) {
            //some error occured while authenticating
            console.log(err);
            return cb(err);
        }
        else {
            if (result.rows.length > 0) {
                user = result.rows[0];
                bcrypt.compare(password, user.password, (req, res) => {
                    if (res) {
                        //user found in database
                        cb(null, { id: user.id, email: user.email, name: user.name, password: user.password, contact: user.contact })
                    }
                    else {
                        //user not found in database
                        cb(null, false);
                    }
                })
            }
            else {
                cb(null, false);
            }
        }
    })
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, cb) =>{
    client.query(`SELECT id, username FROM users WHERE id=$1` ,[id], (err, result) =>{
        if (err){
            console.log(err);
            cb(err);
        }
        else{
            cb(null, result.rows[0]);
        }
    } )
});

app.use(passport.initialize());
app.use(passport.session());

//post requests:
app.post('/login', passport.authenticate("local"), function(req,res){
    
})




client.on('error', (e) => {
    console.log(e);
})

