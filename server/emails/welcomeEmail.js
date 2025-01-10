import { sendEmail } from "../services/sendEmail.js";

export default (emailAddress, name) => {
  const subject = "Welcome to InterTecHub!";
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
    .content h2 {
      color: #333333;
      font-size: 20px;
    }
    .content p {
      color: #555555;
      line-height: 1.6;
      font-size: 16px;
    }
    .content ul {
      margin: 15px 0;
      padding-left: 20px;
      color: #555555;
    }
    .content ul li {
      margin-bottom: 10px;
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
      <h1>Welcome to InterTecHub!</h1>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <p>Welcome to <strong>InterTecHub</strong>! We're delighted to have you onboard.</p>
      <p>Here are a few things you can start with:</p>
      <ul>
        <li>Explore your dashboard to track and manage tasks.</li>
        <li>Submit completed tasks easily through the platform.</li>
        <li>Reach out to us for any questions or assistance.</li>
      </ul>
      <p>If you need help, feel free to contact us at <a href="mailto:support@intertechub.com">support@intertechub.com</a>.</p>
      <a href="https://intertechub-task-management-app.netlify.app/auth/login" class="button">Go to Dashboard</a>
      <p>Thank you for choosing <strong>InterTecHub</strong>. We’re excited to support you on your journey to success!</p>
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
