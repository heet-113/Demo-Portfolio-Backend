const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Middleware to normalize image paths for public folder assets
const normalizeImagePath = (projects) => {
    return projects.map(project => {
        if (project.image) {
            let imagePath = project.image.trim();
            
            // If it's an external URL, keep it as-is
            if (/^https?:\/\//i.test(imagePath) || imagePath.startsWith('//') || imagePath.startsWith('data:')) {
                return project;
            }
            
            // For local paths, ensure they start with / for the public folder
            // Remove common prefixes and normalize
            imagePath = imagePath
                .replace(/^\.\//, '') // Remove ./
                .replace(/^\/public\//, '/') // Convert /public/file to /file
                .replace(/^public\//, '/'); // Convert public/file to /file
            
            // Ensure path starts with /
            if (!imagePath.startsWith('/')) {
                imagePath = '/' + imagePath;
            }
            
            project.image = imagePath;
        }
        return project;
    });
};

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        let projects = await Project.find({}).sort({ createdAt: -1 });
        
        // Normalize image paths before sending to client
        projects = normalizeImagePath(projects);
        
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
