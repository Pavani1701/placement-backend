const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET all applications (for admin)
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
