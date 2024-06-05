const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongodb');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// CORS
app.use(cors());

// Routes
const coordRoutes = require('./routes/CoordinatesRoute');
const zoneRoutes = require('./routes/ZonesRoute');
const UserRoutes = require("./routes/UserRoute");
const User = require('./models/User');
// Use routes with prefixes to avoid conflicts
app.use('/api/coordinates', coordRoutes);
app.use('/api', zoneRoutes);
app.use('/api', UserRoutes);

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (user.password == password) {
        return res.status(200).json({ data:user });
    }
    
    return res.status(401).json({ message: 'Invalid email or password' });
      
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});