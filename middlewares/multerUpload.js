const multer = require('multer');

// Define storage options
const storage = multer.memoryStorage();

// Initialize multer with storage options
const upload = multer({ storage });

module.exports = upload;