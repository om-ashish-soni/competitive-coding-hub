const schema=require('../Database/schema')
const { findExistingUserConcrete } = require("../Authentication/findExistingUser")

const userProfile=async (req,res)=>{
    const username=req.body.username;
    const existingUsers=await schema.User.aggregate([
        {
            $match:{
                username:username
            }
        },
        {
            $project:{
                password:0
            }
        }
    ]);
    if(existingUsers.length==0){
        console.log("in userProfile : ",username,404);
        res.status(200);
        return res.json({
            "accepted":"no",
            "profileData":""
        });
    }
    console.log("in userProfile : ",username,200);
    const existingUser=existingUsers[0];
    res.status(200);
    return res.json({
        "accepted":"yes",
        "profileData":existingUser
    });
}

module.exports={
    userProfile:userProfile
}