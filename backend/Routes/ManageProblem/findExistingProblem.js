const { db_con } = require('../Database/service');
const schema = require('../Database/schema');
const findExistingProblem = async (problemcode) => {
    const existingProblems = await schema.Problem.aggregate([
        {
            $match:{
                problemcode: problemcode
            }
        }
    ])
    return existingProblems.length > 0;
}
const findExistingProblemConcrete=async (problemcode)=>{
    const existingProblem=await schema.Problem.findOne({
        problemcode:problemcode
    });
    // console.log("existingProblem : ",existingProblem)
    return existingProblem;
}
module.exports = {
    findExistingProblem: findExistingProblem,
    findExistingProblemConcrete:findExistingProblemConcrete
}