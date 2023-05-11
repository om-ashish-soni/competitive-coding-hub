const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const {findExistingUser} = require('./findExistingUser');
const {UserFolderCreator} = require('../StartupDependencies/UserFolderCreator');
const { generateAccessToken } = require('../JWT/generateAccessToken');
const signin=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const isExistingUser=await findExistingUser(username);
    if(isExistingUser==true){
        console.log("signin user : ",username,409);
        res.status(409);
        res.json({
            "accepted":"no",
            "error":"conflict occured",
            "msg":"user with same username already exist"
        })
        return;
    }
    const userdirpath=await UserFolderCreator(username);
    console.log("userdirpath : ",userdirpath);
    console.log("signin user : ",username,201);
    req.body.userdirpath=userdirpath;
    const newUser=new schema.User(req.body);
    await newUser.save();
    const ACCESS_TOKEN=generateAccessToken({
        username:username,
        password:password
    })
    res.status(201);
    res.json({
        "accepted":"yes",
        "msg":"signin successfully",
        "ACCESS_TOKEN":ACCESS_TOKEN
    });
    return ;
    
};

module.exports={
    signin:signin,
}