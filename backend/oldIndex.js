/*
Introduction:
Common stuff which we need to include every time when we are going to create 
our own new project , so just need to copy from here.../okay
commands:
npm install express mysql multer cors body-parser
*/

/*
phase:1
---------------------------------
declaration and importing modules 
---------------------------------
*/
const { c, cpp, node, python, java } = require('compile-run');
const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const os=require('os');
const path=require('path');
const bodyParser = require('body-parser');
const { exec, spawn } = require("child_process");
const runner=require('child_process');
const fs = require('fs');
const {doStartupStuff}=require('./Routes/StartupDependencies/StartupDependencyUtils')
const urlencodeParser = bodyParser.urlencoded({ extended: false });
const authenticationRouter=require('./Routes/Authentication/authIndex');
const problemManagementRouter=require('./Routes/ManageProblem/manageProblemIndex');
const problemsRouter=require('./Routes/Problems/problemIndex');
const executorRouter=require('./Routes/Executor/executorIndex');
const judgeRouter=require('./Routes/Judge/judgeIndex');
const userRouter=require('./Routes/User/userIndex');
const dotenv=require('dotenv')
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use('/auth',authenticationRouter);
app.use('/problemManagement',problemManagementRouter);
app.use('/problems',problemsRouter);
app.use('/executor',executorRouter);
app.use('/submit',judgeRouter);
app.use('/user',userRouter);
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];
//         const d = new Date();
//         const nowTime = d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds();
//         const nowDate = d.getFullYear() + '_' + (d.getMonth() + 1) + '_' + d.getDate() + '_' + nowTime;

//         cb(null, `../instagram/public/uploads/${file.originalname}-${nowDate}.${ext}`);
//     }
// });
// const upload = multer({
//     storage: storage
// });

/*completed importing modules*/
/*phase 1 finished */

/* now going towards building actual application */

/*
PHASE - 2 : 
EXECUTING CODE
*/
// Function to check letters and numbers
// function alphanumeric(inputtxt) {
//     console.log(inputtxt);
//     var letterNumber = /^[0-9a-zA-Z]+$/;
//     if (-1 !== letterNumber.indexOf(inputtxt)) {
//         return true;
//     }
//     else {
//         alert("message");
//         return false;
//     }
// }

// app.post("/run", (req, res) => {
//     const lang = req.body.lang;
//     let code = req.body.code;
//     const inp = req.body.inp;
//     let op = null;
//     console.log(lang);
//     console.log(code);
//     console.log(inp);
//     const crypto = require("crypto");

//     let filename = crypto.randomBytes(20).toString('hex');
//     let inputfile = crypto.randomBytes(20).toString('hex');
//     inputfile += '.txt';
//     console.log("inputfile" + inputfile);
//     let ext = "txt";
//     if (lang === 'python') {
//         ext = 'py';
//     } else if (lang === 'java') {
//         ext = 'java';
//     } else if (lang === 'c_cpp') {
//         ext = 'cpp';
//     } else if (lang === 'php') {
//         ext = 'php';
//     } else if (lang === 'javascript') {
//         ext = 'javascript';
//     }
//     filename += '.';
//     if (ext === 'c_cpp') {
//         ext = 'cpp';
//     }
//     filename += ext;
//     // filename='codes/'+filename;
//     console.log(filename);
//     const fs = require('fs');
//     fs.writeFile(filename, code, function (err) {
//         if (err) console.log(err);
//         console.log('Saved!');
//     });
//     fs.writeFile(inputfile, inp, function (err) {
//         if (err) console.log(err);
//         console.log('inpfile Saved!');
//     });
//     // const getter=inp;

//     if (lang == "python") {
//         code = `import sys\nsys.stdin = open("${inputfile}", 'r')\n` + code;
//         exec(filename, (error, data, getter) => {
//             if (error) {
//                 op = error;
//                 res.json(`${op}`);
//                 // console.log("error",error.message);
//                 // return;
//             }
//             if (getter) {
//                 console.log("input", getter);
//                 // console.log("data",data);
//                 // return;
//             }
//             op = data;
//             console.log("output : ", op);
//             res.json(`${op}`);
//             // console.log("data",data);

