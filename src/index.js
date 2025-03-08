require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Add this to debug the connection URI
console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API routes
app.use('/api/users', userRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Catch-all route for API documentation
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Portfolio API',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        getProfile: 'GET /api/users/profile',
        updateProfile: 'PUT /api/users/profile'
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
