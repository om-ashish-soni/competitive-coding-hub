const fs=require('fs')
const os=require('os');
const path=require('path');
const upsertDir=async (dirpath)=>{
    try{
        try{
            let basedirpath=path.join(os.tmpdir(),'SaraswatiCodingClub');
            if(fs.existsSync(basedirpath)){
                console.log("already exists basedirpath : ",basedirpath);
            }else{
                fs.mkdirSync(basedirpath);
                console.log("created basedirpath : ",basedirpath)
            }
        }catch(err){
            console.log("error while basedirpath creation",err)
        }
        if(fs.existsSync(dirpath)){
            console.log("in upsertDir : ",dirpath," already exist")
            return dirpath;
        }
        fs.mkdirSync(dirpath);
        console.log("in upsertDir created dir : ",dirpath);
        return dirpath;
    }catch(err){
        console.log(err);
        return dirpath;
    }
    
}
module.exports={
    upsertDir:upsertDir
}