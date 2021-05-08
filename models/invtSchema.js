const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const invtSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    name: {type: String},
    age: {type: Number},
    startingAmt: {type: Number},
    exptIRR: {type: Number},
    yrsToInvest: {type: Number},
    annuityPayment: {type: Number},
    futureValue: {type: Number}
})

const investmentLog = mongoose.model('investmentLog', invtSchema);
const investmentGoal = mongoose.model('investmentGoal', invtSchema);
//make this exportable

module.exports.investmentLog = investmentLog;
module.exports.investmentGoal = investmentGoal;