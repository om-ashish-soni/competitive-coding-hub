const jwt=require('jsonwebtoken')
const generateAccessToken=(key)=>{
    const payload={
        'key':key
    }
    return jwt.sign(payload,process.env.RANDOM_NUMBER,{
        expiresIn:'30d'
    })
}
exports.generateAccessToken=generateAccessToken