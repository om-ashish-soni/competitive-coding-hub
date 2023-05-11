const util=require('util');
const fs=require('fs');
const path=require('path');
const exec = util.promisify(require('child_process').exec);

const processor=async (command)=>{
    try{
        const {stdout,stderr}=await exec(command);
        console.log("in processor : ",stdout,stderr);
        // console.log("stdout : ",stdout);
        // console.log("stderr : ",stderr);
        return {
            stdout:stdout,
            stderr:stderr
        };
    }catch(err){
        return {
            stdout:'',
            stderr:err.message,
            stderrdetail:err
        }
    }
    
}
module.exports={
    processor:processor
}