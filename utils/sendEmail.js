import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(to, subject, text) {

    try {
         const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_FOR_GMAIL, 
            pass: process.env.PASSWORD_FOR_GMAIL     
        }
        });

        const mailOptions = {
        from: `"Assadullah Hassan" <${process.env.EMAIL_FOR_GMAIL}>`, 
        to: to,                  
        subject: subject, 
        text: text, 
        html: `<h1>Hello!</h1><p>${text}</p>` 
        };

       
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Email sent successfully!', info.messageId);
        });
    } catch (err) {
        console.error('Error sending email:', err);
    }
       

}
    