import React, { useState, useEffect } from 'react';
import './ComponentsStyles/componentsStyle.css';
import './ComponentsStyles/forms.css';
import { firestore } from '../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from 'emailjs-com';

emailjs.init('24xfVEuX62S5-USki')


const handleUpload = async (file) => {
  try {
    const fileRef = ref(storage, `resumes/${file.name}`);
    await uploadBytes(fileRef, file);

    // Getting url of uploaded file
    const fileURL = await getDownloadURL(fileRef);
    console.log('File uploaded successfully:', fileURL);
    return fileURL;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

const JsForm = () => {
  const SubmissionsCount = doc(firestore, 'FormsSubmissions', 'js-form-count');

  const [jobSeekerForm, setJobSeekerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    industry: '',
    majorExperience: '',
    resume: URL,
    submissionDate: '',
    submissionTime: '',
    newStatus: true,
    UniqueId: '',
  });

  const [error, setError] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(false);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeAndDate = new Date().toLocaleString('en-GB', {
      timeZone: userTimeZone,
      hour12: false,
    });

    const [date, time] = timeAndDate.split(', ');

    setJobSeekerForm((prev) => ({
      ...prev,
      submissionDate: date,
      submissionTime: time,
    }));
  }, []);

  const GetSubmissionsCount = async () => {
    const countValue = await getDoc(SubmissionsCount);
    let jsCount = 0;
    if (countValue.exists()) {
      jsCount = countValue.data().totalCount;
    }
    jsCount += 1;
    await setDoc(SubmissionsCount, { totalCount: jsCount }, { merge: true });
    return jsCount;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'phone') {
      let formattedPhone = value.replace(/\D/g, '');
      if (formattedPhone.length > 10) {
        formattedPhone = formattedPhone.slice(0, 10);
      }
      formattedPhone = formattedPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
      setJobSeekerForm((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
    } else if (name === 'resume') {
      const allowedTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/pdf',
      ];

      const file = files[0];

      if (file && allowedTypes.includes(file.type)) {
        setJobSeekerForm((prev) => ({
          ...prev,
          [name]: file,
        }));
        setError('');
      } else {
        setError('Please upload a valid file format: .doc, .docx, .txt, or .pdf');
        e.target.value = null;
      }
    } else {
      setJobSeekerForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!jobSeekerForm.resume) {
      setError('Please upload your resume.');
      return;
    }
    
    const ID = await GetSubmissionsCount();
    const formNumber = `JS_${ID}`;
    
    try {
      // Upload resume and get URL
      const resumeURL = await handleUpload(jobSeekerForm.resume);
      
      const newFormData = {
        ...jobSeekerForm,
        resume: resumeURL,
        UniqueId: ID
      };
      
      await setDoc(doc(firestore, 'JobSeekersForm', formNumber), newFormData);
      setSubmissionStatus(true);

      const dataToMail = {
        applicantName: `${jobSeekerForm.firstName} ${jobSeekerForm.lastName}`,
        email: jobSeekerForm.email,
        phoneNumber: jobSeekerForm.phone,
        targetIndustry: jobSeekerForm.industry,
        majorExperience: jobSeekerForm.majorExperience,
        resumeLink: resumeURL,
      };

      emailjs.send('intellect_workforce_34#', 'job_seekers_mail', dataToMail, '24xfVEuX62S5-USki')
      .then( (response) =>{
          console.log('Sucessfully Sent!!', response.status, response.text);
      },(error) => {
         console.log('Error => ', error);
      }
      ).catch((e) => console.log(e))

      console.log(newFormData);
    } catch (error) {
      console.error(error);
      setError('Error submitting the form.');
    }
  };

  return (
    <div className="emp-form">
      {submissionStatus === false ? (
        <>
          <div className="head-comment-div">
            <h3 className="head-comment-text">
              Please complete the form, and we will be in touch with you soon.
            </h3>
          </div>
          <form onSubmit={handleSubmission} className="form-body">
            <div className="form-heading">
              <h3>Personal Information</h3>
            </div>
            <div className="form-fields">
              <div className="form-input-field">
                <label className="form-input-field-label">First Name:</label>
                <input
                  className="form-input-field-input"
                  type="text"
                  name="firstName"
                  value={jobSeekerForm.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">Last Name:</label>
                <input
                  className="form-input-field-input"
                  type="text"
                  name="lastName"
                  value={jobSeekerForm.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">E-Mail:</label>
                <input
                  className="form-input-field-input"
                  type="email"
                  name="email"
                  value={jobSeekerForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">Phone#</label>
                <input
                  className="form-input-field-input"
                  type="tel"
                  name="phone"
                  value={jobSeekerForm.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">Target Industry:</label>
                <select
                  className="form-input-field-select"
                  name="industry"
                  value={jobSeekerForm.industry}
                  onChange={handleChange}
                >
                  <option value="">Select Industry</option>
                  <option value="Info Tech">Information Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Construction">Construction</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">Major Experience:</label>
                <input
                  className="form-input-field-input"
                  type="text"
                  name="majorExperience"
                  value={jobSeekerForm.majorExperience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-input-field">
                <label className="form-input-field-label">Upload Your Resume</label>
                <input
                  id="file-upload"
                  className="form-input-field-input file-upload"
                  type="file"
                  accept=".doc,.docx,.txt,.pdf"
                  name="resume"
                  onChange={handleChange}
                  required
                />
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
            <button type="submit" className="formSubmitBtn">
              Submit
            </button>
          </form>
        </>
      ) : (
        <div className="thanksDiv">
          <h3 className="thankYouMsg">Thank you for submitting the form.</h3>
        </div>
      )}
    </div>
  );
};

export default JsForm;
