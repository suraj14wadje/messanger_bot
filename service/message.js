const axios = require('axios')

const {messages:messageDb}  = require('../db')

const processIncomingMessage = (message)=>{
    //todo
    messageDb.push(message)
    console.log(message)
    sendMessage(message.sender.id,{"text":"Hello!!"})
}


const sendMessage = async (senderId, response)=>{

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
    }
   
}

module.exports = {
    processIncomingMessage,
    callSendApi: sendMessage
}