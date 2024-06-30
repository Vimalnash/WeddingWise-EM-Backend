
import nodemailer from "nodemailer";

// Send Mail Function
const sendEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.autoemail,
            pass: process.env.autoemailpass
        }
    });
    // <a href="http://localhost:5173/user/resetpasswordlink?auth=${token}">

    const mailOptions = {
        from: 'vaasaviram@gmail.com',
        to: email,
        subject: "Reset Password Link",
        html: `
        <h3>Reset Password Link</h3>, 
        <p>Click the Link below or Copy and Paste it in your browser<p/>
        <a href="https://weddingwise-em-frontend.netlify.app/resetpasswordlink?auth=${token}">
            ResetPasswordLink
        </a>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully");
        return true;
    } catch (error) {
        console.log("Error Sending Email: ", error);
        return false;
    }
};

export { sendEmail }
