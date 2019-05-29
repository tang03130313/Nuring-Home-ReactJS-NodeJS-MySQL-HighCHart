const express = require("express")
const router = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
var mysql = require('mysql');

var dbconfig = require('../database/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
router.use(cors())

process.env.SECRET_KEY = 'secret'

var id = '67af0b6ee92a46b5a987c2e639f01720',time = '2019-04-29 00:00:00';

router.get('/test', (req, res) => {
   connection.query("select userid,updatetime,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,CaloriesOut from templateActive where userid = ? and LightlyActiveMinutes > 0 order by updatetime desc limit 2;"
    , [id], function(err,  rows){
    if(err)
        res.send('error: ' + err)
    if(rows && rows.length){
        console.log(rows);
        res.send(rows);
        //return(next);
    }
    else{
        res.status(400).json({ error: 'No data' })
    }
   });
})

module.exports = router
//select updatetime,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,CaloriesOut from templateActive where userid = '67af0b6ee92a46b5a987c2e639f01720' and updatetime < '2019-04-29 00:00:00' order by updatetime desc limit 1;
//select StagesDeep,StagesLight,StagesRem,StagesWake from templateSleep where UserID = ? order by UpdateTime desc limit 2;
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