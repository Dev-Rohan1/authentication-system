// import nodemailer
import nodemailer from "nodemailer";

// Configure the email transporter for sending emails
const transporter = nodemailer.createTransport({
  // SMTP server details
  host: "smtp-relay.brevo.com", // Replace with your SMTP server host
  port: 587, // Standard port for secure SMTP (STARTTLS)

  // Authentication credentials
  auth: {
    user: "817743001@smtp-brevo.com", // Replace with your email address
    pass: "FCIMPRvgXN4BpbqL", // Replace with your email password (consider using environment variables for security)
  },
});

// Export the configured email transporter
export default transporter;
