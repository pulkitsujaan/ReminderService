const sender = require('../config/emailConfig')
const cron = require('node-cron');


const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        // const response = await sender.sendMail({
    //     from: mailFrom,
    //     to: mailTo,
    //     subject: mailSubject,
    //     text: mailBody
    // })
    // console.log(response)
    cron.schedule('0 */2 * * * *', () => {
    console.log('Running a task every 2 minutes, on the 0 second mark');
});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendBasicEmail
}