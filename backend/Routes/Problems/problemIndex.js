const express = require('express')
const router = express.Router()
// const cors=require('cors')
// router.use(cors({
//     origin: true,
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
const get_problem_module=require('./getProblems')

router.post("/getProblem",get_problem_module.getProblem)
router.post("/getProblems",get_problem_module.getProblems)
router.post("/getProblemsByTag",get_problem_module.getProblemsByTag)

module.exports = router