const mongoose = require('mongoose')

module.exports.connect = async()=>{
    const dbUrl = process.env.dbUrl 
    mongoose.connect(dbUrl)
        .then(()=>console.log("connected to db!"))
        .catch((error)=>console.log("Error connecting to db",error))
}
