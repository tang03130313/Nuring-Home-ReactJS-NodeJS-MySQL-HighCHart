const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
var mysql = require('mysql');

var dbconfig = require('../database/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req,  res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

   connection.query("SELECT * FROM users WHERE username = ? ", [req.body.username], function(err, rows){
    if(err)
        res.send('error: ' + err)
    if(rows.length){
        res.json({ error: "User already exists" })
        //return next();
    }
    else{
        //userData.password = bcrypt.hash(req.body.password, 10,null);

        var insertQuery = "insert users (name, email, username, password) values (?, ?, ?, ?)";

        connection.query(insertQuery, [userData.name, userData.email, userData.username, userData.password],
          function(err, rows){
               res.json({ status: userData.username + ' registered' })
          });
        }
   });
})

users.post('/login', (req,  res) => {
   connection.query("SELECT * FROM users WHERE username = ? and password = ? ", [req.body.username, req.body.password], function(err, rows){
    if(err)
        res.send('error: ' + err)
    if(rows.length){
        //console.log(rows[0].dataValues);
        let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
            expiresIn: 1440
        })
        res.send(token)
        //return next();
    }
    else{
        res.status(400).json({ error: 'User does not exist' })
    }
   });
})

module.exports = users

   /* User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.username + ' registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })

     User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })

        */