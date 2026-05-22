require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models and Middleware
const User = require('./models/User');
const Inquiry = require('./models/Inquiry');
const verifyToken = require('./middleware/auth'); // Our new bouncer!

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Successfully connected to MongoDB!'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, message: 'Successfully logged in!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

// --- PROTECTED ROUTES (Using our bouncer) ---
app.get('/api/user-data', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json({ success: true, email: user.email, accountCreated: user._id.getTimestamp() });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data.' });
    }
});

// 1. Create a new Inquiry
app.post('/api/inquiries', verifyToken, async (req, res) => {
    try {
        const { customerName, customerEmail, message } = req.body;

        const newInquiry = new Inquiry({
            userId: req.user.userId, // Pulled safely from the verified token
            customerName,
            customerEmail,
            message
        });

        await newInquiry.save();
        res.status(201).json({ success: true, inquiry: newInquiry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create inquiry.' });
    }
});

// 2. Get all Inquiries for the logged-in user
app.get('/api/inquiries', verifyToken, async (req, res) => {
    try {
        // This ensures User A can't see User B's inquiries!
        const inquiries = await Inquiry.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json({ success: true, inquiries });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch inquiries.' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server is running live on port ${PORT}`));
// 3. UPDATE an Inquiry (Change status)
app.put('/api/inquiries/:id', verifyToken, async (req, res) => {
    try {
        // We search by ID *and* userId to ensure a hacker can't update someone else's inquiry
        const updatedInquiry = await Inquiry.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { status: req.body.status },
            { new: true } // Returns the newly updated document
        );

        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found.' });
        res.json({ success: true, inquiry: updatedInquiry });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update inquiry.' });
    }
});

// 4. DELETE an Inquiry
app.delete('/api/inquiries/:id', verifyToken, async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deletedInquiry) return res.status(404).json({ message: 'Inquiry not found.' });
        res.json({ success: true, message: 'Inquiry permanently deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete inquiry.' });
    }
});