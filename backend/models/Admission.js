const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  salutation: String,
  firstName: String,
  middleName: String,
  surname: String,
  motherName: String,
  dob: String,
  gender: String,
  mobileSelf: String,
  mobileParents: String,
  email: String,
  schoolName: String,
  courses: String, // Stringified array from frontend
  category: String,
  registrationNo: String,
  formNo: String,
  photoUrl: String,
  signatureUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema, 'academic_admissions');
