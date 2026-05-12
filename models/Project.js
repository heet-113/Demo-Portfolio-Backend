const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the image
        required: true,
        // Use one of these formats:
        // 1. Local public folder: "/filename.png" (e.g., "/e-commerce.png")
        // 2. External URL: "https://example.com/image.png"
        // Images are automatically normalized to the correct path format
    },
    techStack: {
        type: [String],
        required: true,
    },
    liveLink: {
        type: String,
    },
    githubLink: {
        type: String,
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
