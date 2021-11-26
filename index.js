require('dotenv').config()
const express = require('express')

const db = require('./setup/db')
const router = require('./routes')

db.connect();

const app = express();
app.use(express.json())
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => console.log(`Listening on port ${PORT}`));