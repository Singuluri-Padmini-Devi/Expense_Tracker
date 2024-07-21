const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all expenses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new expense
router.post('/', authMiddleware, async (req, res) => {
  const { date, amount, category, description } = req.body;

  try {
    const expense = new Expense({
      user: req.user.userId,
      date,
      amount,
      category,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit an expense
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { date, amount, category, description } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense || expense.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.date = date || expense.date;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);
    if (!expense || expense.user.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.remove();
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
