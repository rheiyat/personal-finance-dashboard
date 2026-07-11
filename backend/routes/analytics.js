const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');


router.get('/monthly-summary', authMiddleware, async (req, res) => {
  const { month, year } = req.query;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const summary = await Transaction.aggregate([
    { $match: {
        userEmail: req.user.email,
        date: { $gte: start, $lte: end }
    }},
    { $group: {
        _id: "$type",
        total: { $sum: "$amount" }
    }}
  ]);

  const income = summary.find(s => s._id === "income")?.total || 0;
  const expense = summary.find(s => s._id === "expense")?.total || 0;

  res.json({
    month,
    year,
    income,
    expense,
    net: income - expense
  });
});


router.get('/category-breakdown', authMiddleware, async (req, res) => {
  const { month, year } = req.query;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const breakdown = await Transaction.aggregate([
    { $match: {
        userEmail: req.user.email,
        type: "expense",
        date: { $gte: start, $lte: end }
    }},
    { $group: {
        _id: "$category",
        total: { $sum: "$amount" }
    }},
    { $sort: { total: -1 } }
  ]);

  res.json(breakdown);
});

router.get('/income-vs-expense', authMiddleware, async (req, res) => {
  const totals = await Transaction.aggregate([
    { $match: { userEmail: req.user.email }},
    { $group: {
        _id: "$type",
        total: { $sum: "$amount" }
    }}
  ]);

  const income = totals.find(t => t._id === "income")?.total || 0;
  const expense = totals.find(t => t._id === "expense")?.total || 0;

  res.json({ income, expense });
});


router.get('/trends', authMiddleware, async (req, res) => {
  const trends = await Transaction.aggregate([
    { $match: { userEmail: req.user.email }},
    { $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        income: {
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
        },
        expense: {
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
        }
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  res.json(trends);
});

module.exports = router;
