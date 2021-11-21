const axios = require('axios');
const { parseDate, calculateDaysTillNextBirthDay } = require('../util/date');

const {messages:messageDb,users:userDb}  = require('../db')

const processIncomingMessage = async ({sender,message})=>{
    console.log("message received... from",sender," message : ",message)
    const userId = sender.id;

    messageDb.push(message)
    let userFromDb = userDb.find(u=>u.id==userId);

    if(!userFromDb){
        userFromDb = userDb.push({id:userId,state:'name'})
        await sendMessage(userId,{"text":"Hello There !"})
        await sendMessage(userId,{"text":"What is your name?"})
    }
    else{
        processReply(userFromDb,message.text)

    }

}


const processReply =async (user,currentMessage) =>{
    let message = {text:''};
    let state = ''

    if(user.state == 'name'){
        user.name = currentMessage;
        message.text = "Thanks, "+currentMessage ;
        await sendMessage(user.id,message)
        
        message.text = "What is your birth date ? please enter it in YYYY-MM-DD format :) ";
        await sendMessage(user.id,message);
        user.state = 'age';
    }
    else if(user.state == 'age'){
        user.birthDate = currentMessage;
        message.text = user.name + ", would you like to know how many days left for your next birthday ? "
        sendMessage(user.id,message)
        user.state = 'ask'
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

    userDb.update(user);
    console.log(userDb.get());

}


const sendMessage = async (senderId, response)=>{
    console.log("sendMessage Called ",senderId,response)

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
        console.error(ex)
        return false;
    }
    return true;
   
}

module.exports = {
    processIncomingMessage,
    sendMessage
}