// import middleware
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { response } = require('express');

// using express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//
const http = require('http').createServer(app);
http.listen(8080, ()=>{
    console.log('listening on 8080');
})

// DB 설정
let db;
let mydbURL = "mongodb+srv://paperwareceo:HXD0aEjXiFOxlHYJ@cluster0.nzwqn.mongodb.net/node-react?retryWrites=true&w=majority";
MongoClient.connect(mydbURL, /*{unifiedTopology:true},*/ (error, client)=>{
    if(error){
        return console.log(error);
    }
    db = client.db('node-react');
    console.log("Connected");
})

// static file 경로 설정
app.use(express.static(path.join(__dirname, '../client/build')));

// 
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.get('/wow', (req, res)=>{
    console.log("lalala");
    db.collection('post').find().toArray((error, result)=>{
        console.log(result);
        response.send(result);
    })
    console.log(data);

    console.log("wwww");
    res.send("Found")
})
app.post('/wow', (req, res)=>{
    //console.log(res.body);
    //es.send(req.data)
    console.log("hahaha");
    console.log(req.body);
    db.collection("post").insertOne({
        todo: req.body.todo,
        due: req.body.due
    }, (err, res)=>{
        console.log("Saved");
    })
    res.send("Posted")
    // console.log(res.config.data);
})