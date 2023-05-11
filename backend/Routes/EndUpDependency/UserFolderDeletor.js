const os=require('os')
const path=require('path')
const fs=require('fs')

const UserFolderDeletor=async (username)=>{
    let baseDirPath=os.tmpdir();
    baseDirPath=path.join(baseDirPath,"SaraswatiCodingClub");
    let userDirPath=path.join(baseDirPath,username)
    if(fs.existsSync(userDirPath)){
        console.log("going to delete ",userDirPath);
        // fs.rmdirSync(userDirPath);
        fs.rmdirSync(userDirPath, { recursive: true });
        console.log("deleted userDirPath",userDirPath);
    }else{
        console.log("does not exists dir",userDirPath);
    }
    return userDirPath;
}
module.exports={
    UserFolderDeletor:UserFolderDeletor
}