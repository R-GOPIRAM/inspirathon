const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id);

    return res.status(201).json({ success: true, message: 'Signup successful', token, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    return res.status(200).json({ success: true, message: 'Login successful', token, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/logout', auth, (req, res) => {
  return res.status(200).json({ success: true, message: 'Logout successful on client side. Remove token from storage.' });
});

router.get('/me', auth, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

module.exports = router;
