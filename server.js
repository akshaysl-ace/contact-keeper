const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Define routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));