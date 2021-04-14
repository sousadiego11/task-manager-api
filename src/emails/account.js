
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'diegointeriores11@gmail.com',
        subject: 'Welcome to the app!',
        text: `We are glad that you are joining in with us, ${name}!`
    })
}

const sendDeletedUserEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'diegointeriores11@gmail.com',
        subject: 'Thank you',
        text: `It makes us sad that you're not satisfied with our application, ${name}. Let us know if there is something we could've done to keep you with us!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeletedUserEmail
}