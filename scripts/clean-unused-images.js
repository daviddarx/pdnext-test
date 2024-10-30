const fs = require('fs');
const path = require('path');

// Directories
const contentDir = path.join(__dirname, '../_content'); // Path for _content folder
const uploadsDir = path.join(__dirname, '../public/images/uploads'); // Path for images and PDFs

// Step 1: Scan all JSON files and find references to images and PDFs
function getUsedFilesFromJSON() {
  let usedFiles = new Set();

  // Recursively read JSON files from the _content directory
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath); // Recursively scan subdirectories
      } else if (path.extname(fullPath) === '.json') {
        // Read and parse the JSON file
        console.log(`Scanning file: ${fullPath}`);
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

        // Collect all images from individual fields and arrays
        collectImageReferences(data, usedFiles);
      }
    });
  }

  scanDirectory(contentDir);
  return usedFiles;
}

// Helper function to collect image references from JSON data
function collectImageReferences(data, usedFiles) {
  const jsonString = JSON.stringify(data);

  // Flexible regex for finding references to the uploads folder
  const fileRegex = /"\/images\/uploads\/([^"]+)"/g;
  let match;

  while ((match = fileRegex.exec(jsonString)) !== null) {
    const filePath = match[1]; // Get just the filename
    usedFiles.add(filePath);
    console.log(`Found file reference: ${filePath}`);
  }
}

// Step 2: Scan the uploads folder to get all files (both images and PDFs)
function getAllFilesInUploads() {
  return fs.readdirSync(uploadsDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.pdf', '.tif', '.tiff'].includes(ext); // Includes TIFF images as well
  });
}

// Step 3: Remove unused files from the uploads folder
function removeUnusedFiles() {
  const usedFiles = getUsedFilesFromJSON();
  const allFiles = getAllFilesInUploads();

  allFiles.forEach((file) => {
    if (!usedFiles.has(file)) {
      const filePath = path.join(uploadsDir, file);
      console.log(`Removing unused file: ${file}`);
      fs.unlinkSync(filePath); // Delete the file
    }
  });
}

// Run the script
removeUnusedFiles();
