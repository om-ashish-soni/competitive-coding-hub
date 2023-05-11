const { db_con } = require('../Database/service');
const schema = require('../Database/schema');
const findExistingUser = async (username) => {
    const existingUsers = await schema.User.aggregate([
        {
            $match: {
                username: username
            }
        }
    ])
    return existingUsers.length > 0;
}
const findExistingUserConcrete=async (username)=>{
    const existingUser=await schema.User.findOne({
        username:username
    })
    return existingUser;
}
const findExistingUserWithPassword = async (username, password) => {
    const existingUser = await schema.User.findOne({
        username: username,
        password: password
    })
    return existingUser;
}
module.exports = {
    findExistingUser: findExistingUser,
    findExistingUserWithPassword: findExistingUserWithPassword,
    findExistingUserConcrete:findExistingUserConcrete
}