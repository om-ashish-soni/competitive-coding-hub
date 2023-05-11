const os=require('os')
const path=require('path')
const fs=require('fs')

const UserFolderCreator=async (username)=>{
    let baseDirPath=os.tmpdir();
    baseDirPath=path.join(baseDirPath,"SaraswatiCodingClub");
    let userDirPath=path.join(baseDirPath,username)
    if(fs.existsSync(userDirPath)){
        console.log("already exists dir",userDirPath);
    }else{
        console.log("going to create ",userDirPath);
        fs.mkdirSync(userDirPath);
        console.log("created userDirPath",userDirPath);
    }
    return userDirPath;
}
module.exports={
    UserFolderCreator:UserFolderCreator
}