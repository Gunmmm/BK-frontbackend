const Admission = require('../models/Admission');
const Counter = require('../models/Counter');
const formatFormNo = require('../utils/formatFormNo');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get next preview data
// @route   GET /api/registration/next-form-meta
// @access  Public
exports.getNextFormMeta = asyncHandler(async (req, res) => {
  const counter = await Counter.findOne({ _id: 'student_form' });
  const nextSeq = (counter ? counter.seq : 0) + 1;
  const nextFormNo = formatFormNo(nextSeq);
  const year = new Date().getFullYear();
  const nextRegNo = `BK-${year}-${nextSeq.toString().padStart(4, '0')}`;

  res.status(200).json({
    success: true,
    nextFormNo,
    nextFormNoRaw: nextSeq,
    nextRegNo,
    registrationStatus: "AUTO-GENERATED"
  });
});


// @desc    Submit registration form
// @route   POST /api/registration/submit
// @access  Public
exports.submitRegistration = asyncHandler(async (req, res) => {
  // 1. Get atomic next sequence number
  const counter = await Counter.findOneAndUpdate(
    { _id: 'student_form' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  
  const formNoRaw = counter.seq;
  const formNoDisplay = formatFormNo(formNoRaw);

  // 2. Sync registration number with form sequence
  const year = new Date().getFullYear();
  const regNo = `BK-${year}-${formNoRaw.toString().padStart(4, '0')}`;


  // 3. Save full admission details
  const admissionData = {
    salutation: req.body.salutation,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    surname: req.body.surname,
    motherName: req.body.motherName,
    dob: req.body.dob,
    gender: req.body.gender,
    mobileSelf: req.body.mobileSelf,
    mobileParents: req.body.mobileParents,
    email: req.body.email,
    schoolName: req.body.schoolName,
    courses: req.body.courses,
    category: req.body.category,
    registrationNo: regNo,
    formNo: formNoDisplay
  };

  if (req.files) {
    if (req.files.photo) admissionData.photoUrl = `/uploads/${req.files.photo[0].filename}`;
    if (req.files.signature) admissionData.signatureUrl = `/uploads/${req.files.signature[0].filename}`;
  }

  const admission = await Admission.create(admissionData);

  res.status(201).json({
    success: true,
    message: "Admission form submitted successfully",
    data: {
      regNo: admission.registrationNo,
      formNo: admission.formNo,
      id: admission._id
    }
  });
});
