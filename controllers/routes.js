const express = require('express');
const router = express.Router();
// const investLogs = require('../models/invtSchema.js')
const investSchema = require('../models/invtSchema.js')
const investLogs = investSchema.investmentLog
const investGoals = investSchema.investmentGoal
const investEntries = require('../models/invtEntries.js')
const investGoalEntries = require('../models/invtGoals.js')
//Base Seed Route
router.get('/seed',(req,res)=>{
    investLogs.create(investEntries,(error,createdList)=>{
        console.log('get the log: ', createdList);
        res.redirect('/invest');
        data: createdList;
    })
})
//Annuity Seed Route
router.get('/seedgoal', (req,res)=>{
    investGoals.create(investGoalEntries,(error,createdList)=>{
        console.log(createdList);
        res.redirect('/invest/investgoal');
        data: createdList;
    })
})

//Index - Base Goal
router.get('/',(req, res)=>{
    // res.send('My first test for the invest log app')
    // res.send(investLogs);
    // res.render('index.ejs',{
    //     data: invtLogs
    // });
    investLogs.find({},(error,getLog)=>{
        res.render('index.ejs',{
            data: getLog
        })
    })
});
//Index - Annuity Goal 
router.get('/investgoal',(req, res)=>{
    // res.send('Teseting my Invest Goal Route')
    investGoals.find({},(error,getLog)=>{
        res.render('goalindex.ejs',{
            data: getLog
        })
    })
})
//Show Routes, Create Routes, Delete Routes, CSS
//New Route - Base Goal
router.get('/new',(req, res)=>{
    res.render('new.ejs')
    // res.send('created my new route')
})

//New Route - Annuity Goal
router.get('/investgoal/new',(req, res)=>{
    res.render('newgoals.ejs')
    // res.send('created my new route')
})

//Create Route - Base Goal
router.post('/',(req,res)=>{
    // res.send('received');
    investLogs.create(req.body,(error,getLog)=>{
        res.redirect('/invest')
    })
})

//Create Route - Annuity Goal
router.post('/investgoal',(req,res)=>{
    // res.send('received');
    investGoals.create(req.body,(error,getLog)=>{
        res.redirect('/invest/investgoal')
    })
})

//Show Route - Base Goal
router.get('/:id',(req, res)=>{
    investLogs.find({},(error,getLog)=>{
        console.log(getLog[req.params.id])
        res.render('show.ejs',{
            data: getLog[req.params.id]
        })
    })
})

//Show Route - Annuity Goal
router.get('/investgoal/:id',(req, res)=>{
    investGoals.find({},(error,getLog)=>{
        console.log(getLog[req.params.id])
        // res.send(getLog[req.params.id])
        res.render('showgoals.ejs',{
            data: getLog[req.params.id]
        })
    })
})

//Edit Route - Base Goal
router.get('/:id/edit',(req, res)=>{
    investLogs.findById(req.params.id,(error, getLog)=>{
        console.log(getLog)
        // res.send(getLog)
        res.render('edit.ejs',{
            data: getLog
        })
    })
})

//Edit Route - Annuity Goal
router.get('/investgoal/:id/edit',(req, res)=>{
    investGoals.findById(req.params.id,(error, getLog)=>{
        console.log(getLog)
        // res.send(getLog)
        res.render('editgoals.ejs',{
            data: getLog
        })
    })
})
//Update Route - Base Goal
router.put('/:id',(req, res)=>{
    investLogs.findByIdAndUpdate(req.params.id, req.body, {new : true}, (error, getLog) => {
        res.redirect('/invest')
    })
})
//Update Route - Annuity Goal
router.put('/investgoal/:id',(req, res)=>{
    investGoals.findByIdAndUpdate(req.params.id, req.body, {new : true}, (error, getLog) => {
        res.redirect('/invest/investgoal')
    })
})
//Delete / Destroy Route
router.delete('/:id',(req, res)=>{
    investLogs.findByIdAndDelete(req.params.id).then(
        res.redirect('/invest')
    )
})

//Delete / Destroy Route
router.delete('/investgoal/:id',(req, res)=>{
    investGoals.findByIdAndDelete(req.params.id).then(
        res.redirect('/invest/investgoal')
    )
})
module.exports = router;