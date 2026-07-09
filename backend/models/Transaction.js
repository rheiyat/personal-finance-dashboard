const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
