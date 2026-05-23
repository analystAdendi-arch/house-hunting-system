const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all messages for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }]
    })
    .populate('senderId', 'firstName lastName profileImage')
    .populate('receiverId', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get conversation with specific user
router.get('/conversation/:userId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.userId, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.userId }
      ]
    })
    .populate('senderId', 'firstName lastName profileImage')
    .populate('receiverId', 'firstName lastName profileImage')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { receiverId, message, propertyId } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({ error: 'Receiver and message are required' });
    }

    const newMessage = new Message({
      senderId: req.userId,
      receiverId,
      message,
      propertyId
    });

    await newMessage.save();
    await newMessage.populate('senderId', 'firstName lastName profileImage');
    await newMessage.populate('receiverId', 'firstName lastName profileImage');

    res.status(201).json({ message: 'Message sent', data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark message as read
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
