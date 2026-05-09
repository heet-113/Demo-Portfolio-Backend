const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
