const util = require('util');
const fs = require('fs');
const path = require('path');
const { platform } = require('process');
const { processor } = require('../Processor/processor');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const { performance } = require('perf_hooks');
const {boundedProcessor} = require('../Processor/boundedProcessor');

const cppExecutor = async (dirpath, lang, code, input,timelimit=5000,memorylimit=1048576) => {
    try {

        console.log("in cpp executor");
        let sourceFileName = "main.cpp";
        let sourceFilePath = path.join(dirpath, sourceFileName);
        fs.writeFileSync(sourceFilePath, code);

        let inputFileName = "input_cpp.txt";
        let inputFilePath = path.join(dirpath, inputFileName);
        fs.writeFileSync(inputFilePath, input);

        let executableFilePath = "";
        let executableFileName = "";
        if (platform != 'win32') {
            executableFileName = 'a.out';
            executableFilePath = path.join(dirpath, executableFileName);
        } else {
            executableFileName = 'a.exe';
            executableFilePath = path.join(dirpath, executableFileName);
        }

        // const compileCommand=`g++-7 ${sourceFilePath} -o ${executableFilePath}`;
        const compileCommand = `g++ ${sourceFilePath} -o ${executableFilePath}`;
        const compileResult = await processor(compileCommand);
        let compileOutput = compileResult.stdout;
        let compileError = compileResult.stderr;
        
        let compileErrorList = compileError.split(sourceFilePath);
        console.log(compileErrorList);
        let compileTimeError = compileErrorList.join(' ');



        if (compileTimeError) {
            console.log('compileTimeError',compileTimeError)
            // try{
            //     if (fs.existsSync(sourceFilePath)) fs.unlinkSync(sourceFilePath);
            // }catch(err){
            //     console.log(err);
            // }
            // try{
            //     if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
            // }catch(err){
            //     console.log(err);
            // }
            console.log("compileTimeError occured")
            return {
                output: compileTimeError,
                error: compileTimeError,
                executionTime:0.00
            }
        }
        console.log("normal compiled");



        // console.log('executableFilePath : ',executableFilePath);
        

        const command=executableFilePath+' < '+inputFilePath;
        const result=await boundedProcessor(command,timelimit,memorylimit)
        console.log("result : ",result);
        // try{
        //     if (fs.existsSync(sourceFilePath)) fs.unlinkSync(sourceFilePath);
        // }catch(err){
        //     console.log(err);
        // }
        // try{
        //     if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
        // }catch(err){
        //     console.log(err);
        // }
        return {
            output:result.stdout,
            error:result.stderr,
            executionTime:result.executionTime
        }
    }catch(err){
        console.log("error : ",err)
        return {
            output:err,
            error:err,
            executionTime:0.00
        }
    }
}
module.exports = {
    cppExecutor: cppExecutor
}