import { sendEmail } from "../services/sendEmail.js";

export default (emailAddress, inviteUrl) => {
  const subject = "Invitation to Join InterTecHub Platform";
  const message = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #ED8F0C; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to InterTecHub!</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; margin-bottom: 20px;">
          You have been invited to join our platform. Click the button below to set up your account and get started.
        </p>
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="${inviteUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #ED8F0C; color: white; text-decoration: none; font-size: 16px; border-radius: 5px; font-weight: bold;">
            Set Up Account
          </a>
        </div>
        <p style="font-size: 14px; color: #555;">
          If you didn’t request this invitation, please ignore this email.
        </p>
      </div>
      <div style="background-color: #f8f8f8; color: #555; padding: 10px; text-align: center; font-size: 12px; border-top: 1px solid #ddd;">
        <p style="margin: 0;">InterTecHub © ${new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  `;

  return sendEmail(emailAddress, subject, message);
};
