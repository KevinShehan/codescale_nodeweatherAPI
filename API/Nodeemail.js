import { createTransport } from 'nodemailer';
import { google } from 'googleapis';
import cron from 'node-cron';

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'your-redirect-uri'; // e.g., 'https://developers.google.com/oauthplayground'

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate a URL for the OAuth2 consent screen
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

// Exchange the authorization code for an access token
const token = 'your-access-token'; // obtained after user authorization

// Create a Nodemailer transporter
const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'kevin.shehan30@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: 'your-refresh-token',
    accessToken: token,
  },
});

// Send an email
const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'user@example.com',
  subject: 'Hourly Weather Report',
  text: 'Here is your hourly weather report...',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
