// Import nodemailer to handle email sending
import nodemailer from "nodemailer";

// Create a transport object using the SMTP settings from Brevo (formerly Sendinblue)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // The SMTP server host used for sending emails (Brevo's SMTP server).
  port: 587, // The port to connect to the SMTP server (587 is typically used for secure email submission).
  auth: {
    user: "817743001@smtp-brevo.com", // The username or email address used to authenticate with the SMTP server.
    pass: "FCIMPRvgXN4BpbqL", // The password or API key used for authentication (ensure to handle securely).
  },
});

// Export the transporter object so it can be used to send emails in other parts of the application
export default transporter;
