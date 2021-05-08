//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = 3000;
const db = mongoose.connection;
const URI = process.env.MONGODB_URI;

//Middleware
//Adding app.use to allow us to post the form data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//adding a method override to allow us to delete
app.use(methodOverride('_method'));
//CSS
app.use(express.static('public'));

//Controllers
const invtController = require('./controllers/routes.js');
app.use('/invest',invtController);
//Connections

//everytime I use captlogs everything shows
app.listen(port,()=>{
    console.log('listening on port', port)
})

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

