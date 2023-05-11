const util=require('util');
const fs=require('fs');
const path=require('path');
const {performance} = require('perf_hooks');

const exec    = util.promisify(require('child_process').exec);

// const exec=require('child_process').exec;
// const setTimeout= util.promisify(require('timers').setTimeout);

const boundedProcessor=async (command,timelimit=5000,memorylimit=1048576)=>{
    console.log(": limits :: ",timelimit,memorylimit,"+++++++++++++")
    let safeTimelimit=timelimit*1.5;
    let safeMemorylimit=memorylimit*1.5;
    try{
        const options={
            timeout:safeTimelimit,
            maxBuffer:safeMemorylimit
        }
        console.log("options : ",options);
        const startTime=performance.now();
        let endTime=-1;
        const {stdout,stderr}=await exec(command,options);
        endTime=performance.now();
        let status='OK';
        if(stderr) status=stderr;
        
        return {
            status:status,
            stdout:stdout,
            stderr:stderr,
            executionTime:endTime-startTime
        };
    }catch(err){
        console.log("error in boundedProcessor : ",err)
        
        return {
            status:'ERROR',
            stdout:'',
            stderr:'error : '+ err.message,
            stderrdetail:err,
            executionTime:0.00
        }
    }
    
}
module.exports={
    boundedProcessor:boundedProcessor
}