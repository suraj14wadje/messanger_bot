const router = require('express').Router();

const db = require('../db');
const { calculateDaysTillNextBirthDay } = require('../util/date');

router.get('/',(req,res)=>{
    db.messages.delete(1)
    res.json(db.messages.get())
})

router.get('/t',(req,res)=>{
    res.json(calculateDaysTillNextBirthDay(req.body.date))
})

router.post('/',(req,res)=>{
    db.messages.push(req.body)
    res.sendStatus(200);
})

router.delete('/:id',(req,res)=>{
    db.messages.delete(req.params.id)
    res.sendStatus(200);
})



module.exports = router