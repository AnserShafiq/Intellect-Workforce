const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
// const path = require('path');
// const multer = require('multer');
const fs = require('fs');
// const { google } = require('googleapis');
const google_api_key = require('./google-drive-api-key.json');
const formidable = require('formidable');
const { version } = require('os');
const app = express();
const port = process.env.PORT || 4000;
const ContactFormModule = require('./modules/contactForm.jsx')
const JobSeekerFormModule = require('./modules/jsForm.jsx');

// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// async function authorize() {
//   const myclient = new google.auth.JWT(
//     google_api_key.client_email,
//     null,
//     google_api_key.private_key,
//     SCOPE
//   )
//   await myclient.authorize();

//   return myclient;
// }

// function uploadResume(authClient){
//   return new Promise((res, req) => {
//     const drive = google.drive({version: 'v3', auth: authClient})

//     var metaResumeFile = {
//       parent: ['1AVB5WMnoiie-eIKlkc4cqsemUjXUbgT2']
//     } 

//     drive.files.create({
//       resource: metaResumeFile,
//       media: {      
//         body:fs.createReadStream('filename'),
//         mimeType: ['.txt', '.docs', '.pdf']
//       },
//       fields: 'id',
//     },function(error,file){
//       if(error){
//           return rejected(error)
//       }
//       resolve(file);
//     })

//   })
// }

app.use(cors({
  origin: ['https://intellectworkforce.vercel.app'],
  methods: ['POST', 'GET'],
  credentials: true,
}))

// app.use(cors())

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ansershafiq:xrVCQNzxanHlVkJ1@todolist.iyo5qtw.mongodb.net/TodoList?retryWrites=true&w=majority");
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'meetingnass@gmail.com',
        pass: 'cbjh safa hbfk ocwk'
    },
});

// Multer Configuration
// const storage = multer.memoryStorage();
// Store files in memory for uploading to Google Drive
// const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
    // res.json('Intellect workforce');
    res.json(`Server running on port ${port}`);
});


app.post('/job-seekers-form-submission', (req, res) => {
  console.log('Job Seekers Form Submission');
  const jS_Data = req.body;
  console.log('Job Seekers Data: ', jS_Data);
  JobSeekerFormModule.create({
    applicant_name: `${req.body.firstName} ${req.body.lastName}`,
    e_mail: req.body.email,
    contact_number: req.body.phone,
    industry: req.body.industry,
    major_experience: req.body.majorExperience,
    submission_date: req.body.submissionDate,
    submission_time: req.body.submissionTime
  }).then((Message) => res.json(Message))
  .catch((err) => res.json(err));
  // res.json(jS_Data); // Responding to the client
});

app.post('/employer-form-submission', (req, res) => {
  console.log('Employer Form Submission');
  const employerData = req.body;
  console.log('Employer Data: ', employerData);
  res.json(employerData); // Responding to the client
});


app.get('/employer-form-submission', (req, res) => {
  res.json('Employers Form Submission');
  console.log(req.body.data);  // Logging to check the received data
});


// POST route for handling contact form submissions
app.post('/contact-us-form', (req, res) => {
  ContactFormModule.create({
    applicant_name: req.body.ApplicantName,
    e_mail: req.body.EmailAddress,
    contact_number: req.body.ContactNumber,
    reason_of_contact: req.body.ReasonOfContact,
    message: req.body.Message,
  }).then((Message) => res.json(Message))
  .catch((err) => res.json(err));


  const contactData = req.body;
  console.log('Received contact form data:', contactData);


  transporter.sendMail({
      from: 'meetingnass@gmail.com',
      to: 'anser.shafiq@nastaffing.com', 
      subject: 'Contact Form Submission',
      text: `Name: ${contactData.ApplicantName}\nEmail: ${contactData.EmailAddress}\nContact Number: ${contactData.ContactNumber}\nReason: ${contactData.ReasonOfContact}\nMessage: ${contactData.Message}`,
  }, (error, info) => {

    console.log(error);
      if (error) {
          console.error('Error sending email:', error);
          return res.status(500).send('Failed to send email');
      }
      res.status(200).send('Email sent successfully');
  });
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//     try {
//         const { file } = req;
//         if (!file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const fileMetadata = {
//             name: file.originalname,
//         };
//         const media = {
//             mimeType: file.mimetype,
//             body: file.buffer,
//         };

//         const driveResponse = await drive.files.create({
//             requestBody: fileMetadata,
//             media: media,
//             fields: 'id',
//         });

//         res.status(200).send({ fileId: driveResponse.data.id });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// Start server
app.listen(port, (res,req) => {
    console.log(`Server running on port ${port}`);
});
