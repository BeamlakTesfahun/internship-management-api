import { sendEmail } from "../services/sendEmail.js";

export default (emailAddress, resetUrl) => {
  const subject = "Password Reset Request";
  const message = `
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #ED8F0C;
      color: white;
      padding: 20px;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      font-size: 24px;
      margin: 0;
    }
    .content {
      padding: 20px;
    }
    .content p {
      color: #555555;
      line-height: 1.6;
      font-size: 16px;
    }
    .button {
      display: block;
      text-align: center;
      margin: 20px auto;
      padding: 12px 20px;
      background-color: #ED8F0C;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #e07609;
    }
    .footer {
      text-align: center;
      color: #999999;
      font-size: 14px;
      margin-top: 20px;
    }
    .footer a {
      color: #ED8F0C;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>You requested a password reset. Please click the button below to reset your password:</p>
      <a href="${resetUrl}" class="button">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} InterTecHub. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  return sendEmail(emailAddress, subject, message);
};