//         });
//     } else if (lang === "c_cpp") {
//         console.log(code);
//         try {
//             exec(`g++ ${filename}`, (error, data, stderr) => {
//                 if (error) {
//                     console.log(`error: ${error.message}`);
//                     return;
//                 }
//                 if (stderr) {
//                     console.log(`stderr: ${stderr}`);
//                     return;
//                 }
//                 const child = spawn("./a"); //where a is the exe file generated on compiling the code.
//                 child.stdin.write(inp);
//                 child.stdin.end();
//                 child.stdout.on("data", (data) => {
//                     console.log(`child stdout:\n${data}`);
//                     op = data;
//                     res.json(`${op}`);
//                 });
//             })
//         } catch (err) {
//             console.log(err);
//             res.json(`${op}`);
//         }
//     } else if (lang === 'java') {
//         let dummyCode = code;
//         let index = dummyCode.indexOf('class ');
//         index += 6;
//         console.log(index, dummyCode[index]);
//         while (dummyCode[index] == ' ') { index++; }
//         console.log(index);
//         let newfilename = "";
//         let chcode = dummyCode.charCodeAt(index);
//         while (index < dummyCode.length && (chcode == 95 || (chcode >= 65 && chcode <= 90) || (chcode >= 97 && chcode <= 122) || (chcode >= 48 && chcode <= 57))) {
//             chcode = dummyCode.charCodeAt(index);
//             console.log(dummyCode.charCodeAt(index));
//             console.log(dummyCode[index]);
//             newfilename += dummyCode[index];
//             index++;

//         }
//         if (newfilename.substr(-1) == '\r' || newfilename.substr(-1)=='{' ) {
//             newfilename = newfilename.substr(0, newfilename.length - 1);
//             console.log("got it");
//         }
//         console.log("newFileName = ", newfilename);
//         console.log("index = ", index);
//         newfilename += '.java';
//         fs.writeFile(newfilename, code, function (err) {
//             if (err) console.log(err);
//             console.log('Saved!');
//         });

//         console.log(code);
//         console.log(java);
//         let resultPromise = java.runFile(newfilename, {

//             compilationPath: 'C:/Program Files/Java/jdk-16.0.2/bin/javac',
//             executionPath: 'C:/Program Files/Java/jdk-16.0.2/bin/java',
//             stdin: inp
//         }, (err, result) => {
//             if (err) console.log(err);
//             op = result;
//             res.json(op);
//         });

//     } else if (lang == 'javascript') {
//         const { exec } = require("child_process");
//         exec(`node ${filename}`, (error, data, getter) => {
//             if (error) {
//                 console.log("error", error.message);
//                 res.json(error.message);
//                 return;
//             }
//             if (getter) {
//                 console.log("data", data);
//                 op=data;
//                 res.json(op);
//                 return;
//             }
//             console.log("data", data);
//             op=data;
//             res.json(op);

//         });
//     }
// })
/*
completed phase 2 , executed code
*/
/*
PHASE - 3 SIGNIN
*/
// app.post("/signin",(req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     const fullname=req.body.fullname;
//     const country=req.body.country;
//     const state=req.body.state;
//     const city=req.body.city;
//     const profession=req.body.profession;
//     const institute=req.body.institute;
//     console.log(username,password);
//     const conToServer=mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:""
//     })
//     conToServer.query(`CREATE DATABASE ${username}`,(err,result)=>{
//         if(err){
//             console.log(err);
//             console.log("can not create database for user");
//             res.json("no");
//             return;
//         }
//         console.log("created database for user");
//         const conToCreateDetailsTable=mysql.createConnection({
//             host:"localhost",
//             user:"root",
//             password:"",
//             database:username
//         })
//         conToCreateDetailsTable.query(`CREATE TABLE details(
//             fullname  VARCHAR(255),
//             country VARCHAR(255),
//             state VARCHAR(255),
//             city VARCHAR(255),
//             profession VARCHAR(255),
//             institute VARCHAR(255)
//         )`,(err,result)=>{
//             if(err){
//                 console.log("can not create details table for user");
//                 res.json("no");
//                 return;
//             }
//             console.log("create details table");
//             const conToInsertInDetailsTable=mysql.createConnection({
//                 host:"localhost",
//                 user:"root",
//                 password:"",
//                 database:username
//             })
//             conToInsertInDetailsTable.query(`INSERT INTO details VALUES ('${fullname}','${country}','${state}','${city}','${profession}','${institute}')`,(err,result)=>{
//                 if(err){
//                     console.log("can not insert into details table");
//                     res.json("no");
//                     return;
//                 }
//                 console.log("insert into details table of user");
//                 const conToInsertInUserList=mysql.createConnection({
//                     host:"localhost",
//                     user:"root",
//                     password:"",
//                     database:"codechef"
//                 })
//                 conToInsertInUserList.query(`INSERT INTO users(username) VALUES ('${username}')`,(err,result)=>{
//                     if(err){
//                         console.log("can not insert into user into userlist");
//                         res.json("no");
//                         return;
//                     }
//                     console.log("inserted user into userlist");
//                     const conToCreateSubmissionsTable=mysql.createConnection({
//                         host:"localhost",
//                         user:"root",
//                         password:"",
//                         database:username
//                     })
//                     conToCreateSubmissionsTable.query(`CREATE TABLE submissions(
//                         code LONGTEXT,
//                         status VARCHAR(255)
//                     )`,(err,result)=>{
//                         if(err){
//                             console.log("can not create submissions table");
//                             console.log(err);
//                             res.json("no");
//                             return;
//                         }
//                         console.log("created submission table for user");
//                     })
//                     res.json("yes");
//                 })
//             })
//         })

