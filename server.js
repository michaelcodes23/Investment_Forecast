//Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const URI = process.env.MONGODB_URI;
const session = require('express-session');

//Middleware
//Adding app.use to allow us to post the form data
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Adding a method override to allow us to delete
app.use(methodOverride('_method'));
//CSS middleware
app.use(express.static('public'));
//Session middleware
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}))
/////////////Express Session Playground//////////////
app.get('/testone', function(req, res) {
  req.session.favFood = 'pizza';
  res.send(req.session);
})

app.get('/testtwo', (req,res)=>{
      if(req.session.favFood === 'pizza'){
        res.send('<h1> You got it!!!</h1>')
      } else{
        res.send('<h1>Uhhhhh, no, try again!</h1>')
      }
})

app.get('/update-test-one', (req, res)=>{
      req.session.favFood = `mom's seafood`;
      res.send(req.session);
})

//How many times visited
app.get('/times-visited', (req,res)=>{
      if(req.session.visits) {
        req.session.visits++
      } else {
        req.session.visits = 1;
      }
      res.send(`<h1>You've visited this page ${req.session.visits} time(s)</h1>`)
})

//Destroy session route
app.get('/testdestroy', (req,res)=>{
      req.session.destroy((err)=>{
        if(err){
          res.send('error with destroy route')
        } else {
          res.send('Test delete (destroy) route successful!!')
        }
        
      })
})
/////////////////////////////////////////////////////

//Controllers
const invtController = require('./controllers/routes.js');
app.use('/invest',invtController);

//Connections
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