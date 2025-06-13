const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// POST /api/jobs/create
router.post('/create', async (req, res) => {
  const { title, company, description, deadline, eligibility } = req.body;

  try {
    const newJob = new Job({ title, company, description, deadline, eligibility });
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post job' });
  }
});
// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});
const Application = require('../models/Application'); // 🔄 Import Application model
// POST /api/jobs/apply
router.post('/apply', async (req, res) => {
  const { studentName, studentEmail, jobId } = req.body;

  try {
    // Check if already applied
    const existing = await Application.findOne({ studentEmail, jobId });
    if (existing) return res.status(400).json({ error: 'Already applied to this job' });

    const newApp = new Application({ studentName, studentEmail, jobId });
    await newApp.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply for job' });
  }
});
// DELETE /api/jobs/:id
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});



module.exports = router;
