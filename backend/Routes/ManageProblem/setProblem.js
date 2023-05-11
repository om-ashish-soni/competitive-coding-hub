const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const {findExistingProblem} = require('./findExistingProblem');
const setProblem=async (req,res)=>{
    const problemcode=req.body.problemcode;
    const isExistingProblem=await findExistingProblem(problemcode);
    if(isExistingProblem==true){
        res.status('200');
        res.json({
            "accepted":"no",
            "error":"conflict occured",
            "msg":"Problem with same problemcode already exist"
        })
        return;
    }
    console.log('problem',req.body.problem);
    const problem=req.body.problem;
    
    problem.timelimit=parseFloat(problem.timelimit?problem.timelimit:0)*1000;
    problem.memorylimit=parseFloat(problem.memorylimit?problem.memorylimit:0)*1024;
    problem.tags=problem.tags?problem.tags:['general']
    const newProblem=new schema.Problem(problem);
    await newProblem.save();
    res.status(201);
    res.json({
        "accepted":"yes",
        "msg":"problem created successfully"
    });
    return ;
    
};

module.exports={
    setProblem:setProblem,
}