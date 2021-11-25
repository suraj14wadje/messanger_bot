const axios = require('axios');
const {  calculateDaysTillNextBirthDay,isValid } = require('../util/date');

const Message = require('../model/Message')
const User    = require('../model/User')

const processIncomingMessage = async ({sender,message})=>{
    console.log("message received... from",sender," message : ",message)
    const user = sender.id;

    const {mid,text} = message;
    
    let userFromDb = await User.findOne({id:user})


    if(!userFromDb){
        userFromDb = await User.create({id:user,state:'name'})

        await sendMessage(user,{"text":"Hello There !"})
        await sendMessage(user,{"text":"What is your name?"})
    }
    else{
        await processReply(userFromDb,message.text)
    }
    await Message.create({
        mid,
        text,
        user:userFromDb._id
    })

}


const processReply =async (user,currentMessage) =>{
    let message = {text:''};

    if(user.state == 'name'){
        user.name = currentMessage;
        message.text = "Thanks, "+currentMessage ;
        await sendMessage(user.id,message)
        
        message.text = "What is your birth date ? please enter it in YYYY-MM-DD format :) ";
        await sendMessage(user.id,message);
        user.state = 'age';
    }
    else if(user.state == 'age'){
        
        if(isValid(currentMessage)){ 
            user.birthDate = currentMessage;
            message.text = user.name + ", would you like to know how many days left for your next birthday ? "
            user.state = 'ask'
        }else{
            message.text = "Invalid date, please enter it in YYYY-MM-DD format"
        }
        sendMessage(user.id,message)
        
    }
    else if(user.state == 'ask'){
        if(currentMessage.toLowerCase().trim().startsWith('y')){
            const noOfDays = calculateDaysTillNextBirthDay(user.birthDate)
            message.text = `${user.name}, there are only ${noOfDays} left for your next birthday`;
        }
        else message.text = `Goodbye 👋`
        sendMessage(user.id,message);
        user.state = 'done'
    }
    else if(user.state == 'done'){

    }

    await user.save();

}


const sendMessage = async (senderId, response)=>{
    console.log("sendMessage Called with data : ",senderId,response)

    const request_body = {
        'recipient': {
            'id': senderId
        },
        'message': response
    }

    try{

        await axios.post('https://graph.facebook.com/v12.0/me/messages?access_token='+process.env.ACCESS_TOKEN,{
            ...request_body
        })

    }catch(ex){
        console.error("Error while sending message",ex)
        return false;
    }
    return true;
   
}

module.exports = {
    processIncomingMessage,
    sendMessage
}