const {cppExecutor}=require('./cppExecutor');
const {jsExecutor}=require('./jsExecutor')
const {pythonExecutor}=require('./pythonExecutor')
const {javaExecutor}=require('./javaExecutor');
const languageExecutor=async (userdirpath,lang,code,input,timelimit=5000,memorylimit=1048576)=>{
    let result=null;
    if(lang=='c_cpp'){
    // if(lang=='cpp'){
        result=await cppExecutor(userdirpath,lang,code,input,timelimit,memorylimit)
    }else if(lang=='javascript'){
        result=await jsExecutor(userdirpath,lang,code,input,timelimit,memorylimit)
    }else if(lang=='python'){
        result=await pythonExecutor(userdirpath,lang,code,input,timelimit,memorylimit)
    }else if(lang=='java'){
        result=await javaExecutor(userdirpath,lang,code,input,timelimit,memorylimit)
    }
    return result;
}
module.exports={
    languageExecutor:languageExecutor
}