const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const getProblem=async (req,res)=>{
    const problemcode=req.body.problemcode;
    const problems=await schema.Problem.aggregate([
        {
            $match:{
                problemcode:problemcode
            }
        },
        {
            $project:{
                input:0,
                output:0
            }
        }
    ])

    if(problems.length>0){
        const problem=problems[0]
        res.status(200);
        res.json({
            "accepted":"yes",
            "problem":problem
        });
        return;
    }
    res.status(200);
    res.json({
        "accepted":"no",
        "error":"not found",
        "msg":"problem with given problemcode was not found"
    });
    return;
    
};
const getProblems=async (req,res)=>{
    
    const problemCriteria=req.body.problemCriteria;
    // console.log(req.body,problemCriteria);
    if(problemCriteria){
        const problemList=await schema.Problem.aggregate([
            {
                $match:problemCriteria
            },
            {
                $project:{
                    input:0,
                    output:0
                }
            }
        ])
        return res.json({
            accepted:"yes",
            problemList:problemList
        })
    }
    res.status(200);
    res.json({
        accepted:"no",
        problemList:[],
        error:"problemCriteria does not exist",
        msg:"Please select a valid problemCriteria"
    });
    return;
}
const getProblemsByTag=async (req,res)=>{
    
    const problemCriteria=req.body.problemCriteria;
    const tag=problemCriteria.tag;
    // console.log(req.body,problemCriteria);
    if(problemCriteria){
        const problemList=await schema.Problem.aggregate([
            {
                $in:[tag,"$tags"]
            }
        ])
        return res.json({
            accepted:"yes",
            problemList:problemList
        })
    }
    res.status(200);
    res.json({
        accepted:"no",
        problemList:[],
        error:"problemCriteria does not exist",
        msg:"Please select a valid problemCriteria"
    });
    return;
}

module.exports={
    getProblem:getProblem,
    getProblems:getProblems,
    getProblemsByTag:getProblemsByTag
}