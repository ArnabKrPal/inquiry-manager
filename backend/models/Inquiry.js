const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    // This securely links the inquiry to the specific person who logged in!
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'New' }, // e.g., New, In Progress, Resolved
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);