//     })
// })
/*
completed phase 3
*/
/*
PHASE 4 LOGIN
*/
// app.post("/login",(req,res)=>{
//     const username=req.body.username;
//     const conToFindInUserList=mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:"",
//         database:"codechef"
//     })
//     conToFindInUserList.query(`SELECT * FROM users WHERE username='${username}'`,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.json("no");
//         }
//         else{
//             try{
//                 console.log(result[0].username);
//                 if(result[0].username==username){
//                     console.log("found named this user");
//                     res.json("yes");
//                 }
//                 else{
//                     res.json("no");
//                 }
//             }catch(err){
//                 console.log(err);
//                 res.json("no");
//             }
//         }
//     })
// })
/*
completed phase 4
*/
/*
PHASE 5 : fetch profile
*/
// app.post("/profile",(req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     const conToProfile=mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:'',
//         database:username
//     })
//     conToProfile.query(`select * from details`,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.json("no");
//             return;
//         }
//         console.log(result);
//         res.json(result);
//         return;
//     })
// })
/*
completed phase 5 , fetched profile
*/
/*
PHASE 6 Create Problem StateMent

*/
// app.post("/setProblem",(req,res)=>{
//     const problemcode=req.body.problemcode;
//     const description=req.body.description;
//     const constraints=req.body.constraints;
//     const sampleinput=req.body.sampleinput;
//     const sampleoutput=req.body.sampleoutput;
//     const input = req.body.input;
//     const output=req.body.output;
//     const difficulty=req.body.difficulty;
    
//     const conToCodechef=mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:"",
//         database:"codechef"
//     })
//     conToCodechef.query(`INSERT INTO problems VALUES ('${problemcode}','${description}','${constraints}','${sampleinput}','${sampleoutput}','${input}','${output}','${difficulty}')`,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.json("no");
//             return;
//         }
//         console.log("inserted problem into database");
//         res.json("yes");
//         return;
//     })
// })
/*
completed phase 6 , created problem statement
*/
/*
PHASE 7 , give Problems
*/
// app.post("/giveProblems",(req,res)=>{
//     const conToCodechef=mysql.createConnection({
//         host:"localhost",
//         user:"root",
//         password:"",
//         database:"codechef"
//     })
//     conToCodechef.query(`SELECT * FROM problems`,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.json("no");
//             return;
//         }
//         console.log(result);
//         res.json(result);
//         return;
//     })
// })
/*
completed phase 7 , gave problems
*/
/*
    ===========
   ||LAST PHASE||
    ===========
    last phase configuring messege that determines that whether server is
    connected or not
    */


app.listen(process.env.PORT, async () => {
    await doStartupStuff()
    console.log(`Shripad Shree Vallabh is blessing to you on port ${process.env.PORT}`);
})


/*
and that's done
====================================================================
                          GURUDEV DATT
====================================================================
*/