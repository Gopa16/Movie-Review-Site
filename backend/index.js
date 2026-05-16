import app from "./server.js"
import dotenv from "dotenv"   
dotenv.config()
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"    

const MongoClient = mongodb.MongoClient         
const mongo_username = process.env.MONGO_USER
const mongo_password = process.env.MONGO_PASS

const uri = process.env.MONGO_URI


const port = 8000  

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50 ,                                     
        wtimeoutMS: 2500,
        
    })
    .catch(err =>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {        
        await ReviewsDAO.injectDB(client)        
       app.listen(port, () => {
        console.log(`listing on port ${port}`)
       })
    })

