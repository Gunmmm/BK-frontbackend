const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence', 'Teaching', 'Insurance', 'Engineering', 'Law', 'Medical', 'FCI', 'Question Papers', 'General'],
    default: 'General'
  },
  pdfUrl: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  status: { 
    type: String, 
    default: 'published' 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Book', BookSchema);
