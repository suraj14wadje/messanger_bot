const router = require('express').Router();

const db = require('../db')

router.get('/messages',(req,res)=>{
    res.json(db.messages)
})



module.exports = router