const express = require("express")
const router = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
var mysql = require('mysql');

var dbconfig = require('../database/database');
var connection = mysql.createConnection(dbconfig.connection,{ multipleStatements: true } );
connection.query('USE ' + dbconfig.database);
router.use(cors())

process.env.SECRET_KEY = 'secret'

var arrays = new Array();
var size_arrays = 0;
var user = new Array(); 
var query;
var userid;

router.get('/home', (req, res, next) => {
    connection.query("select distinct userid from patients", function(err , rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            user = rows;
            //res.send(userid);
            //res.redirect('blood');
            next();
            //console.log(userid);
        }

    });
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        console.log("blood");
        connection.query("select * from hand_data where userid = ? order by updatetime desc limit 1",[userid], function(err, next, rows){
            if(err)  res.send('error: ' + err)
            if(rows && rows.length > 0){
                var date = (Date.parse(rows[0].updatetime) ).valueOf();
                var rows_updatetime = rows[0].updatetime;
                var rows_blood_suger = rows[0].blood_suger;
                var rows_blood_pressure = rows[0].blood_pressure;
                var rows_temperature = rows[0].temperature;
                connection.query("select blood_suger_time,blood_pressure_time,temperature_time from realtime_data where userid = ? limit 1",[userid], function(err, next, rows){
                    if(date > (Date.parse(rows[0].blood_suger_time) ).valueOf() || date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() || date > (Date.parse(rows[0].temperature_time) ).valueOf()){
                        rows[0].blood_suger_time = date > (Date.parse(rows[0].blood_suger_time) ).valueOf() ? rows_updatetime : rows[0].blood_suger_time;
                        rows[0].blood_pressure_time = date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() ? rows_updatetime : rows[0].blood_pressure_time;
                        rows[0].temperature_time = date > (Date.parse(rows[0].temperature_time) ).valueOf() ? rows_updatetime : rows[0].temperature_time; 
                        var blood_suger = Number(rows_blood_suger) > 125 ? 3 : (Number(rows_blood_suger) > 100 ? 2 : 1);
                        var NewArray = new Array();
　                                  NewArray = rows_blood_pressure.split('/');
                        var blood_pressure = NewArray[0] > 139 && NewArray[1] > 89 ? 3 : (NewArray[0] > 120 && NewArray[1] > 80 ? 2 : 1);
                        var temperature = Math.floor(rows_temperature) > 37.5 ? 3 : (Math.floor(rows_temperature) > 37 ? 2 : 1);
                        //console.log(formatDate(rows[0].blood_suger_time )+" "+blood_suger+" "+rows[0].blood_pressure_time+" "+blood_pressure+" "+rows[0].temperature_time+" "+temperature+" "+userid);
                        var insertQuery = "update realtime_data set blood_suger_time = ? , blood_suger = ? , blood_pressure_time = ? , blood_pressure = ? , temperature_time = ? , temperature = ? where userid = ?";
                        connection.query(insertQuery, [rows[0].blood_suger_time, blood_suger, rows[0].blood_pressure_time, blood_pressure,rows[0].temperature_time,temperature, userid],
                          function(err, next, rows,){
                               if(err) res.send('error: ' + err);
                               //res.json({ status: userid + ' blood update' })
                               next();
                        });  

                    }
                    next();
                });
            }
            console.log("aaa");
            next();
        });
        console.log("activate");
        connection.query("select * from hand_data where userid = ? order by updatetime desc limit 1",[userid], function(err,  rows){
            if(err) res.send('error: ' + err)
            if(rows && rows.length > 0){
                console.log(rows);
               
            }
        });
    }
})

router.get('/blood', (req, res) => {
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        console.log("blood");
        connection.query("select * from hand_data where userid = ? order by updatetime desc limit 1",[userid], function(err,  rows){
            if(err)  res.send('error: ' + err)
            if(rows && rows.length > 0){
                var date = (Date.parse(rows[0].updatetime) ).valueOf();
                var rows_updatetime = rows[0].updatetime;
                var rows_blood_suger = rows[0].blood_suger;
                var rows_blood_pressure = rows[0].blood_pressure;
                var rows_temperature = rows[0].temperature;
                connection.query("select blood_suger_time,blood_pressure_time,temperature_time from realtime_data where userid = ? limit 1",[userid], function(err,  rows){
                    if(date > (Date.parse(rows[0].blood_suger_time) ).valueOf() || date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() || date > (Date.parse(rows[0].temperature_time) ).valueOf()){
                        rows[0].blood_suger_time = date > (Date.parse(rows[0].blood_suger_time) ).valueOf() ? rows_updatetime : rows[0].blood_suger_time;
                        rows[0].blood_pressure_time = date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() ? rows_updatetime : rows[0].blood_pressure_time;
                        rows[0].temperature_time = date > (Date.parse(rows[0].temperature_time) ).valueOf() ? rows_updatetime : rows[0].temperature_time; 
                        var blood_suger = Number(rows_blood_suger) > 125 ? 3 : (Number(rows_blood_suger) > 100 ? 2 : 1);
                        var NewArray = new Array();
　                                  NewArray = rows_blood_pressure.split('/');
                        var blood_pressure = NewArray[0] > 139 && NewArray[1] > 89 ? 3 : (NewArray[0] > 120 && NewArray[1] > 80 ? 2 : 1);
                        var temperature = Math.floor(rows_temperature) > 37.5 ? 3 : (Math.floor(rows_temperature) > 37 ? 2 : 1);
                        //console.log(formatDate(rows[0].blood_suger_time )+" "+blood_suger+" "+rows[0].blood_pressure_time+" "+blood_pressure+" "+rows[0].temperature_time+" "+temperature+" "+userid);
                        var insertQuery = "update realtime_data set blood_suger_time = ? , blood_suger = ? , blood_pressure_time = ? , blood_pressure = ? , temperature_time = ? , temperature = ? where userid = ?";
                        connection.query(insertQuery, [rows[0].blood_suger_time, blood_suger, rows[0].blood_pressure_time, blood_pressure,rows[0].temperature_time,temperature, userid],
                          function(err, rows){
                               if(err) res.send('error: ' + err);
                               //res.json({ status: userid + ' blood update' })
                        });  
                    }
                });
            }
            
        });
    }
})

router.get('/activate', (req,next, res) => {
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        console.log("activate");
        connection.query("select * from hand_data where userid = ? order by updatetime desc limit 1",[userid], function(err,  rows){
            if(err) res.send('error: ' + err)
            if(rows && rows.length > 0){
                next();
            }
        });
    }
})

module.exports = router
//select userid,updatetime,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,CaloriesOut from templateActive where userid = '67af0b6ee92a46b5a987c2e639f01720' and updatetime < '2019-04-29 00:00:00' order by updatetime desc limit 1;
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
