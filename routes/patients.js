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
            //console.log("distinct");
            //return next();
            res.redirect("blood");
        }

    });
})

router.get('/blood', (req, res, next) => {
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        //console.log(userid);
        query = "select * from hand_data where userid = ? order by updatetime desc limit 1";
        connection.query(query,[userid], function(err,  rows){
            if(err)
                res.send('error: ' + err);
            if(rows && rows.length > 0){
                //console.log(rows[0]);
                var date = (Date.parse(rows[0].updatetime) ).valueOf();
                var rows_updatetime = rows[0].updatetime;
                var rows_blood_suger = rows[0].blood_suger;
                var rows_blood_pressure = rows[0].blood_pressure;
                var rows_temperature = rows[0].temperature;
                var rows_userid = rows[0].userid;
                //console.log("65 "+rows_userid,rows_updatetime,rows_blood_suger,rows_blood_pressure,rows_temperature);
                connection.query("select blood_suger_time,blood_pressure_time,temperature_time from realtime_data where userid = ? limit 1",[rows_userid], function(err,  rows){
                    if(err)
                        res.send('error: ' + err);
                    if(rows && rows.length > 0){
                       if(date > (Date.parse(rows[0].blood_suger_time) ).valueOf() || date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() || date > (Date.parse(rows[0].temperature_time) ).valueOf()){
                            rows[0].blood_suger_time = date > (Date.parse(rows[0].blood_suger_time) ).valueOf() ? rows_updatetime : rows[0].blood_suger_time;
                            rows[0].blood_pressure_time = date > (Date.parse(rows[0].blood_pressure_time) ).valueOf() ? rows_updatetime : rows[0].blood_pressure_time;
                            rows[0].temperature_time = date > (Date.parse(rows[0].temperature_time) ).valueOf() ? rows_updatetime : rows[0].temperature_time;   
                            var blood_suger = Number(rows_blood_suger) > 125 ? 3 : (Number(rows_blood_suger) > 100 ? 2 : 1);
                            var NewArray = new Array();
　                              NewArray = rows_blood_pressure.split('/');
                            var blood_pressure = NewArray[0] > 139 && NewArray[1] > 89 ? 3 : (NewArray[0] > 120 && NewArray[1] > 80 ? 2 : 1);
                            var temperature = Math.floor(rows_temperature) > 37.5 ? 3 : (Math.floor(rows_temperature) > 37 ? 2 : 1);
                            //console.log(rows[0].blood_suger_time +" "+blood_suger+" "+rows[0].blood_pressure_time+" "+blood_pressure+" "+rows[0].temperature_time+" "+temperature+" "+userid);
                            var insertQuery = "update realtime_data set blood_suger_time = ? , blood_suger = ? , blood_pressure_time = ? , blood_pressure = ? , temperature_time = ? , temperature = ? where userid = ?";
                            connection.query(insertQuery, [rows[0].blood_suger_time, blood_suger, rows[0].blood_pressure_time, blood_pressure,rows[0].temperature_time,temperature, rows_userid],
                              function(err, rows){
                                   if(err) res.send('error: ' + err);
                                   //res.json({ status: userid + ' blood update' })
                            });
                       }
                       
                    }
                });                
            }
        });
    }
    res.redirect("activate");
})

