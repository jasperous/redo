// import middleware
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// using express
const app = express();

//
const http = require('http').createServer(app);
http.listen(8080, ()=>{
    console.log('listening on 8080');
})

// static file 경로 설정
app.use(express.static(path.join(__dirname, '../client/build')));

// 
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.get('/list', (req, res)=>{
    console.log(res.body);
    res.send(res.data)
})