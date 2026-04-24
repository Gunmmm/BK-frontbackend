const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const Ticket = require('../models/Ticket');

// @desc    Get visitor count
// @route   GET /api/visitor-count
// @access  Public
router.get('/visitor-count', asyncHandler(async (req, res) => {
  const Visitors = mongoose.connection.collection('site_visitors');
  
  const result = await Visitors.findOneAndUpdate(
    { _id: 'global_counter' },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: 'after' }
  );
  
  const realIncrement = result && result.count ? result.count : 0;
  const baseCount = 125432; 
  res.json({ success: true, count: baseCount + realIncrement });
}));

// @desc    Track form downloads
// @route   POST /api/track/download
// @access  Public
router.post('/track/download', asyncHandler(async (req, res) => {
  const Downloads = mongoose.connection.collection('academic_form_downloads');
  const { formType, studentName } = req.body;
  
  await Downloads.insertOne({
    formType,
    studentName: studentName || 'Guest Student',
    timestamp: new Date()
  });
  
  res.json({ success: true });
}));

// @desc    Raise a support ticket
// @route   POST /api/tickets
// @access  Public
router.post('/tickets', asyncHandler(async (req, res) => {
  const { name, phone, issue } = req.body || {};

  if (!name || !phone || !issue) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, and issue description are required'
    });
  }

  await Ticket.create({
    name: name.trim(),
    phone: phone.trim(),
    issue: issue.trim()
  });

  res.status(201).json({
    success: true,
    message: 'Ticket raised successfully'
  });
}));

module.exports = router;
