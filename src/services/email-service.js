const sender = require('../config/emailConfig')
const TicketRepository = require('../repository/ticket-repository')
const cron = require('node-cron');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody
    })
    console.log(response)
    cron.schedule('0 */2 * * * *', () => {
    console.log('Running a task every 2 minutes, on the 0 second mark');
});
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async()=>{
    try{

        const response = await repo.get({status:"PENDING"});
        return response
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

const updateTicket = async(ticketId, data)=>{
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createNotification = async(data)=>{
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const subscribeEvents = async(payload)=>{
    const service = payload.service;
    const data = payload.data;
    switch(service){
        case 'CREATE_TICKET':
            createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            sendBasicEmail(data);
            break;
        default:
            console.log("No valid event recieved");
            break;
    }
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}