router.get('/activate', (req, res, next) => {
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        //console.log(userid);
        connection.query("select userid,max(updatetime) max_time,date(updatetime) test_date,sum(LightlyActiveMinutes) sum_1,sum(FairlyActiveMinutes) sum_2,sum(VeryActiveMinutes) sum_3 from templateActive where userid = ? and LightlyActiveMinutes > 0 and rowkey in (Select min(rowkey) FROM templateActive group by updatetime) group by test_date order by test_date desc limit 2",[userid], function(err,  rows){
            if(err)
                res.send('error: ' + err);
            if(rows && rows.length > 0){
                //var d = new Date(rows[0].max_time);
                var date = (Date.parse( new Date(rows[0].max_time) )).valueOf();
                var rows_updatetime = new Date(rows[0].max_time);
                var rows_userid = rows[0].userid;
                var total_min = Number(rows[0].sum_1)+Number(rows[0].sum_2)+Number(rows[0].sum_3)-Number(rows[1].sum_1)-Number(rows[1].sum_2)-Number(rows[1].sum_3);
                //console.log(rows_userid);
                connection.query("select activate_time from realtime_data where userid = ? limit 1",[rows_userid], function(err,  rows){
                    if(err)
                        res.send('error: ' + err)
                    if(rows && rows.length > 0){
                        if(date > (Date.parse(rows[0].activate_time) ).valueOf()){
                            rows[0].activate_time = date > (Date.parse(rows[0].activate_time) ).valueOf() ? rows_updatetime : rows[0].activate_time;
                            var activate = total_min < -60 ? 3 : (total_min < -30 ? 2 : 1);
                            //var d = new Date(rows[0].activate_time);
                            //console.log(rows[0].activate_time+" "+activate+" "+total_min+" "+rows_userid);
                            var insertQuery = "update realtime_data set activate_time = ? , activate = ? , activate_value = ? where userid = ?";
                            connection.query(insertQuery, [rows[0].activate_time, activate, total_min, rows_userid],
                              function(err, rows){
                                   if(err) res.send('error: ' + err);
                                   //res.json({ status: userid + ' activate update' })
                            });
                        }
                    }
                });
            }
        });
    }
    //res.send(user);
    res.redirect("sleep");
})

router.get('/sleep', (req, res, next) => {
    for(i = 0; i < user.length;i++){
        userid = user[i].userid;
        //console.log("sleep");
        connection.query("select userid,updatetime,StagesDeep,StagesLight,StagesRem,StagesWake from templateSleep where userid = ? order by updatetime desc limit 2",[userid], function(err,  rows){
            if(err)
                res.send('error: ' + err);
            if(rows && rows.length > 0){
                var date = (Date.parse( new Date(rows[0].updatetime) )).valueOf();
                var rows_updatetime = new Date(rows[0].updatetime);
                var rows_userid = rows[0].userid;
                var total_min = Number(rows[0].StagesDeep)+Number(rows[0].StagesLight)+Number(rows[0].StagesRem)+Number(rows[0].StagesWake)-Number(rows[1].StagesDeep)-Number(rows[1].StagesLight)-Number(rows[1].StagesRem)-Number(rows[1].StagesWake);
                connection.query("select sleep_time from realtime_data where userid = ? limit 1",[rows_userid], function(err,  rows){
                    if(err)
                        res.send('error: ' + err)
                    if(rows && rows.length > 0){
                        if(date > (Date.parse(rows[0].sleep_time) ).valueOf()){
                            rows[0].sleep_time = date > (Date.parse(rows[0].sleep_time) ).valueOf() ? rows_updatetime : rows[0].sleep_time;
                            var sleep = total_min > 120 || total_min < -120 ? 3 : (total_min > 60 || total_min < -60 ? 2 : 1);
                            var insertQuery = "update realtime_data set sleep_time = ? , sleep = ? , sleep_value = ? where userid = ?";
                            //console.log(rows[0].sleep_time+"/"+sleep+"/"+total_min+"/"+userid);
                            connection.query(insertQuery, [rows[0].sleep_time, sleep, total_min, rows_userid],
                              function(err, rows){
                                   if(err)res.send('error: ' + err);
                                   //res.json({ status: userid + ' sleep update' })
                            });
                       }
                    }
                });
            }
        });
    }
    res.redirect("main");
    //res.send(user);
})

router.get('/main', (req, res, next) => {
    connection.query("select userid,name,blood_suger,blood_pressure,temperature,activate,activate_value,sleep,sleep_value,imagepath from realtime_data order by blood_suger desc,blood_pressure desc,temperature desc,activate desc,sleep desc,userid asc limit 10", function(err,  rows){
        if(err)
            res.send('error: ' + err)
        if(rows && rows.length > 0){
            console.log(rows);
            res.send(rows); 
        }
        else{
            res.status(400).json({ error: 'No data' })
        }
       
   });
})

module.exports = router
//select userid,updatetime,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,CaloriesOut from templateActive where userid = '67af0b6ee92a46b5a987c2e639f01720' and updatetime < '2019-04-29 00:00:00' order by updatetime desc limit 1;
//select StagesDeep,StagesLight,StagesRem,StagesWake from templateSleep where UserID = ? order by UpdateTime desc limit 2;

