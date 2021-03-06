const router = require('express').Router();
const messageService = require('../service/message')


router.post('/', (req, res) => {  
 
    let body = req.body;
    if (body.object === 'page') {

      body.entry.forEach(function(entry) {
          
        const message = entry.messaging[0];
        messageService.processIncomingMessage(message)
    });
  
      res.status(200).send('EVENT_RECEIVED');
    }
    else res.sendStatus(404);
    
  
  });

router.get('/',(req,res)=>{

    let VERIFY_TOKEN = process.env.VERIFY_TOKEN
      
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    if (mode && token) {
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {

        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } 
      else res.sendStatus(403);      
      
    }

})

module.exports = router;