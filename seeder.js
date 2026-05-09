const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Project = require('./models/Project');

const dataPath = path.join(__dirname, 'data', 'projects.json');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    const raw = fs.readFileSync(dataPath, 'utf-8');
    const projects = JSON.parse(raw);

    await Project.deleteMany({});
    await Project.insertMany(projects);

    console.log('Seeded projects to database');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
