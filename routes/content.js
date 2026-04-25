const express = require('express');
const router = express.Router();
const WebContent = require('../models/WebContent');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');

// Helper for saving content
const saveContent = async (req, res, section) => {
  try {
    let { title, category, subCategory, instructor, image, isFeatured, dynamicSections, examDate } = req.body;
    
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (typeof dynamicSections === 'string') {
      try { dynamicSections = JSON.parse(dynamicSections); } 
      catch (e) { dynamicSections = []; }
    }
    
    const query = { section, category, subCategory };
    const update = { $set: {} };
    
    if (title) update.$set.title = title;
    if (instructor) update.$set.instructor = instructor;
    if (image) update.$set.image = image;
    if (isFeatured !== undefined) update.$set.isFeatured = isFeatured === 'true' || isFeatured === true;
    
    // Only update dynamicSections if content is provided
    if (dynamicSections && dynamicSections.length > 0 && dynamicSections[0].content) {
      update.$set.dynamicSections = dynamicSections;
    }
    
    if (examDate) update.$set.examDate = new Date(examDate);
    update.$set.status = 'published';

    const newItem = await WebContent.findOneAndUpdate(query, update, { 
      new: true, 
      upsert: true,
      setDefaultsOnInsert: true 
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Save Course
router.post('/courses', authenticate, upload.single('image'), asyncHandler(async (req, res) => {
  await saveContent(req, res, 'courses');
}));

// @desc    Save UPSC Hub
router.post('/upsc_hub', authenticate, upload.single('image'), asyncHandler(async (req, res) => {
  await saveContent(req, res, 'upsc_hub');
}));

// @desc    Save Exam
router.post('/exams', authenticate, upload.single('image'), asyncHandler(async (req, res) => {
  await saveContent(req, res, 'exams');
}));

// @desc    Delete content item
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const item = await WebContent.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Content item not found' });
  }
  res.json({ success: true, message: 'Content deleted successfully' });
}));

// @desc    Get dynamic content (KEEP AT BOTTOM)
router.get('/:section', asyncHandler(async (req, res) => {
  console.log(`[CONTENT] Fetching section: ${req.params.section}`);
  try {
    const items = await WebContent.find({ 
      section: req.params.section, 
      status: 'published' 
    }).sort({ createdAt: -1 });
    console.log(`[CONTENT] Found ${items.length} items for ${req.params.section}`);
    res.json({ success: true, items });
  } catch (err) {
    console.error(`[CONTENT ERROR] Failed to fetch ${req.params.section}:`, err);
    throw err;
  }
}));

module.exports = router;
