const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const {findExistingUserWithPassword} = require('./findExistingUser');
const {UserFolderCreator}=require('../StartupDependencies/UserFolderCreator');
const { generateAccessToken } = require('../JWT/generateAccessToken');
const login=async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const existingUser=await findExistingUserWithPassword(username,password);
    // console.log("existingUser : ",existingUser);
    if(!existingUser){
        console.log("user login  : ",username , "404");
        res.status(404);
        res.json({
            "accepted":"no",
            "error":"invalid credentials username or password provided",
            "msg":"user with given username and password does not exist"
        })
        return;
    }
    const userdirpath=await UserFolderCreator(username);
    existingUser.userdirpath=userdirpath;
    await existingUser.save();
    console.log("userdirpath : ",userdirpath);
    console.log("user login  : ",username , "202");

    const ACCESS_TOKEN=generateAccessToken({
        username:username,
        password:password
    })
    // res.cookie('ACCESS_TOKEN',generateAccessToken(req.body.username),{
    //     maxAge:86400*30*1000,
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: 'lax'
    // });

    res.status(202);
    res.json({
        "accepted":"yes",
        "userdirpath":userdirpath,
        "ACCESS_TOKEN":ACCESS_TOKEN
    })
    
    return;
};

module.exports={
    login:login
}