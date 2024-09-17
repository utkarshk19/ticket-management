const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ticketRoutes = require('./route/index');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb+srv://testuser:testuser@cluster0.bedxbdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
