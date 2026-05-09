import express from 'express';
import FAQ from '../models/FAQ.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get all published FAQs (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    const query = { isPublished: true };
    if (category) {
      query.category = category;
    }

    const faqs = await FAQ.find(query).sort({ order: 1, createdAt: -1 });

    // Group by category
    const groupedFaqs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.json({
      faqs,
      grouped: groupedFaqs,
      categories: ['shipping', 'returns', 'payment', 'products', 'account', 'general']
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({ message: 'Failed to fetch FAQs' });
  }
});

// Get single FAQ (public)
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq || !faq.isPublished) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    // Increment view count
    faq.views += 1;
    await faq.save();

    res.json(faq);
  } catch (error) {
    console.error('Get FAQ error:', error);
    res.status(500).json({ message: 'Failed to fetch FAQ' });
  }
});

// Mark FAQ as helpful/not helpful (public)
router.post('/:id/feedback', async (req, res) => {
  try {
    const { helpful } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    if (helpful === true) {
      faq.helpful += 1;
    } else if (helpful === false) {
      faq.notHelpful += 1;
    }

    await faq.save();

    res.json({
      message: 'Thank you for your feedback!',
      helpful: faq.helpful,
      notHelpful: faq.notHelpful
    });
  } catch (error) {
    console.error('FAQ feedback error:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

// Get all FAQs including unpublished (admin only)
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    console.error('Get all FAQs error:', error);
    res.status(500).json({ message: 'Failed to fetch FAQs' });
  }
});

// Create new FAQ (admin only)
router.post('/admin', protect, admin, async (req, res) => {
  try {
    const { question, answer, category, order, isPublished } = req.body;

    if (!question || !answer || !category) {
      return res.status(400).json({ message: 'Question, answer, and category are required' });
    }

    const faq = new FAQ({
      question,
      answer,
      category,
      order,
      isPublished
    });

    await faq.save();

    res.status(201).json({
      message: 'FAQ created successfully',
      faq
    });
  } catch (error) {
    console.error('Create FAQ error:', error);
    res.status(500).json({ message: 'Failed to create FAQ' });
  }
});

// Update FAQ (admin only)
router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const { question, answer, category, order, isPublished } = req.body;

    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    if (question) faq.question = question;
    if (answer) faq.answer = answer;
    if (category) faq.category = category;
    if (order !== undefined) faq.order = order;
    if (isPublished !== undefined) faq.isPublished = isPublished;

    await faq.save();

    res.json({
      message: 'FAQ updated successfully',
      faq
    });
  } catch (error) {
    console.error('Update FAQ error:', error);
    res.status(500).json({ message: 'Failed to update FAQ' });
  }
});

// Delete FAQ (admin only)
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.deleteOne();

    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    res.status(500).json({ message: 'Failed to delete FAQ' });
  }
});

export default router;
