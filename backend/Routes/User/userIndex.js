const express = require('express')
const router = express.Router()
// const cors=require('cors')
// router.use(cors({
//     origin: true,
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
const user_profile_module=require('./userProfile')

router.post("/getProfile",user_profile_module.userProfile)

module.exports = router