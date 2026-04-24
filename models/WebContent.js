const mongoose = require('mongoose');

const WebContentSchema = new mongoose.Schema({
  section: { type: String, required: true, index: true }, // 'courses', 'upsc_hub', etc.
  title: { type: String, required: true },
  category: { type: String }, 
  subCategory: { type: String }, 
  instructor: { type: String },
  image: { type: String },
  isFeatured: { type: Boolean, default: true },
  status: { type: String, default: 'published' },
  examDate: { type: Date }, // Exam date for countdown timer
  // Dynamic Sections Array
  dynamicSections: [{
    title: { type: String },
    content: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('WebContent', WebContentSchema, 'portal_web_content');
