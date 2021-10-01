// import middleware
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { response } = require('express');
const cors = require('cors');

// using express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials : true,
}
app.use(cors(corsOptions));

app.use(morgan('dev'));

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

app.get('/list', (req, res)=>{
    // console.log(req);
    db.collection('post').find().toArray((error, result)=>{
        // console.log(result);
        res.send(result);
    })
    // console.log(data);

    console.log("wwww");
    // res.send("Found")
})

// /Write -> Post
app.post('/list', (req, res)=>{
    // Total Posts
    let numberofPosts;
    db.collection('counter').findOne({name:"totalPosts"}, (error, result)=>{
        numberofPosts = result.totalPosts;
        console.log(numberofPosts);
    })
    db.collection('post').insertOne({
        _id: numberofPosts,
        todo: req.body.todo,
        due: req.body.due
    }, (err, res)=>{
        console.log(numberofPosts);
        db.collection('counter').updateOne({name:"totalPosts"}, {$inc:{totalPosts:1}}, (error, result)=>{
            if(error){return console.log(error)}
        })
    })
    res.send("Posted")
    // console.log(res.config.data);
})

app.get('/tmp', (req, res)=>{
    console.log("Good");
    // res.header("Access-Control-Allow-Origin", "*");
    
    res.send("Good");
   
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})