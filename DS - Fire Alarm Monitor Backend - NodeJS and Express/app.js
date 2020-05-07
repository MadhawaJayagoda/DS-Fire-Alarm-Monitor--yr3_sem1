const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var queries = require('./queries');
var cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


//Database connection to the MySQL database
var connection = mysql.createConnection({
    host : '127.0.0.1',
    database : 'fire_alarm',
    user : 'root',
    password : ''
});

connection.connect(function(err){
   if (err){
       console.error('Error connecting to the Database : ' + err.message);
       return;
   }

    console.log("Connected to the MySQL database successfully..! ");
});


//routes

//Get All the Sensor Data
app.get('/sensorData', async (req, res) => {
    const queryString = 'SELECT * FROM sensors';
    connection.query(queryString, function (err, rows) {
        if(err){
            console.log("Error : ", err);
            return;
        }
        res.send(rows);
    });
});

//Add sensor data to the Database
app.post('/sensorRecord', async(req, res) => {
    const floorNumber = req.body.floor_no;
    const roomNumber = req.body.room_no;
    const smokeLevel = req.body.smoke_level;
    const carbondioxideLevel = req.body.carbondioxide_level;
    const sensorStatus = req.body.sensor_status;
    const ownerName = req.body.owner_name;
    const email = req.body.email;
    const phoneNumber = req.body.phone_number;

    var alertStatus = '';

    if(sensorStatus !== 'OFFLINE'){
        //Generating the alert_status record based on the smoke level and the carbondioxide levels, if the sensorStatus is 'ACTIVE'
        if( smokeLevel > 5 || carbondioxideLevel > 5 ){
            alertStatus = 'RED';
        }else{
            alertStatus = 'GREEN';
        }
    }

    const queryString = "INSERT INTO fire_alarm.sensors (floor_no, room_no, smoke_level, carbondioxide_level, sensor_status, alert_status, owner_name, email, phone_number) " +
        "VALUES (" + floorNumber + ", " + roomNumber + ", " + smokeLevel + ", " + carbondioxideLevel + ", '" + sensorStatus +"', '" + alertStatus + "', '" + ownerName + "', '" + email + "', '" + phoneNumber + "');";
    connection.query( queryString, function (err, rows) {
        if(err){
            console.error("Error : " + err);
            res.send(err);
            return;
        }
        res.json(rows);
    });
});

//Update sensor record of the Database
app.put('/sensorRecord', async(req, res) => {
    const floorNumber = req.body.floor_no;
    const roomNumber = req.body.room_no;
    const smokeLevel = req.body.smoke_level;
    const carbondioxideLevel = req.body.carbondioxide_level;
    const sensorStatus = req.body.sensor_status;

    var alertStatus = '';

    if(sensorStatus !== 'OFFLINE'){
        //Generating the alert_status record based on the smoke level and the carbondioxide levels, if the sensorStatus is 'ACTIVE'
        if( smokeLevel > 5 || carbondioxideLevel > 5 ){
            alertStatus = 'RED';
        }else{
            alertStatus = 'GREEN';
        }
    }

    let queryString =  "UPDATE fire_alarm.sensors " +
    "SET smoke_level = " + smokeLevel + ", " +
        "carbondioxide_level = " + carbondioxideLevel + ", " +
        "sensor_status = '" + sensorStatus + "' , " +
        "alert_status = '" + alertStatus + "'  " +
    "WHERE floor_no = " + floorNumber + " AND room_no = " + roomNumber + ";";

    connection.query( queryString, function (err, rows) {
        if(err){
            console.error("Error : " + err);
            res.send(err);
            return;
        }
        res.json(rows);
    });
});

//Get records by the sensorId
app.get('/sensorData/:sensorId', async (req, res) => {
    const sensorId = req.params.sensorId;
    const  queryString = 'SELECT * FROM fire_alarm.sensors where sensor_id = ' + sensorId;
    connection.query(queryString, function(err, rows){
        if(err){
            console.log("Error : ", err);
            return;
        }
        res.send(rows);
    });
});

//Get Records using floor number and the room number ; last record inserted - the latest update of the alert_status
app.get('/sensorData/:floorNum/:roomNum', async (req, res) => {
    const floorNumber = req.params.floorNum;
    const roomNumber = req.params.roomNum;

    const queryString = 'SELECT room_no, smoke_level, carbondioxide_level, sensor_status, alert_status' + " "+
        'FROM fire_alarm.sensors' + " "+
        'WHERE floor_no = ' + floorNumber + ' AND room_no = ' + roomNumber + " "+
        'ORDER BY sensor_id DESC' + " "+
        'LIMIT 1;';
    connection.query(queryString, function(err, rows) {
        if(err){
            console.log("Error : ", err);
            res.send(err);
            return;
        }
        res.json(rows);
    });
});

app.post('/emailService/:floor/:room', async(req, res) => {
    const floorNumber = req.params.floor;
    const roomNumber = req.params.room;

    const queryString = "SELECT email FROM fire_alarm.sensors WHERE floor_no =" + floorNumber +  " AND room_no = " + roomNumber;

    connection.query(queryString, function (err, rows) {
        if(err){
            console.log("Error : ", err);
            res.send(err);
            return;
        }
        res.json(rows);
    });
});

app.listen(3000 , () => {
    console.log("Server up and running on the port 3000" );
});
