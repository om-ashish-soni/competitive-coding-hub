/*
====================================================================
                          GURUDEV DATT
====================================================================
*/

const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { doStartupStuff } = require('./Routes/StartupDependencies/StartupDependencyUtils')
const authenticationRouter = require('./Routes/Authentication/authIndex');
const { middleware } = require('./Routes/Middleware/middleware')

const problemManagementRouter = require('./Routes/ManageProblem/manageProblemIndex');
const problemsRouter = require('./Routes/Problems/problemIndex');
const executorRouter = require('./Routes/Executor/executorIndex');
const judgeRouter = require('./Routes/Judge/judgeIndex');
const userRouter = require('./Routes/User/userIndex');
const dotenv = require('dotenv');

dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use(cors({
    origin: true,
    methods: ["GET", "POST","HEAD","PUT","DELETE","CONNECT","OPTIONS","TRACE"],
    credentials: true,
    preflightContinue: false
}));


app.use('/auth', authenticationRouter);
app.use('/problems', problemsRouter);
app.use('/user', userRouter);

app.use(middleware);

app.use('/problemManagement', problemManagementRouter);
app.use('/executor', executorRouter);
app.use('/submit', judgeRouter);



app.listen(process.env.PORT, async () => {
    await doStartupStuff()
    console.log(`Shripad Shree Vallabh is blessing to you on port ${process.env.PORT}`);
})



