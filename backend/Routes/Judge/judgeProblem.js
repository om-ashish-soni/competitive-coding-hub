const executor = require("../Executor/executor");
const {languageExecutor} = require("../Executor/languageExecutor");
const {findExistingUserConcrete}=require('../Authentication/findExistingUser')
const { findExistingProblemConcrete } = require("../ManageProblem/findExistingProblem");
const {upsertDir}=require('../fileManagement/upsertDir');
const {comparator} = require("../Comparator/comparator");

const judgeProblem=async (req,res)=>{
    const username=req.body.username;
    const existingUser=await findExistingUserConcrete(username);
    const userdirpath=await upsertDir(existingUser.userdirpath);

    const problemcode=req.body.problemcode;
    const problem=await findExistingProblemConcrete(problemcode);
    console.log("judgeProblem : ",problemcode,username,userdirpath);
    // console.log("problem : ",problem)
    const input=problem.input;

    const lang=req.body.lang;
    const code=req.body.code;
    let timelimit=(problem.timelimit)?(problem.timelimit):(5000);
    let memorylimit=(problem.memorylimit)?(problem.memorylimit):(1048576);


    const result=await languageExecutor(userdirpath,lang,code,input,timelimit,memorylimit);

    console.log('result in judge : ',result);

    if(result.error){
        problem.totalSubmissions++;
        await problem.save();
        res.status(200)
        return res.json({
            result:result,
            problem:problem
        })
    }
    const userOutput=result.output;
    const correctOutput=problem.output;

    const matchResult=await comparator(userOutput,correctOutput);

    if(matchResult.status=='AC'){
        problem.correctSubmissions++;
    }
    problem.totalSubmissions++;
    console.log(problem.correctSubmissions,problem.totalSubmissions)
    await problem.save();
    result.status=matchResult.status
    res.json({
        
        result:result,
        problem:problem
    })
    
}

module.exports={
    judgeProblem:judgeProblem
}