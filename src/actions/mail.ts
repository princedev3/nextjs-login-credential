"use server";
import Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";

const transport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS_KEY,
  },
});

export const sendMail = async (email: string, token: string) => {
  try {
    const mailOptions: Mail.Options = {
      from: "Travel Experts",
      to: email,
      subject: "Email Confirmation",
      html: `
    <h1>Thank you for registering with Bookings</h1>
    <p>Your personal code is: <strong>${token}</strong></p>
  `,
    };
    await transport.sendMail(mailOptions);
    return { success: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error sending email" };
  }
};

export const sendResetPasswordMail = async (email: string, token: string) => {
  try {
    const mailOptions: Mail.Options = {
      from: "Bookings",
      to: email,
      subject: "Reset Password Token",
      html: `
    <h1>Change your password</h1>
    <p>Your personal code is: <strong>${token}</strong></p>
  `,
    };
    await transport.sendMail(mailOptions);
    return { success: "Email sent successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Error sending email" };
  }
};
