const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Seller = require('../models/Seller');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads', 'seller-documents');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  '/register',
  auth,
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const existingSeller = await Seller.findOne({ userId: req.user._id });
      if (existingSeller) {
        return res.status(409).json({ success: false, message: 'Seller profile already exists' });
      }

      const documents = {
        aadhaar: req.files?.aadhaar?.[0]?.path,
        pan: req.files?.pan?.[0]?.path,
        businessLicense: req.files?.businessLicense?.[0]?.path
      };

      const seller = await Seller.create({
        userId: req.user._id,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        businessPhone: req.body.businessPhone,
        panNumber: req.body.panNumber,
        businessCategory: req.body.businessCategory,
        businessDescription: req.body.businessDescription,
        documents
      });

      return res.status(201).json({ success: true, message: 'Seller registration submitted', seller });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
);

router.get('/profile', auth, authorize('seller', 'admin'), async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id }).populate('userId', 'name email');
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller profile not found' });
    }

    return res.status(200).json({ success: true, seller });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
