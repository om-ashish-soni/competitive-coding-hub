const os=require('os')
const path=require('path')
const fs=require('fs')

const doStartupStuff=async()=>{
    let dirpath=os.tmpdir();
    dirpath=path.join(dirpath,"SaraswatiCodingClub");
    if(fs.existsSync(dirpath)){
        console.log("already exists dir",dirpath);
    }else{
        console.log("going to create ",dirpath);
        fs.mkdirSync(dirpath);
        console.log("created dirpath",dirpath);
    }

}
module.exports={
    doStartupStuff:doStartupStuff
}