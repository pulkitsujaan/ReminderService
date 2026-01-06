const cron = require('node-cron');
const emailService = require('../services/email-service');

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async ()=>{
        const response = await emailService.fetchPendingEmails();
        // console.log(response);
        response.forEach(email => {
            emailService.sendBasicEmail(
                "reminderservice@airline.com",
                email.recepientEmail,
                email.subject,
                email.content
            )
            emailService.updateTicket(email.id, {status:"SUCCESS"});
        });
        console.log("Running job every 5 minutes");
    })
    
}

module.exports = setupJobs;