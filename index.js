require('dotenv').config()

const express = require('express')
const mongoose   = require('mongoose');

const router = require('./routes')

const dbUrl = process.env.dbUrl 
mongoose.connect(dbUrl)
    .then(()=>console.log("connected to db!"))
    .catch((error)=>console.log("Error connecting to db",error))

const app = express();
app.use(express.json())
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => console.log(`Listening on port ${PORT}`));