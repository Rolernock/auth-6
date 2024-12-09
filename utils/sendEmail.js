import nodemailer from 'nodemailer'

export const sendEmail = async options => {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  const message = {
    from: 'Auth-6 noreply@auth-6.com',
    to: options.to,
    subject: options.subject,
    text: options.text
  }
  await transporter.sendMail(message)
}
