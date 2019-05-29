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
var size_user = 0;
var user = new Array(); 
var query;

var id;// = '67af0b6ee92a46b5a987c2e639f01720',time = '2019-04-29 00:00:00';


router.post('/home', (req, res, next) => {
    connection.query("select * from patients where userid = ?",[req.body.userid], function(err , rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            id = req.body.userid;
            size_user = 0;
            user = new Array(); 
            console.log(id);
            user[size_user] = rows[0];
            size_user++;
            //console.log(user);
            //return next();
            res.redirect("realtime");
        }

    });
})

router.get('/realtime', (req, res, next) => {
    query = "select blood_suger,blood_pressure,temperature_time,temperature from realtime_data where userid = ?";
    connection.query(query,[id], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            user[size_user] = rows[0];  
            size_user++;
            //console.log(user);  
            res.redirect("activate");
        }
    });
    
    //res.redirect("activate");
})

router.get('/activate', (req, res, next) => {
    connection.query("select max(updatetime) max_time,date(updatetime) test_date,sum(LightlyActiveMinutes) sum_1,sum(FairlyActiveMinutes) sum_2,sum(VeryActiveMinutes) sum_3,sum(CaloriesOut) sum_4 from templateActive where userid = ? and LightlyActiveMinutes > 0 and rowkey in (Select min(rowkey) FROM templateActive group by updatetime) group by test_date order by test_date desc limit 1",[id], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            user[size_user] = rows[0];  
            size_user++;
            //console.log(user);  
            res.redirect("sleep");
        }
    });
    //res.send(user);
    
})

router.get('/sleep', (req, res, next) => {
    connection.query("select updatetime,StagesDeep,StagesLight,StagesRem,StagesWake from templateSleep where userid = ? and StagesDeep != 0 order by updatetime desc limit 1",[id], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            user[size_user] = rows[0];  
            size_user++;
            console.log(user);  
            
        }
        res.send(user);
    });
    
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

router.get('/activate', (req, res, next) => {
    connection.query("select userid,name,activate_value,imagepath from realtime_data order by activate_value desc limit 10",[id], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            user[size_user] = rows[0];  
            size_user++;
            //console.log(user);  
            res.redirect("sleep");
        }
    });
    //res.send(user);
    
})


router.post('/bloodsuger', (req, res, next) => {
    connection.query("select vuseruid, vtime,vPhysiologicaValueV2 ->'$.BloodSugar' bloodsuger,vPhysiologicaValueV2 ->'$.measureTime' measureTime from templateBloodXXX where vPhysiologicaValueV2 ->'$.BloodSugar' is not null and  vPhysiologicaValueV2 ->'$.BloodSugar' != 999 and vuseruid = ? order by vtime desc limit 1;",[req.body.userid], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            
            //console.log(user);  
            res.send(rows);
        }
    });
    //res.send(user);
    
})

router.post('/bloodpressure', (req, res, next) => {
    connection.query("select vuseruid, vtime,vPhysiologicaValueV2 ->'$.systolicBloodPressure' systolicBloodPressure ,vPhysiologicaValueV2 ->'$.diastolicBloodPressure' diastolicBloodPressure from templateBloodXXX where vuseruid = ? and vPhysiologicaValueV2 ->'$.systolicBloodPressure' is not null and vPhysiologicaValueV2 ->'$.diastolicBloodPressure' order by vtime desc limit 1",[req.body.userid], function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            
            //console.log(user);  
            res.send(rows);
        }
    });
    //res.send(user);
    
})

router.get('/rank', (req, res, next) => {
    connection.query("select name,imagepath,activate_value from realtime_data order by activate_value desc;", function(err,  rows){
        if(err)
            res.send('error: ' + err);
        if(rows && rows.length > 0){
            
            //console.log(user);  
            res.send(rows);
        }
    });
    //res.send(user);
    
})

module.exports = router
//select userid,updatetime,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,CaloriesOut from templateActive where userid = '67af0b6ee92a46b5a987c2e639f01720' and updatetime < '2019-04-29 00:00:00' order by updatetime desc limit 1;
//select StagesDeep,StagesLight,StagesRem,StagesWake from templateSleep where UserID = ? order by UpdateTime desc limit 2;

//select vuseruid, vtime,vPhysiologicaValueV2 ->'$.systolicBloodPressure' systolicBloodPressure ,vPhysiologicaValueV2 ->'$.diastolicBloodPressure' diastolicBloodPressure from templateBloodXXX where vPhysiologicaValueV2 ->'$.systolicBloodPressure' is not null and vPhysiologicaValueV2 ->'$.diastolicBloodPressure' order by vtime desc limit 3;