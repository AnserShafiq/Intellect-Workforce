const mongoose = require('mongoose');


const contactForm = new mongoose.Schema({
    applicant_name: {
        type: String,
        required: true,
    },
    e_mail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] ,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
    reason_of_contact: {
        type: String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    }
})

const contactFormSubmission =  mongoose.model("ContactFormSubmissions", contactForm);
module.exports = contactFormSubmission;