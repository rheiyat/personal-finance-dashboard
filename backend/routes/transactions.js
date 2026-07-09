const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');

const router = express.Router();

// CREATE
router.post('/', authMiddleware, async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  const transaction = await Transaction.create({
    userEmail: req.user.email,
    amount,
    type,
    category,
    date,
    notes
  });

  res.json(transaction);
});

// READ (with filters)
router.get('/', authMiddleware, async (req, res) => {
  const { category, startDate, endDate } = req.query;

  const filter = { userEmail: req.user.email };

  if (category) filter.category = category;
  if (startDate && endDate) {
    filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 });

  res.json(transactions);
});

// UPDATE
router.put('/:id', authMiddleware, async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete('/:id', authMiddleware, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transaction deleted' });
});

module.exports = router;
