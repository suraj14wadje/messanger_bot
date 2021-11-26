const mongoose = require('mongoose')
const config = require('config')

module.exports.connect = async()=>{
    const dbUrl = config.get('dbUrl') 
    await mongoose.connect(dbUrl)
    console.log("connected to db!")  
      
}

module.exports.close = ()=>{
    mongoose.connection.close()
}
