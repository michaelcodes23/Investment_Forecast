//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
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
//app.use('/invest',invtController);
//Connections

//everytime I use captlogs everything shows

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo')
});
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
