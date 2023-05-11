const compileRun = require('compile-run');
const java=compileRun.java;
const fs=require('fs');
const path=require('path');
const {boundedProcessor} = require('../Processor/boundedProcessor');
const {processor} = require('../Processor/processor')

const javaExecutor=async (dirpath,lang,code,input,timelimit=5000,memorylimit=1048576)=>{

    // console.log("java : ",java);

    let sourceFileName='Main.java';
    let sourceFilePath=path.join(dirpath,sourceFileName);
    fs.writeFileSync(sourceFilePath,code);

    let inputFileName='input_java.txt';
    let inputFilePath=path.join(dirpath,inputFileName);
    fs.writeFileSync(inputFilePath,input);

    const command='javac '+sourceFilePath;
    const compileResult=await processor(command);
    console.log("compileResult : ",compileResult);
    if(compileResult.stderr){
        try{
            if (fs.existsSync(sourceFilePath)) fs.unlinkSync(sourceFilePath);
        }catch(err){
            console.log(err);
        }
        try{
            if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
        }catch(err){
            console.log(err);
        }
        return {
            output:compileResult.stdout,
            error:compileResult.stderr,
            executionTime:0.00
        }       
    }
    const runcommand='java '+sourceFilePath+' < '+inputFilePath;
    const result=await boundedProcessor(runcommand,timelimit,memorylimit);

    let output=result.stdout;
    let error=result.error;
    let executionTime=result.executionTime;
    try{
        if (fs.existsSync(sourceFilePath)) fs.unlinkSync(sourceFilePath);
    }catch(err){
        console.log(err);
    }
    try{
        if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
    }catch(err){
        console.log(err);
    }

    return {
        output:output,
        error:error,
        executionTime:executionTime
    }
}

// const javaExecutor=async (dirpath,lang,code,input)=>{

//     console.log("java : ",java);
//     console.log("compile-run :",compileRun);
//     // let filename='Main.java';
//     // let filepath=path.join(dirpath,filename);
//     // fs.writeFileSync(filepath,code);

//     // let inputFileName='input_java.txt';
//     // let inputFilePath=path.join(dirpath,inputFileName);
//     // fs.writeFileSync(inputFilePath,input);

//     return {
//         "java":java.hasOwnProperty("runFile")
//     }
// }
module.exports={
    javaExecutor:javaExecutor,
}