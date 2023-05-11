const express = require('express')
const router = express.Router()
// const cors=require('cors')
// router.use(cors({
//     origin: true,
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
const judge_problem_module=require('./judgeProblem')
router.post("/judge",judge_problem_module.judgeProblem)

module.exports = router