const router = require('express').Router();
const Message = require('../model/Message')

const { calculateDaysTillNextBirthDay } = require('../util/date');

router.get('/',async(req,res)=>{
    const messages = await Message.find();

    res.json(messages)
})

router.get('/test',(req,res)=>{
    res.json(calculateDaysTillNextBirthDay(req.body.date))
})

router.get('/:mid',async (req,res)=>{
    const {mid} = req.params;
    const message =await Message.findOne({mid})

    res.json(message)
})

router.post('/',async(req,res)=>{
    const {mid,user,text} = req.body;
    const message = await Message.create({
        mid,
        user,
        text
    })

    res.json(message)
})

router.delete('/:mid',async (req,res)=>{
    const { mid } = req.params;
    await Message.deleteOne({mid})

    res.sendStatus(200);
})



module.exports = router