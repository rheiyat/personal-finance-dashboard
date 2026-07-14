const express = require('express');
const budgets = require('../models/Budget');

const router = express.Router();

// GET all budgets
router.get('/', (req, res) => {
  res.json(budgets);
});

// CREATE budget
router.post('/', (req, res) => {
  const { name, amount, category } = req.body;

  const newBudget = {
    id: budgets.length + 1,
    name,
    amount,
    category,
    spent: 0
  };

  budgets.push(newBudget);
  res.json(newBudget);
});

// UPDATE spent amount
router.put('/:id', (req, res) => {
  const budget = budgets.find(b => b.id == req.params.id);
  if (!budget) return res.status(404).json({ message: "Budget not found" });

  budget.spent = req.body.spent;
  res.json(budget);
});

module.exports = router;
