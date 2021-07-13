const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const sendMail = async (email, code) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: 'lllllll250@gmail.com',
    subject: 'Confirmation of registration',
    text: `Please, confirm your email adress GET http://localhost:${process.env.PORT || 8080}/api/users/verify/${code}`,
    html: `Please, confirm your email adress GET http://localhost:${process.env.PORT || 8080}/api/users/verify/${code}`,
  }
  await sgMail.send(msg)
}

module.exports = { sendMail }
