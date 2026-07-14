const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.send('Personal Finance Dashboard backend is running');
});

// DB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/transactions', require('./routes/transactions'));
app.use('/analytics', require('./routes/analytics'));
app.use('/budgets', require('./routes/budgets'));
app.use('/goals', require('./routes/goals'));

// Start server LAST
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
