const multer = require('multer');
const cloudinary = require('../config/cloudinary-config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: process.env.CLOUDINARY_FOLDER
    }
});

const upload = multer({ storage: storage });

module.exports = upload;