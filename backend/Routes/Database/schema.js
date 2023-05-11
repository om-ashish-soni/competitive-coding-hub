const mongoose = require('mongoose')
const user_schema = {
    username: String,
    password: String,
    fullname: String,
    country: String,
    state: String,
    city: String,
    profession: String,
    institute: String,
    userdirpath:String
}
const User=mongoose.model("users",user_schema);
exports.User=User;

const problem_schema={
    problemcode:String,
    description:String,
    solution:String,
    constraints:String,
    sampleinput:String,
    sampleoutput:String,
    input:String,
    output:String,
    difficulty:String,
    timelimit:Number,
    memorylimit:Number,
    setter:String,
    tester:String,
    date:{
        type:Date,
        default:Date.now
    },
    correctSubmissions:{
        type:Number,
        default:0
    },
    totalSubmissions:{
        type:Number,
        default:0
    },
    tags:[{
        type:String
    }]
}
const Problem = mongoose.model("problems",problem_schema);
exports.Problem=Problem;