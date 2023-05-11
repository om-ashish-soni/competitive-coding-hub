const express = require('express')
const router = express.Router()
// const cors=require('cors')
// router.use(cors({
//     origin: true,
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
const set_problem_module=require('./executor')
router.post("/run",set_problem_module.executor)

module.exports = router