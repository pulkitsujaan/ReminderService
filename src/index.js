const express = require('express')
const { PORT } = require('./config/serverConfig');

const {subscribeMessage, createChannel} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig')

const jobs = require('./utils/job');
const TicketController = require('./controller/ticket-controller')
const EmailService = require('./services/email-service')

const app = express();


const setupAndStartServer = async ()=>{

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    
    app.post('/api/v1/tickets/',TicketController.create);

    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);


    app.listen(PORT, ()=>{
        console.log(`Server started at PORT ${PORT}`);
    });
}

setupAndStartServer();