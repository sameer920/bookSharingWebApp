require("dotenv").config({ path: "./server/.env" }); // environment variables
const { Client } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
var cors = require("cors");

//setting up express:
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({extended: true}))

app.use(cors());

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
    else{
        console.log("Connected");
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
            if (result.row > 0) {
                user = result.rows[0];
                bcrypt.compare(password, user.password, (req, res) => {
                    if (res) {
                        //user authenticated
                        cb(null, { id: user.id, email: user.email, name: user.name, password: user.password, contact: user.contact })
                    }
                    else {
                        //incorrect password
                        cb(null, false);
                    }
                })
            }
            else {
                //user not found in the database
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

app.listen(4000, () => {console.log("Listening on port 4000")})

//post requests:
app.post('/login', passport.authenticate("local"), function(req,res){
    
})

function checkIfUniqueId(userId){
    client.query(`Select id from users where id=$1`, [userId], (err, res) =>{
        if (err){
            console.log(err)
        }
        else{
            if (res.rowCount == 0){
                return true;
            }
            else{
                return false;
            }
        }
    })
}

app.post('/Register', async function(req, res){
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let contact = req.body.contact;

    //hash password
    let hashedPassword = await bcrypt.hash(password,10);

    client.query(`SELECT email FROM users where email=$1`, [email], (err, result)=>{
        if (err){
            console.log(err);
        }
        else if(result.rowCount ==  0){
            if (password == confirmPassword){
                let userId = name+Math.floor(Math.random() * 10000).toString();
                while (checkIfUniqueId(userId) == false){
                    userId = name+(Math.floor(Math.random() * 10000)).toString();
                }
                client.query(`INSERT INTO users(id, name, email, password, contact) VALUES($1, $2, $3, $4, $5)`,
                [userId, name, email, hashedPassword, contact], (err, result) =>{
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log({result:"true"});
                        res.json({result:"true"});
                    }
                })
            }
            else{
                console.log("password not match")
                res.json({
                    result: "passwords dont match"
                });
            }
        }
        else{
            console.log("already exist")
            res.json({result:"User already exists. Please Login"});
        }
    })
})



client.on('error', (e) => {
    console.log(e);
})

