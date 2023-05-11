const jwt = require('jsonwebtoken')
const middleware = (req, res, next) => {
    try {
        console.log(`${req.method} : ${req.originalUrl} , ${Date().toString()} `)
        const ACCESS_TOKEN=req.body.ACCESS_TOKEN;
        console.log("access token : ", ACCESS_TOKEN);
        if (ACCESS_TOKEN) {
            jwt.verify(ACCESS_TOKEN, process.env.RANDOM_NUMBER, (err, result) => {
                if (err) throw err
                else{
                    req.body.username=result.key.username;
                    req.body.password=result.key.password;
                    console.log(result.key.username,result.key.password)
                    console.log("verfied user : ",result.key);
                    next();
                }
            })
        } else {
            res.status(404)
            return res.json({
                "error": "error while auth user , blocked by middle ware security",
                "msg": "could not verfiy user"
            })
        }

    } catch (err) {
        res.status(404)
        return res.json({
            "error": "error while auth user , blocked by middle ware security",
            "msg": "could not verfiy user"
        })
    }

}
module.exports = {
    middleware: middleware
}