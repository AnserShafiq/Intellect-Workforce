const mongoose = require('mongoose');

const jobSeeker = new mongoose.Schema({
    applicant_name:{
        type: String,
        required: true,
    },
    e_mail:{
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] ,
        required: true,
    },
    contact_number:{
        type: String,
        required: true,
    },
    industry:{
        type: String,
        required: true,
    },
    major_experience:{
        type: String,
        required: true,
    }, 
    submission_date:{
        type: String,
        required: true,
    }, 
    submission_time:{
        type: String,
        required: true,
    }, 
})

const jobseekersFormSubmission = mongoose.model('JobSeekersSubmissions', jobSeeker);
module.exports = jobseekersFormSubmission;