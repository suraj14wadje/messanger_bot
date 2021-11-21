const router = require('express').Router();

const db = require('../db');
const { calculateDaysTillNextBirthDay } = require('../util/date');

router.get('/',(req,res)=>{
    res.json(db.messages.get())
})

router.get('/test',(req,res)=>{
    res.json(calculateDaysTillNextBirthDay(req.body.date))
})

router.get('/:id',(req,res)=>{
    res.json(db.messages.find(m=>m.id == req.params.id))
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