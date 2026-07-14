const express = require('express');
const goals = require('../models/Goal');

const router = express.Router();

// GET all goals
router.get('/', (req, res) => {
  res.json(goals);
});

// CREATE goal
router.post('/', (req, res) => {
  const { name, target, current } = req.body;

  const newGoal = {
    id: goals.length + 1,
    name,
    target,
    current
  };

  goals.push(newGoal);
  res.json(newGoal);
});

// UPDATE progress
router.put('/:id', (req, res) => {
  const goal = goals.find(g => g.id == req.params.id);
  if (!goal) return res.status(404).json({ message: "Goal not found" });

  goal.current = req.body.current;
  res.json(goal);
});

module.exports = router;
