const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for CV upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Always save as cv.pdf to maintain a single latest version
    cb(null, 'cv.pdf');
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Get current CV info
app.get('/api/cv', (req, res) => {
  const cvPath = path.join(__dirname, '../../public/uploads/cv.pdf');
  
  if (fs.existsSync(cvPath)) {
    const stats = fs.statSync(cvPath);
    res.json({
      exists: true,
      lastUpdated: stats.mtime,
      url: '/uploads/cv.pdf'
    });
  } else {
    res.json({
      exists: false,
      message: 'No CV uploaded yet'
    });
  }
});

// Upload new CV
app.post('/api/cv/upload', upload.single('cv'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  res.json({
    message: 'CV uploaded successfully',
    file: req.file
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Max size is 5MB.' });
    }
  }
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
