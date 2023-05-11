const {db_con}=require('../Database/service');
const schema=require('../Database/schema');
const {findExistingUser} = require('./findExistingUser');
const {UserFolderDeletor} = require('../EndUpDependency/UserFolderDeletor');
const logout=async (req,res)=>{
    const username=req.body.username;
    const isExistingUser=await findExistingUser(username);
    if(isExistingUser==false){
        console.log("user logout  : ",username , "404");
        res.status(404);
        res.json({
            "accepted":"no",
            "error":"invalid credentials username or password provided",
            "msg":"user with given username and password does not exist"
        })
        return;
    }
    const UserDirPath=await UserFolderDeletor(username);
    console.log("removed : ",UserDirPath);
    console.log("user logout  : ",username , "202");
    res.status(202);
    res.json({
        "accepted":"yes"
    })
    return;
};

module.exports={
    logout:logout
}