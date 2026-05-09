import express from 'express';
import Newsletter from '../models/Newsletter.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name, source } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(400).json({ message: 'This email is already subscribed to our newsletter' });
      } else {
        // Reactivate subscription
        subscriber.isActive = true;
        subscriber.subscribedAt = new Date();
        subscriber.unsubscribedAt = null;
        if (name) subscriber.name = name;
        if (source) subscriber.source = source;
        await subscriber.save();

        return res.json({
          message: 'Welcome back! Your subscription has been reactivated.',
          subscriber: {
            email: subscriber.email,
            name: subscriber.name
          }
        });
      }
    }

    // Create new subscription
    subscriber = new Newsletter({
      email,
      name,
      source: source || 'footer'
    });

    await subscriber.save();

    res.status(201).json({
      message: 'Thank you for subscribing! You will receive our latest updates and offers.',
      subscriber: {
        email: subscriber.email,
        name: subscriber.name
      }
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }
    res.status(500).json({ message: 'Failed to subscribe. Please try again.' });
  }
});

// Unsubscribe from newsletter (public)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ message: 'Email not found in our newsletter list' });
    }

    if (!subscriber.isActive) {
      return res.status(400).json({ message: 'This email is already unsubscribed' });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      message: 'You have been successfully unsubscribed from our newsletter.'
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ message: 'Failed to unsubscribe. Please try again.' });
  }
});

// Get all subscribers (admin only)
router.get('/admin/subscribers', protect, admin, async (req, res) => {
  try {
    const { isActive, page = 1, limit = 50 } = req.query;

    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};

    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Newsletter.countDocuments(query);

    res.json({
      subscribers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
      active: await Newsletter.countDocuments({ isActive: true }),
      inactive: await Newsletter.countDocuments({ isActive: false })
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
});

// Delete subscriber (admin only)
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    await subscriber.deleteOne();

    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ message: 'Failed to delete subscriber' });
  }
});

// Export subscribers (admin only)
router.get('/admin/export', protect, admin, async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};

    const subscribers = await Newsletter.find(query)
      .select('email name isActive subscribedAt source')
      .sort({ subscribedAt: -1 });

    res.json({
      subscribers,
      count: subscribers.length,
      exportedAt: new Date()
    });
  } catch (error) {
    console.error('Export subscribers error:', error);
    res.status(500).json({ message: 'Failed to export subscribers' });
  }
});

export default router;
