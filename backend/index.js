// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const cors = require('cors')


// Initialize Express app

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect("mongodb+srv://admin:sachu@cluster0.ur9rn4z.mongodb.net/notelify");
const db = mongoose.connection;

// Define MongoDB schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    notes: [{ title: String, description: String }]
});
const User = mongoose.model('User', userSchema);

// Define JWT secret
const JWT_SECRET = "secret";
// Define input validation schemas using Zod
const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
});

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});

const noteSchema = zod.object({
    title: zod.string(),
    description: zod.string()
});

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Routes for user signup, login, and notes CRUD operations
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = signupSchema.parse(req.body);

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists.' });

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        // Generate and return JWT token
        const token = jwt.sign({ _id: newUser._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email not found.' });

        if (user.password !== password) return res.status(400).json({ message: 'Invalid password.' });


        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.errors[0].message });
    }
});

app.get('/notes', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user.notes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});
app.post('/notes', verifyToken, async (req, res) => {
  try {
    noteSchema.parse(req.body)
      const { _id, title, description } = req.body;

      if (!title || !description) return res.status(400).json({ message: 'Title and description are required.' });

      const user = await User.findById(req.user._id);
      if (_id) {
          const existingNoteIndex = user.notes.findIndex(note => note._id == _id);
          if (existingNoteIndex !== -1) {
              user.notes[existingNoteIndex].title = title;
              user.notes[existingNoteIndex].description = description;
          } else {
              return res.status(404).json({ message: 'Note not found.' });
          }
      } else {
          user.notes.push({ title, description });
      }

      await user.save();
      res.json({ message: _id ? 'Note edited successfully.' : 'Note added successfully.' });

  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});




app.delete('/notes', verifyToken, async (req, res) => {
  try {
      const { _id } = req.body;
      const user = await User.findById(req.user._id);

      user.notes = user.notes.filter((note) => {
          if (note._id.toString() !== _id.toString()) {
              return true;
          } else {
              return false;
          }
      });

      await user.save();

      res.json({ message: 'Note deleted successfully.' });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
