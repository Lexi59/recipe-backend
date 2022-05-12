const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');

const app = express();
app.use(express.json());

const recipes = require('./recipes');

app.use(volleyball);
app.use(cors());
app.options('*', cors());

function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
}

app.get('/',(req,res)=>{
    res.json({
        message:'Hello World!',
        user: req.user,
    });
});


app.use('/recipes', recipes); 
app.use(allowCrossDomain);

function notFound(req,res,next){
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("Listening on port " + port);
});