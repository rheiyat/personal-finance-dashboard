const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/User');

const router = express.Router();

// REGISTER
// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = { name, email, password: hashed };
  users.push(newUser);

  res.json({
    message: 'User registered successfully',
    user: {
      name: newUser.name,
      email: newUser.email
    }
  });
});


// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email }, 'secret123', { expiresIn: '1h' });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email
    }
  });

});

module.exports = router;
