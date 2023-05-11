const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
class DataBase{
    constructor(){
        this.db_url=process.env.DB_URL
        this.db_name=process.env.DB_NAME
        this.db_con
        console.log("in database consturctor of service.js")
        setImmediate(async ()=>{
            this.db_con=await this.createConnection()
        })
    }
    createConnection=()=>{
        return new Promise((resolve,reject)=>{
            mongoose.connect(
                this.db_url,
                {
                    useNewUrlParser: true,
                    keepAlive: true,
                    useUnifiedTopology: true,
                },
                (err,res)=>{
                    if(err){
                        console.log("error while creating connection : ",err)
                    }
                    else{
                        console.log("connected successfully")
                        resolve()
                    }
                }
            )
        })
    }
}

const database=new DataBase()
exports.db_con = database