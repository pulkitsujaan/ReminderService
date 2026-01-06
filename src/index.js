const express = require('express')
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');


const app = express();


const setupAndStartServer = async ()=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.listen(PORT, ()=>{
        console.log(`Server started at PORT ${PORT}`);

        sendBasicEmail(
            'support@admin.com',
            'alexgoodman932@gmail.com',
            'This is a testing mail',
            'Hey Hi! this is a testing mail, just to see if the service is working or not'
        )
    });
}

setupAndStartServer();