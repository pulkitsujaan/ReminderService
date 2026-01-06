const express = require('express')
const { PORT } = require('./config/serverConfig');
// const { sendBasicEmail } = require('./services/email-service');
const jobs = require('./utils/job');
const TicketController = require('./controller/ticket-controller')

const app = express();


const setupAndStartServer = async ()=>{

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.post('/api/v1/tickets/',TicketController.create);
    app.listen(PORT, ()=>{
        console.log(`Server started at PORT ${PORT}`);
        jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'alexgoodman932@gmail.com',
        //     'This is a testing mail',
        //     'Hey Hi! this is a testing mail, just to see if the service is working or not'
        // )
    });
}

setupAndStartServer();