const express = require('express');
const router = express.Router();
const WebContent = require('../models/WebContent');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get dynamic content
router.get('/:section', asyncHandler(async (req, res) => {
  const items = await WebContent.find({ 
    section: req.params.section, 
    status: 'published' 
  }).sort({ createdAt: -1 });
  res.json({ success: true, items });
}));

// Helper for saving content
const saveContent = async (req, res, section) => {
  try {
    let { title, category, subCategory, instructor, image, isFeatured, dynamicSections } = req.body;
    
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (typeof dynamicSections === 'string') {
      try { dynamicSections = JSON.parse(dynamicSections); } 
      catch (e) { dynamicSections = []; }
    }
    
    const newItem = await WebContent.create({
      section,
      title,
      category,
      subCategory,
      instructor,
      image,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      dynamicSections: dynamicSections || [],
      status: 'published'
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

// @desc    Delete content item
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const item = await WebContent.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Content item not found' });
  }
  res.json({ success: true, message: 'Content deleted successfully' });
}));

module.exports = router;
