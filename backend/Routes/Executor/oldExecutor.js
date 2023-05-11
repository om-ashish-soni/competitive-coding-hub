const { db_con } = require('../Database/service');
const schema = require('../Database/schema');
const { findExistingUserConcrete } = require('../Authentication/findExistingUser');
const {cppExecutor} = require('./cppExecutor');
const {upsertDir} = require("../fileManagement/upsertDir");
const {jsExecutor}=require('./jsExecutor')
const {pythonExecutor}=require('./pythonExecutor')
const {javaExecutor}=require('./javaExecutor')
const executor=async (req, res) => {
    const username=req.body.username;
    const existingUser=await findExistingUserConcrete(username);
    const userdirpath=await upsertDir(existingUser.userdirpath);

    const lang = req.body.lang;
    let code = req.body.code;
    const inp = req.body.inp;
    const input=req.body.inp;
    let result=null;
    let op = null;

    console.log("lang: ",lang);
    // console.log("code : ",code);
    // console.log("input : ",input);


    if(lang=='c_cpp'){
        result=await cppExecutor(userdirpath,lang,code,input)
    }else if(lang=='javascript'){
        result=await jsExecutor(userdirpath,lang,code,input)
    }else if(lang=='python'){
        result=await pythonExecutor(userdirpath,lang,code,input)
    }else if(lang=='java'){
        result=await javaExecutor(userdirpath,lang,code,input)
    }

    res.status(202);
    res.json({
        result:result
    })

    return;

    const crypto = require("crypto");

    let filename = crypto.randomBytes(20).toString('hex');
    let inputfile = crypto.randomBytes(20).toString('hex');
    inputfile += '.txt';
    console.log("inputfile" + inputfile);
    let ext = "txt";
    if (lang === 'python') {
        ext = 'py';
    } else if (lang === 'java') {
        ext = 'java';
    } else if (lang === 'c_cpp') {
        ext = 'cpp';
    } else if (lang === 'php') {
        ext = 'php';
    } else if (lang === 'javascript') {
        ext = 'javascript';
    }
    filename += '.';
    if (ext === 'c_cpp') {
        ext = 'cpp';
    }
    filename += ext;
    // filename='codes/'+filename;
    console.log(filename);
    const fs = require('fs');
    fs.writeFile(filename, code, function (err) {
        if (err) console.log(err);
        console.log('Saved!');
    });
    fs.writeFile(inputfile, inp, function (err) {
        if (err) console.log(err);
        console.log('inpfile Saved!');
    });
    // const getter=inp;

    if (lang == "python") {
        code = `import sys\nsys.stdin = open("${inputfile}", 'r')\n` + code;
        exec(filename, (error, data, getter) => {
            if (error) {
                op = error;
                res.json(`${op}`);
                // console.log("error",error.message);
                // return;
            }
            if (getter) {
                console.log("input", getter);
                // console.log("data",data);
                // return;
            }
            op = data;
            console.log("output : ", op);
            res.json(`${op}`);
            // console.log("data",data);

        });
    } else if (lang === "c_cpp") {
        console.log(code);
        try {
            exec(`g++ ${filename}`, (error, data, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                const child = spawn("./a"); //where a is the exe file generated on compiling the code.
                child.stdin.write(inp);
                child.stdin.end();
                child.stdout.on("data", (data) => {
                    console.log(`child stdout:\n${data}`);
                    op = data;
                    res.json(`${op}`);
                });
            })
        } catch (err) {
            console.log(err);
            res.json(`${op}`);
        }
    } else if (lang === 'java') {
        let dummyCode = code;
        let index = dummyCode.indexOf('class ');
        index += 6;
        console.log(index, dummyCode[index]);
        while (dummyCode[index] == ' ') { index++; }
        console.log(index);
        let newfilename = "";
        let chcode = dummyCode.charCodeAt(index);
        while (index < dummyCode.length && (chcode == 95 || (chcode >= 65 && chcode <= 90) || (chcode >= 97 && chcode <= 122) || (chcode >= 48 && chcode <= 57))) {
            chcode = dummyCode.charCodeAt(index);
            console.log(dummyCode.charCodeAt(index));
            console.log(dummyCode[index]);
            newfilename += dummyCode[index];
            index++;

        }
        if (newfilename.substr(-1) == '\r' || newfilename.substr(-1)=='{' ) {
            newfilename = newfilename.substr(0, newfilename.length - 1);
            console.log("got it");
        }
        console.log("newFileName = ", newfilename);
        console.log("index = ", index);
        newfilename += '.java';
        fs.writeFile(newfilename, code, function (err) {
            if (err) console.log(err);
            console.log('Saved!');
        });

        console.log(code);
        console.log(java);
        let resultPromise = java.runFile(newfilename, {

            compilationPath: 'C:/Program Files/Java/jdk-16.0.2/bin/javac',
            executionPath: 'C:/Program Files/Java/jdk-16.0.2/bin/java',
            stdin: inp
        }, (err, result) => {
            if (err) console.log(err);
            op = result;
            res.json(op);
        });

    } else if (lang == 'javascript') {
        const { exec } = require("child_process");
        exec(`node ${filename}`, (error, data, getter) => {
            if (error) {
                console.log("error", error.message);
                res.json(error.message);
                return;
            }
            if (getter) {
                console.log("data", data);
                op=data;
                res.json(op);
                return;
            }
            console.log("data", data);
            op=data;
            res.json(op);

        });
    }
};

module.exports={
    executor:executor
}