
const child_process=require('child_process')
const fs=require('fs');
const path=require('path');
const { performance } = require('perf_hooks');
const {errorParser} = require('../ErrorParser/errorParser');
const {boundedProcessor} = require('../Processor/boundedProcessor');
const {processor} = require('../Processor/processor')
const jsExecutor=async (dirpath,lang,code,input,timelimit=5000,memorylimit=1048576)=>{
    try{
        let filename='main.js';
        let filepath=path.join(dirpath,filename);
        fs.writeFileSync(filepath,code);
        
        let inputFileName='input_js.txt';
        let inputFilePath=path.join(dirpath,inputFileName);
        fs.writeFileSync(inputFilePath,input);
        
        let command='node '+filepath + ' < '+inputFilePath;
        // let result=await processor(command);
        let startTime=performance.now();
        let result=await boundedProcessor(command,timelimit,memorylimit);
        let endTime=performance.now();

        let executionTime=endTime-startTime;

        let output=result.stdout.toString();
        let error=result.stderr.toString();
        try{
            // arrOfError=error.toString().split(dirpath)
            // arrOfError.splice(0,3)
            // error=arrOfError.join(' ');
            error=errorParser(error,dirpath,3);
        }catch(err){
            console.log("could not beautify error : ",err);
        }
        
        // try{
        //     fs.unlinkSync(filepath);
        //     fs.unlinkSync(inputFilePath);
        // }catch(err){
        //     console.log('error while deleting file',err);
        // }
        

        return {
            output:output,
            error:error,
            executionTime:executionTime
        }
    }catch(err){
        console.log("error while executing js : ",err);
        // err.message=err.message.toString().replaceAll(dirpath,' \n');
        err.message=errorParser(err.message,dirpath,3);

        return {
            output:'',
            error:'error : '+err.message,
            executionTime:0.00
        }
    }
    
    // const result=await processor('node try.js')
    // console.log(result);
    // return result;
}
module.exports={
    jsExecutor:jsExecutor
}