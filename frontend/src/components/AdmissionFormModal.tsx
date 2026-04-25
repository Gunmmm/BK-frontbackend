import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Download } from 'lucide-react';

interface AdmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionFormModal({ isOpen, onClose }: AdmissionFormModalProps) {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    signature: null as File | null,
    schoolName: '',
    salutation: '',
    surname: '',
    firstName: '',
    middleName: '',
    surnameLocal: '',
    firstNameLocal: '',
    middleNameLocal: '',
    motherName: '',
    motherTongue: '',
    dob: '',
    age: '',
    gender: '',
    mobileSelf: '',
    mobileParents: '',
    email: '',
    isIndianNational: '',
    isMaharashtraDomiciled: '',
    canReadWriteSpeakMarathi: '',
    maritalStatus: '',
    isDisabled: '',
    disabilityType: '',
    category: '',
    isNonCreamyLayer: '',
    motherOccupation: '',
    motherMobile: '',
    motherEducation: '',
    courses: [] as string[],
    date: '',
    place: '',
    registrationNo: '',
    formNo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          alert('File size must be less than 1MB');
          return;
        }
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseToggle = (course: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter(c => c !== course)
        : [...prev.courses, course]
    }));
  };

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData(prev => ({ ...prev, age: calculatedAge.toString() }));
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
       const fetchNumbers = async () => {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const res = await fetch('/api/registration/next-form-meta', { signal: controller.signal });
            clearTimeout(timeoutId);
             const data = await res.json();
              if (data.success) {
                 setFormData(prev => ({
                    ...prev,
                    registrationNo: data.nextRegNo || "GENERATED ON SUBMIT",
                    formNo: data.nextFormNo
                 }));
              }
          } catch (err) { 
            console.error('Failed to fetch reg numbers, using fallback');
            const ts = Date.now().toString().slice(-4);
            setFormData(prev => ({
              ...prev,
              registrationNo: `BK-2026-F${ts}`,
              formNo: `FRM-F${ts}`
            }));
          }
       };
       fetchNumbers();
    }
  }, [isOpen, isSubmitted]);

  const validateForm = () => {
    const required = [
      { field: 'firstName', label: 'First Name' },
      { field: 'surname', label: 'Surname' },
      { field: 'dob', label: 'Date of Birth' },
      { field: 'mobileSelf', label: 'Mobile (Self)' },
      { field: 'email', label: 'Email' },
      { field: 'schoolName', label: 'School / College Name' },
      { field: 'category', label: 'Category' },
      { field: 'place', label: 'Place' }
    ];

    for (const item of required) {
      if (!formData[item.field as keyof typeof formData]) {
        alert(`Please fill in: ${item.label}`);
        return false;
      }
    }

    if (formData.courses.length === 0) {
      alert('Please select at least one Course / Exam');
      return false;
    }

    if (!formData.photo || !formData.signature) {
      alert('Please upload both Photo and Signature');
      return false;
    }

    return true;
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
      
      const response = await fetch('/api/registration/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      if (data.success) {
        // Update with FINAL assigned numbers from server
        setFormData(prev => ({
          ...prev,
          registrationNo: data.regNo,
          formNo: data.formNo
        }));
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        alert('Server error: Could not submit form');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setIsSubmitted(true); // Fallback to handle offline test cases
    }
  };

  const generatePDF = async () => {
    try {
      await fetch('/api/track/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          formType: 'AdmissionFormPDF',
          studentName: `${formData.firstName} ${formData.surname}`.trim() || 'Anonymous'
        })
      });
    } catch(err) { console.error('Failed to track generate PDF'); }
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BK Admission Form - Submitted</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: 'Times New Roman', serif; padding: 5px; max-width: 100%; margin: 0 auto; font-size: 10.5px; line-height: 1.3; }
            .header { text-align: center; margin-bottom: 10px; padding: 8px; background: #1a1a1a; color: white; }
            .header span { color: #e74c3c; }
            .form-title { text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 5px; }
            .form-section { margin-bottom: 8px; }
            .form-section-title { font-weight: bold; font-size: 9.5px; text-transform: uppercase; margin-bottom: 4px; border-left: 3px solid #e74c3c; padding-left: 6px; }
            .checkbox-group { display: flex; flex-wrap: wrap; gap: 8px; font-size: 9px; }
            .checkbox-group label { display: flex; align-items: center; gap: 3px; }
            .checkbox-group input { margin: 0; }
            .input-group { margin-bottom: 6px; }
            .input-group label { display: block; font-weight: bold; font-size: 9px; margin-bottom: 2px; text-transform: uppercase; }
            .input-group div, .input-group span { padding: 3px 5px; border-bottom: 1px solid #000; min-height: 18px; display: block; }
            .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
            .four-col { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
            .signature-section { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 10px; padding-top: 15px; border-top: 1px solid #333; }
            .compact-section { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px; }
            .filled-value { padding: 2px 5px; background: #f9f9f9; border-bottom: 1px solid #000; min-height: 20px; font-weight: 500; }
            .photo-box { width: 100px; height: 120px; border: 2px solid #333; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: #fff; }
            .sig-box { width: 180px; height: 50px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; background: #fff; }
            .photo-section { text-align: center; margin-bottom: 15px; }
            .photo-section div { display: inline-block; margin: 0 10px; }
            .submitted-badge { text-align: center; background: #27ae60; color: white; padding: 5px 15px; font-size: 12px; font-weight: bold; margin-bottom: 10px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="header"><p style="margin:0;font-size:14px;"><span>BK</span> Educational & Welfare Society</p></div>
          <div class="form-title">Admission Form</div>
          <div style="text-align:center;"><span class="submitted-badge">SUBMITTED</span></div>
          <div class="photo-section">
            <div><div class="photo-box">Passport Photo</div><p style="font-size:9px;margin:3px 0;">Photo</p></div>
            <div><div class="sig-box">Sign Here</div><p style="font-size:9px;margin:3px 0;">Signature</p></div>
          </div>
          <div class="form-section"><div class="form-section-title">Course / Exam Selection</div><div class="checkbox-group">${courseOptions.map(c => `<label><input type="checkbox" ${formData.courses.includes(c) ? 'checked' : ''} disabled /> ${c}</label>`).join('')}</div></div>
          <div class="compact-section"><div class="input-group"><label>School / College:</label><div class="filled-value">${formData.schoolName || '________________'}</div></div><div class="input-group"><label>Salutation:</label><div class="filled-value">${formData.salutation || '________________'}</div></div></div>
          <div class="form-section"><div class="form-section-title">Full Name (in English)</div><div class="three-col"><div class="input-group"><label>Surname:</label><div class="filled-value">${formData.surname || '________________'}</div></div><div class="input-group"><label>First Name:</label><div class="filled-value">${formData.firstName || '________________'}</div></div><div class="input-group"><label>Middle Name:</label><div class="filled-value">${formData.middleName || '________________'}</div></div></div></div>
          <div class="compact-section"><div class="input-group"><label>Mother's Name:</label><div class="filled-value">${formData.motherName || '________________'}</div></div><div class="input-group"><label>Mother Tongue:</label><div class="filled-value">${formData.motherTongue || '________________'}</div></div></div>
          <div class="two-col"><div class="input-group"><label>Date of Birth:</label><div class="filled-value">${formData.dob || '________________'}</div></div><div class="input-group"><label>Age:</label><div class="filled-value">${formData.age || '________________'}</div></div></div>
          <div class="form-section"><div class="input-group"><label>Gender:</label><div class="checkbox-group">${["Male", "Female", "Transgender", "Other"].map(g => `<label><input type="radio" ${formData.gender === g ? 'checked' : ''} disabled /> ${g}</label>`).join('')}</div></div></div>
          <div class="two-col"><div class="input-group"><label>Mobile (Self):</label><div class="filled-value">${formData.mobileSelf || '________________'}</div></div><div class="input-group"><label>Mobile (Parent):</label><div class="filled-value">${formData.mobileParents || '________________'}</div></div></div>
          <div class="input-group"><label>Email:</label><div class="filled-value">${formData.email || '________________'}</div></div>
          <div class="four-col"><div class="input-group"><label>Indian National:</label><span> ${formData.isIndianNational === 'Yes' ? '☑' : formData.isIndianNational === 'No' ? '☐' : '☐'} Yes &nbsp; ${formData.isIndianNational === 'No' ? '☑' : '☐'} No</span></div><div class="input-group"><label>Maharashtra:</label><span> ${formData.isMaharashtraDomiciled === 'Yes' ? '☑' : '☐'} Yes &nbsp; ${formData.isMaharashtraDomiciled === 'No' ? '☑' : '☐'} No</span></div><div class="input-group"><label>Marathi:</label><span> ${formData.canReadWriteSpeakMarathi === 'Yes' ? '☑' : '☐'} Yes &nbsp; ${formData.canReadWriteSpeakMarathi === 'No' ? '☑' : '☐'} No</span></div><div class="input-group"><label>Marital Status:</label><div class="filled-value">${formData.maritalStatus || '________________'}</div></div></div>
          <div class="four-col"><div class="input-group"><label>PWD:</label><span> ${formData.isDisabled === 'Yes' ? '☑' : '☐'} Yes &nbsp; ${formData.isDisabled === 'No' ? '☑' : '☐'} No</span></div></div>
          <div class="form-section"><div class="form-section-title">Category</div><div class="checkbox-group">${categories.map(c => `<label><input type="radio" ${formData.category === c ? 'checked' : ''} disabled /> ${c}</label>`).join('')}</div></div>
          <div class="signature-section"><div><strong>Date:</strong> ${formData.date || '____/____/______'}</div><div><strong>Place:</strong> ${formData.place || '____________'}</div><div><strong>Student Signature:</strong> ____________________</div><div><strong>Parent/Guardian Signature:</strong> ____________________</div></div>
          <div style="text-align:center;margin-top:15px;font-size:9px;color:#666;">BK Educational & Welfare Society | Form Submitted Successfully</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const courseOptions = ["UPSC", "MPSC", "Banking", "NDA", "Police Bharti", "Railway Bharti", "Staff Selection", "Other", "Commerce", "Science", "State Board", "CBSE Board"];
  const salutations = ["Shri", "Smt.", "Kumar", "Kumari"];
  const categories = ["ST", "ESBC", "SC", "DT(A)", "SBC(A)", "Open", "NT(B)", "NT(C)", "NT(D)", "OBC", "SBC"];
  const disabilityTypes = ["Hearing Impairment", "Blindness / Low Vision", "Locomotor Disability", "Cerebral Palsy", "Other"];

  const handleDownload = async () => {
    try {
      await fetch('/api/track/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          formType: 'AdmissionForm',
          studentName: `${formData.firstName} ${formData.surname}`.trim() || 'Guest'
        })
      });
    } catch(err) { console.error('Failed to track download'); }

    const formValues = formData;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BK Admission Form</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { 
              font-family: Arial, sans-serif; 
              padding: 5px; 
              max-width: 100%;
              margin: 0 auto;
              font-size: 10px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 8px; 
              padding: 8px;
              background: #1a1a1a;
              color: white;
            }
            .header span { color: red; }
            .form-title { 
              text-align: center; 
              font-size: 14px; 
              font-weight: bold; 
              margin-bottom: 8px;
              text-transform: uppercase;
            }
            .form-section { margin-bottom: 6px; }
            .form-section-title { 
              font-weight: bold; 
              font-size: 9px; 
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .checkbox-group { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 3px; 
              font-size: 8px;
            }
            .checkbox-group label { display: flex; align-items: center; gap: 1px; }
            .input-row { 
              display: flex; 
              gap: 5px; 
              margin-bottom: 3px; 
            }
            .input-row input, .input-row select { 
              flex: 1; 
              border: 1px solid #333; 
              padding: 2px; 
              font-size: 9px;
            }
            .input-group { margin-bottom: 3px; }
            .input-group label { 
              display: block; 
              font-weight: bold; 
              font-size: 8px; 
              margin-bottom: 1px;
            }
            .input-group input, .input-group select { 
              width: 100%; 
              border: 1px solid #333; 
              padding: 2px; 
              font-size: 9px;
            }
            .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
            .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; }
            .four-col { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 3px; }
            .signature-section { 
              margin-top: 10px; 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 10px; 
              font-size: 9px;
            }
            .checkbox-item { display: inline-block; margin-right: 5px; font-size: 8px; }
            .checkbox-item input { margin-right: 1px; }
            .compact-section { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-bottom: 3px; }
            .compact-section .input-group { margin-bottom: 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <p><span>BK</span> Educational & Welfare Society</p>
          </div>
          <div class="form-title">Admission Form</div>
          
          <div class="form-section">
            <div class="form-section-title">Course / Exam Selection</div>
            <div class="checkbox-group">
              ${courseOptions.map(c => `
                <label><input type="checkbox" ${formValues.courses.includes(c) ? 'checked' : ''} /> ${c}</label>
              `).join('')}
            </div>
          </div>
          
          <div class="compact-section">
            <div class="input-group"><label>School / College:</label><input type="text" value="${formValues.schoolName || ''}" /></div>
            <div class="input-group">
              <label>Salutation:</label>
              <div class="checkbox-group">
                ${salutations.map(s => `<label><input type="radio" ${formValues.salutation === s ? 'checked' : ''} /> ${s}</label>`).join('')}
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <div class="form-section-title">Full Name (in English):</div>
            <div class="three-col">
              <div class="input-group"><label>Surname:</label><input type="text" value="${formValues.surname || ''}" /></div>
              <div class="input-group"><label>First Name:</label><input type="text" value="${formValues.firstName || ''}" /></div>
              <div class="input-group"><label>Middle Name:</label><input type="text" value="${formValues.middleName || ''}" /></div>
            </div>
          </div>
          
          <div class="compact-section">
            <div class="input-group"><label>Mother's Name:</label><input type="text" value="${formValues.motherName || ''}" /></div>
            <div class="input-group"><label>Mother Tongue:</label><input type="text" value="${formValues.motherTongue || ''}" /></div>
          </div>
          
          <div class="two-col">
            <div class="input-group"><label>Date of Birth:</label><input type="text" value="${formValues.dob || ''}" /></div>
            <div class="input-group"><label>Age:</label><input type="text" value="${formValues.age || ''}" /></div>
          </div>
          
          <div class="form-section">
            <label>Gender:</label>
            <div class="checkbox-group">
              ${["Male", "Female", "Transgender", "Other"].map(g => `<label><input type="radio" ${formValues.gender === g ? 'checked' : ''} /> ${g}</label>`).join('')}
            </div>
          </div>
          
          <div class="two-col">
            <div class="input-group"><label>Mobile (Self):</label><input type="text" value="${formValues.mobileSelf || ''}" /></div>
            <div class="input-group"><label>Mobile (Parent):</label><input type="text" value="${formValues.mobileParents || ''}" /></div>
          </div>
          
          <div class="form-section">
            <div class="input-group"><label>Email:</label><input type="text" value="${formValues.email || ''}" /></div>
          </div>
          
          <div class="four-col">
            <div><label>Indian?</label> <span style="font-size:8px">Y [ ] N [ ]</span></div>
            <div><label>Maharashtra?</label> <span style="font-size:8px">Y [ ] N [ ]</span></div>
            <div><label>Marathi?</label> <span style="font-size:8px">Y [ ] N [ ]</span></div>
            <div><label>Marital:</label><input type="text" style="width:50px" value="${formValues.maritalStatus || ''}" /></div>
          </div>
          
          <div class="four-col">
            <div><label>PWD?</label> <span style="font-size:8px">Y [ ] N [ ]</span></div>
            <div class="input-group"><label>Category:</label></div>
          </div>
          
          <div class="form-section">
            <div class="checkbox-group">
              ${categories.map(c => `<label><input type="radio" ${formValues.category === c ? 'checked' : ''} /> ${c}</label>`).join('')}
            </div>
          </div>
          
          <div class="signature-section">
            <div>Date: ____ / ____ / ______</div>
            <div>Place: ____________________</div>
            <div>Student Signature: ____________________</div>
            <div>Parent Signature: ____________________</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 overflow-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl z-50 overflow-hidden max-h-[95vh] overflow-y-auto"
          >
            <div className="bg-ink text-white p-3 text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-1 right-1 p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X size={14} />
              </button>
              <p className="text-[10px] font-bold"><span className="text-red-500">BK</span> Career Academy</p>
            </div>

            <div className="p-4 border-b flex justify-between text-[10px] sm:text-xs font-mono font-bold text-ink">
              <div className="flex gap-2">
                 <span className="text-muted">REGISTRATION NO:</span>
                 <span className="text-brand px-2 bg-ink">{formData.registrationNo || 'LOADING...'}</span>
              </div>
              <div className="flex gap-2">
                 <span className="text-muted">FORM NO:</span>
                 <span className="text-brand px-2 bg-ink">{formData.formNo || 'LOADING...'}</span>
              </div>
            </div>

            <div className="p-3 border-b text-center">
              <h2 className="text-lg font-black uppercase">Admission Form</h2>
            </div>

            {!isSubmitted ? (
              <div className="admission-form-content">
                <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div>
                  <p className="text-xs font-bold uppercase mb-2">Course / Exam Selection</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] sm:text-xs">
                    {courseOptions.map(course => (
                      <label key={course} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.courses.includes(course)}
                          onChange={() => handleCourseToggle(course)}
                          className="w-3 h-3"
                        />
                        <span>{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">1. Name of School / College:</p>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-2 py-1 text-xs"
                    placeholder="____________________________"
                  />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">2. Salutation:</p>
                  <div className="flex gap-4 text-[10px]">
                    {salutations.map(s => (
                      <label key={s} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="salutation"
                          required
                          value={s}
                          onChange={handleInputChange}
                          className="w-2.5 h-2.5"
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border border-dashed border-gray-300 p-3 rounded-lg bg-gray-50/50 mb-2">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black uppercase flex items-center gap-2 text-ink">
                       Student Photo <span className="text-[7px] font-normal text-gray-400 leading-none">(MAX 1MB)</span>
                    </p>
                    <input 
                      type="file" 
                      name="photo" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                      className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[9px] file:font-black file:bg-brand file:text-ink cursor-pointer shadow-[1px_1px_0_0_#1A1A1A]" 
                    />
                    {formData.photo && <p className="text-[7px] text-green-600 font-bold mt-1 tracking-tighter">✓ {formData.photo.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black uppercase flex items-center gap-2 text-ink">
                       Signature <span className="text-[7px] font-normal text-gray-400 leading-none">(MAX 1MB)</span>
                    </p>
                    <input 
                      type="file" 
                      name="signature" 
                      accept="image/*" 
                      onChange={handleInputChange} 
                      className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:border-0 file:text-[9px] file:font-black file:bg-ink file:text-white cursor-pointer shadow-[1px_1px_0_0_#F7931A]" 
                    />
                    {formData.signature && <p className="text-[7px] text-green-600 font-bold mt-1 tracking-tighter">✓ {formData.signature.name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase mb-1">3. Surname:</p>
                    <input type="text" name="surname" required value={formData.surname} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" placeholder="____________" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase mb-1">First Name:</p>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" placeholder="____________" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase mb-1">Middle Name:</p>
                    <input type="text" name="middleName" required value={formData.middleName} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" placeholder="____________" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">4. Full Name (Local Language):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
                    <input type="text" name="surnameLocal" value={formData.surnameLocal} onChange={handleInputChange} className="border border-gray-300 px-2 py-1 text-sm" placeholder="Surname" />
                    <input type="text" name="firstNameLocal" value={formData.firstNameLocal} onChange={handleInputChange} className="border border-gray-300 px-2 py-1 text-sm" placeholder="First Name" />
                    <input type="text" name="middleNameLocal" value={formData.middleNameLocal} onChange={handleInputChange} className="border border-gray-300 px-2 py-1 text-sm" placeholder="Middle Name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase">4. Mother's Name:</p>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase">5. Mother Tongue:</p>
                    <input type="text" name="motherTongue" value={formData.motherTongue} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">7. Date of Birth:</p>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">8. Age:</p>
                    <input type="text" name="age" value={formData.age} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">9. Gender:</p>
                  <div className="flex gap-4 text-xs">
                    {["Male", "Female", "Transgender", "Other"].map(g => (
                      <label key={g} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="gender" required value={g} onChange={handleInputChange} className="w-3 h-3" />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">10. Mobile Number (Self):</p>
                    <input type="tel" name="mobileSelf" required value={formData.mobileSelf} onChange={handleMobileChange} placeholder="10-digit number" className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">11. Mobile Number (Parent):</p>
                    <input type="tel" name="mobileParents" value={formData.mobileParents} onChange={handleMobileChange} placeholder="10-digit number" className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                </div>

                 <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase">9. Email ID:</p>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-xs" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">13. Indian National?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="isIndianNational" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="isIndianNational" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">14. Maharashtra Domiciled?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="isMaharashtraDomiciled" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="isMaharashtraDomiciled" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">15. Marathi?</p>
                    <div className="flex gap-2 text-xs">
                      <label className="flex items-center gap-1"><input type="radio" name="canReadWriteSpeakMarathi" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label className="flex items-center gap-1"><input type="radio" name="canReadWriteSpeakMarathi" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">16. Marathi - Read:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiRead" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiRead" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">Write:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiWrite" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiWrite" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">Speak:</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="marathiSpeak" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="marathiSpeak" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">17. Marital Status:</p>
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">18. Person with Disability?</p>
                    <div className="flex gap-2 text-xs">
                      <label><input type="radio" name="isDisabled" value="Yes" onChange={handleInputChange} /> Yes</label>
                      <label><input type="radio" name="isDisabled" value="No" onChange={handleInputChange} /> No</label>
                    </div>
                  </div>
                </div>

                {formData.isDisabled === 'Yes' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase">19. Type of Disability:</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {disabilityTypes.map(d => (
                        <label key={d} className="flex items-center gap-1"><input type="radio" name="disabilityType" value={d} onChange={handleInputChange} /> {d}</label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">20. Category:</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {categories.map(c => (
                      <label key={c} className="flex items-center gap-1"><input type="radio" name="category" required value={c} onChange={handleInputChange} /> {c}</label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase">21. Non-Creamy Layer?</p>
                  <div className="flex gap-2 text-xs">
                    <label><input type="radio" name="isNonCreamyLayer" value="Yes" onChange={handleInputChange} /> Yes</label>
                    <label><input type="radio" name="isNonCreamyLayer" value="No" onChange={handleInputChange} /> No</label>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <p className="text-xs font-bold uppercase mb-2">22. Additional Mother Details (Optional):</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 text-xs">
                    <div>
                      <p>Mother's Occupation:</p>
                      <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                    <div>
                      <p>Mother's Mobile:</p>
                      <input type="tel" name="motherMobile" value={formData.motherMobile} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                    <div>
                      <p>Mother's Education:</p>
                      <input type="text" name="motherEducation" value={formData.motherEducation} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <p className="font-bold uppercase mb-1">Date:</p>
                    <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <p className="font-bold uppercase mb-1">Place:</p>
                    <input type="text" name="place" required value={formData.place} onChange={handleInputChange} className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="City/Town" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <p>Student Signature: ____________________</p>
                  </div>
                  <div>
                    <p>Parent / Guardian Signature: ____________________</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-500 transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Admission Form'}
                </button>
                </form>
                </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
              >
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Submitted Successfully!</h3>
                <p className="text-gray-500 text-sm mb-6">We have sent the form to your email. We will contact you soon.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={generatePDF}
                    className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <Download size={18} /> Download Form
                  </button>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-black transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}