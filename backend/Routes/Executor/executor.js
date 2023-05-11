const { findExistingUserConcrete } = require('../Authentication/findExistingUser');
const {upsertDir} = require("../fileManagement/upsertDir");
const {languageExecutor}=require('./languageExecutor')
const executor=async (req, res) => {
    const username=req.body.username;
    const existingUser=await findExistingUserConcrete(username);
    const userdirpath=await upsertDir(existingUser.userdirpath);

    const lang = req.body.lang;
    let code = req.body.code;
    const inp = req.body.inp;
    const input=req.body.inp;
    let op = null;

    console.log("lang: ",lang);
    // console.log("code : ",code);
    // console.log("input : ",input);


    const result=await languageExecutor(userdirpath,lang,code,input);
    

    res.status(202);
    res.json({
        result:result
    })

    return;

};

module.exports={
    executor:executor
}