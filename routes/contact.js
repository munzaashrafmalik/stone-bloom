import express from 'express';
import Contact from '../models/Contact.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      userId: req.user?._id
    });

    await contact.save();

    res.status(201).json({
      message: 'Your message has been sent successfully. We will get back to you soon!',
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

// Get all contact messages (admin only)
router.get('/admin', protect, admin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contact messages' });
  }
});

// Get single contact message (admin only)
router.get('/admin/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Failed to fetch contact message' });
  }
});

// Update contact status (admin only)
router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    if (status) {
      contact.status = status;
      if (status === 'resolved' || status === 'closed') {
        contact.resolvedAt = new Date();
      }
    }

    if (adminNotes !== undefined) {
      contact.adminNotes = adminNotes;
    }

    await contact.save();

    res.json({
      message: 'Contact message updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Failed to update contact message' });
  }
});

// Delete contact message (admin only)
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await contact.deleteOne();

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact message' });
  }
});

// Get user's own contact messages (authenticated users)
router.get('/my-messages', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    console.error('Get user contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch your messages' });
  }
});

export default router;
