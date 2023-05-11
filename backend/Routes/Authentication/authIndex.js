const express = require('express')
const router = express.Router()
// const cors=require('cors')
// router.use(cors({
//     origin: true,
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
const signin_module=require('./signin')
const login_module=require('./login');
const logout_module = require('./logout');
router.post("/signin",signin_module.signin)
router.post("/login",login_module.login)
router.post("/logout",logout_module.logout)
module.exports = router