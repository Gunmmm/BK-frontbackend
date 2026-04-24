const validateRegistration = (req, res, next) => {
  const { firstName, surname, mobileSelf, email, dob, gender, schoolName, courses } = req.body;
  const errors = [];

  if (!firstName || firstName.trim().length < 2) errors.push('First Name is required');
  if (!surname || surname.trim().length < 2) errors.push('Surname is required');
  if (!mobileSelf || !/^[0-9+ ]{10,15}$/.test(mobileSelf)) errors.push('Valid Mobile Number is required');
  if (email && !/\S+@\S+\.\S+/.test(email)) errors.push('Invalid Email format');
  if (!dob) errors.push('Date of Birth is required');
  if (!gender) errors.push('Gender selection is required');
  if (!schoolName) errors.push('School/College Name is required');
  if (!courses || courses.length === 0 || courses === '[]') errors.push('Course selection is required');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: errors
    });
  }

  next();
};

module.exports = validateRegistration;
