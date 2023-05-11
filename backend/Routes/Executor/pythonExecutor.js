
const fs=require('fs');
const path=require('path');
const {errorParser} = require('../ErrorParser/errorParser');
const {boundedProcessor} = require('../Processor/boundedProcessor');
const {processor} = require('../Processor/processor')

const pythonExecutor=async (dirpath,lang,code,input,timelimit=5000,memorylimit=1048576)=>{
    try{
        let filename='main.py'
        let filepath=path.join(dirpath,filename);
        fs.writeFileSync(filepath,code);

        
        let inputFileName='input_py.txt';
        let inputFilePath=path.join(dirpath,inputFileName);
        fs.writeFileSync(inputFilePath,input);

        const command='python '+filepath+' < '+inputFilePath;
        // const result=await processor(command);
        const result=await boundedProcessor(command,timelimit,memorylimit);

        console.log("typeof(result.stderr) : ",typeof(result.stderr))
        try{
            // result.stderr.toString().split(dirpath).splice(0,3).join('\n');

            // arrOfError=result.stderr.toString().split(dirpath)
            // arrOfError.splice(0,3)
            // result.stderr=arrOfError.join(' ');
            result.stderr=errorParser(result.stderr,dirpath,3);
        }catch(err){
            console.log("could not beautify error : ",err);
        }
        

        console.log("result : ",result);
        try{
            // fs.unlinkSync(filepath);
            // fs.unlinkSync(inputFilePath);
        }catch(err){
            console.log('could not delete file',err);
        }
        
        return {
            output:result.stdout,
            error:result.stderr,
            executionTime:result.executionTime
        }
    }catch(err){
        console.log("err while executing python : ",err);
        err.message=errorParser(err.message,dirpath,3);
        return {
            output : '',
            error : err.message,
            executionTime:0.00
        }
    }
    
}

module.exports={
    pythonExecutor:pythonExecutor
}