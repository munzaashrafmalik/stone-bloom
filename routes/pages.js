import express from 'express';
import Page from '../models/Page.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Get all published pages (public)
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({ isPublished: true })
      .select('title slug metaDescription order')
      .sort({ order: 1 });

    res.json(pages);
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ message: 'Failed to fetch pages' });
  }
});

// Get single page by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ message: 'Failed to fetch page' });
  }
});

// Get all pages including unpublished (admin only)
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const pages = await Page.find().sort({ order: 1 });
    res.json(pages);
  } catch (error) {
    console.error('Get all pages error:', error);
    res.status(500).json({ message: 'Failed to fetch pages' });
  }
});

// Create new page (admin only)
router.post('/admin', protect, admin, async (req, res) => {
  try {
    const { title, slug, content, metaDescription, isPublished, order } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: 'Title, slug, and content are required' });
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ message: 'A page with this slug already exists' });
    }

    const page = new Page({
      title,
      slug,
      content,
      metaDescription,
      isPublished,
      order
    });

    await page.save();

    res.status(201).json({
      message: 'Page created successfully',
      page
    });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ message: 'Failed to create page' });
  }
});

// Update page (admin only)
router.put('/admin/:id', protect, admin, async (req, res) => {
  try {
    const { title, slug, content, metaDescription, isPublished, order } = req.body;

    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // Check if new slug conflicts with another page
    if (slug && slug !== page.slug) {
      const existingPage = await Page.findOne({ slug });
      if (existingPage) {
        return res.status(400).json({ message: 'A page with this slug already exists' });
      }
    }

    if (title) page.title = title;
    if (slug) page.slug = slug;
    if (content) page.content = content;
    if (metaDescription !== undefined) page.metaDescription = metaDescription;
    if (isPublished !== undefined) page.isPublished = isPublished;
    if (order !== undefined) page.order = order;

    await page.save();

    res.json({
      message: 'Page updated successfully',
      page
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ message: 'Failed to update page' });
  }
});

// Delete page (admin only)
router.delete('/admin/:id', protect, admin, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    await page.deleteOne();

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ message: 'Failed to delete page' });
  }
});

export default router;
