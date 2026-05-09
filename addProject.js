const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Project = require('./models/Project');

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node addProject.js <path-to-json-file>');
    process.exit(1);
  }

  const filePath = path.isAbsolute(arg) ? arg : path.join(process.cwd(), arg);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in file:', err.message);
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const created = await Project.create(doc);
    console.log('Inserted project:', created._id.toString());
    process.exit(0);
  } catch (err) {
    console.error('Error inserting project:', err.message);
    process.exit(1);
  }
}

main();
