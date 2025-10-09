import sgMail from "@sendgrid/mail";
import "dotenv/config";

// using Twilio SendGrid's v3 Node.js Library

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setDataResidency('eu');
// uncomment the above line if you are sending mail using a regional EU subuser

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: process.env.SENDGRID_EMAIL_FROM };
    await sgMail.send(email);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
// const msg = {
//   to: "nepivo4955@ampdial.com", // Change to your recipient
//   from: "nbernikova@meta.ua", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
