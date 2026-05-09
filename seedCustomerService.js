import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FAQ from './models/FAQ.js';
import Page from './models/Page.js';

dotenv.config();

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping within Pakistan takes 3-5 business days. Express shipping is available for 1-2 business days delivery. International shipping takes 7-14 business days depending on the destination.',
    category: 'shipping',
    order: 1,
    isPublished: true
  },
  {
    question: 'What are the shipping charges?',
    answer: 'Shipping is FREE for orders above Rs. 2,500. For orders below Rs. 2,500, standard shipping costs Rs. 150 and express shipping costs Rs. 300.',
    category: 'shipping',
    order: 2,
    isPublished: true
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates vary by destination and are calculated at checkout. Customs duties and taxes may apply based on your country\'s regulations.',
    category: 'shipping',
    order: 3,
    isPublished: true
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unused items in original packaging. To initiate a return, contact our customer service with your order number. Refunds are processed within 5-7 business days after we receive the returned item.',
    category: 'returns',
    order: 1,
    isPublished: true
  },
  {
    question: 'Can I exchange an item?',
    answer: 'Yes, exchanges are available for size or color variations within 7 days of delivery. The item must be unused and in original condition. Contact us to arrange an exchange.',
    category: 'returns',
    order: 2,
    isPublished: true
  },
  {
    question: 'Who pays for return shipping?',
    answer: 'For defective or incorrect items, we cover return shipping costs. For other returns or exchanges, the customer is responsible for return shipping charges.',
    category: 'returns',
    order: 3,
    isPublished: true
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD), credit/debit cards (Visa, Mastercard), JazzCash, EasyPaisa, and bank transfers. All online payments are processed securely.',
    category: 'payment',
    order: 1,
    isPublished: true
  },
  {
    question: 'Is Cash on Delivery available?',
    answer: 'Yes, COD is available for orders within Pakistan. A small COD fee of Rs. 50 may apply for orders below Rs. 1,500.',
    category: 'payment',
    order: 2,
    isPublished: true
  },
  {
    question: 'Are my payment details secure?',
    answer: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. We do not store your credit card details on our servers.',
    category: 'payment',
    order: 3,
    isPublished: true
  },
  {
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors and manufacturers. We guarantee the quality and authenticity of every item.',
    category: 'products',
    order: 1,
    isPublished: true
  },
  {
    question: 'Do you offer product warranties?',
    answer: 'Yes, most of our products come with manufacturer warranties. Warranty periods vary by product and are mentioned in the product description. Keep your invoice for warranty claims.',
    category: 'products',
    order: 2,
    isPublished: true
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes! Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order status in the "My Orders" section of your account.',
    category: 'account',
    order: 1,
    isPublished: true
  },
  {
    question: 'How do I create an account?',
    answer: 'Click on "Sign Up" at the top of the page and fill in your details. You can also create an account during checkout. Having an account allows you to track orders, save addresses, and get exclusive offers.',
    category: 'account',
    order: 2,
    isPublished: true
  },
  {
    question: 'I forgot my password. What should I do?',
    answer: 'Click on "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email. Follow the instructions to create a new password.',
    category: 'account',
    order: 3,
    isPublished: true
  },
  {
    question: 'How can I contact customer service?',
    answer: 'You can reach us through our Contact Us page, email us at support@pakistanistore.com, call us at +92-XXX-XXXXXXX, or chat with us during business hours (9 AM - 6 PM, Monday to Saturday).',
    category: 'general',
    order: 1,
    isPublished: true
  }
];

const pages = [
  {
    title: 'About Us',
    slug: 'about-us',
    content: `# About Pakistani Store

Welcome to Pakistani Store, your premier destination for authentic Pakistani products and traditional crafts.

## Our Story

Founded in 2024, Pakistani Store was born from a passion to bring the rich cultural heritage of Pakistan to customers worldwide. We specialize in curating the finest selection of traditional Pakistani clothing, handicrafts, and authentic products.

## Our Mission

Our mission is to preserve and promote Pakistani culture by offering high-quality, authentic products while supporting local artisans and manufacturers. We believe in fair trade practices and sustainable business models that benefit both our customers and the communities we work with.

## What We Offer

- **Authentic Products**: 100% genuine Pakistani products sourced directly from trusted manufacturers
- **Quality Assurance**: Every item is carefully inspected to meet our high standards
- **Cultural Heritage**: Products that celebrate Pakistan's rich traditions and craftsmanship
- **Customer Service**: Dedicated support team to assist you with any queries

## Our Values

- **Authenticity**: We guarantee genuine products
- **Quality**: Excellence in every item we sell
- **Trust**: Building lasting relationships with our customers
- **Community**: Supporting local artisans and businesses

Thank you for choosing Pakistani Store. We're honored to be part of your journey in discovering and celebrating Pakistani culture.`,
    metaDescription: 'Learn about Pakistani Store - your trusted source for authentic Pakistani products, traditional crafts, and cultural items.',
    isPublished: true,
    order: 1
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `# Privacy Policy

**Last Updated: May 9, 2026**

## Introduction

Pakistani Store ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

## Information We Collect

### Personal Information
- Name, email address, phone number
- Shipping and billing addresses
- Payment information (processed securely through third-party providers)

### Automatically Collected Information
- IP address, browser type, device information
- Cookies and usage data
- Pages visited and time spent on our site

## How We Use Your Information

We use your information to:
- Process and fulfill your orders
- Send order confirmations and shipping updates
- Respond to customer service requests
- Send marketing communications (with your consent)
- Improve our website and services
- Prevent fraud and enhance security

## Information Sharing

We do not sell your personal information. We may share your information with:
- Service providers (shipping, payment processing)
- Legal authorities when required by law
- Business partners with your consent

## Data Security

We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of marketing communications
- Withdraw consent at any time

## Cookies

We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.

## Contact Us

For privacy-related questions, contact us at:
- Email: privacy@pakistanistore.com
- Phone: +92-XXX-XXXXXXX`,
    metaDescription: 'Read our Privacy Policy to understand how Pakistani Store collects, uses, and protects your personal information.',
    isPublished: true,
    order: 2
  },
  {
    title: 'Terms & Conditions',
    slug: 'terms-conditions',
    content: `# Terms & Conditions

**Last Updated: May 9, 2026**

## Agreement to Terms

By accessing and using Pakistani Store, you agree to be bound by these Terms and Conditions.

## Use of Website

### Eligibility
You must be at least 18 years old to make purchases on our website.

### Account Responsibilities
- Maintain the confidentiality of your account
- Provide accurate and complete information
- Notify us immediately of any unauthorized use

## Products and Pricing

- All prices are in Pakistani Rupees (PKR) unless otherwise stated
- We reserve the right to modify prices without notice
- Product images are for illustration purposes; actual products may vary slightly
- We strive to display accurate colors, but variations may occur

## Orders and Payment

### Order Acceptance
We reserve the right to refuse or cancel any order for any reason.

### Payment
- Payment must be received before order processing
- We accept multiple payment methods as listed on our website
- All transactions are processed securely

## Shipping and Delivery

- Shipping times are estimates and not guaranteed
- Risk of loss passes to you upon delivery
- We are not responsible for delays caused by shipping carriers

## Returns and Refunds

- Returns must be initiated within 7 days of delivery
- Items must be unused and in original packaging
- Refunds are processed within 5-7 business days
- Shipping charges are non-refundable

## Intellectual Property

All content on this website is owned by Pakistani Store and protected by copyright laws.

## Limitation of Liability

Pakistani Store shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.

## Governing Law

These terms are governed by the laws of Pakistan.

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of modified terms.

## Contact Information

For questions about these terms:
- Email: legal@pakistanistore.com
- Phone: +92-XXX-XXXXXXX`,
    metaDescription: 'Read the Terms & Conditions for using Pakistani Store website and purchasing our products.',
    isPublished: true,
    order: 3
  },
  {
    title: 'Shipping Policy',
    slug: 'shipping-policy',
    content: `# Shipping Policy

## Shipping Methods

### Within Pakistan
- **Standard Shipping**: 3-5 business days (FREE for orders above Rs. 2,500)
- **Express Shipping**: 1-2 business days (Rs. 300)

### International Shipping
- Available to most countries worldwide
- Delivery time: 7-14 business days
- Rates calculated at checkout based on destination

## Shipping Charges

- Orders above Rs. 2,500: FREE standard shipping
- Orders below Rs. 2,500: Rs. 150 standard shipping
- Express shipping: Rs. 300 (regardless of order value)

## Order Processing

- Orders are processed within 1-2 business days
- You will receive a confirmation email once your order is shipped
- Tracking information will be provided via email and SMS

## Delivery

- Signature may be required upon delivery
- Please ensure someone is available to receive the package
- If delivery fails, the courier will attempt redelivery or hold at the nearest facility

## International Orders

- Customs duties and taxes may apply
- Customer is responsible for any customs fees
- Delivery times may vary based on customs clearance

## Shipping Restrictions

We currently do not ship to:
- P.O. Boxes for certain items
- Military addresses (APO/FPO)
- Certain remote areas (additional charges may apply)

## Lost or Damaged Packages

- Contact us immediately if your package is lost or damaged
- We will work with the shipping carrier to resolve the issue
- Replacement or refund will be provided as appropriate

## Contact Us

For shipping inquiries:
- Email: shipping@pakistanistore.com
- Phone: +92-XXX-XXXXXXX`,
    metaDescription: 'Learn about Pakistani Store shipping policy, delivery times, and shipping charges.',
    isPublished: true,
    order: 4
  },
  {
    title: 'Return & Refund Policy',
    slug: 'return-refund-policy',
    content: `# Return & Refund Policy

## Return Eligibility

You may return items within **7 days** of delivery if:
- Item is unused and in original condition
- Original packaging and tags are intact
- You have the original invoice/receipt

## Non-Returnable Items

The following items cannot be returned:
- Intimate apparel and undergarments
- Customized or personalized items
- Sale or clearance items (unless defective)
- Gift cards

## Return Process

1. **Contact Us**: Email returns@pakistanistore.com with your order number
2. **Approval**: Wait for return authorization and instructions
3. **Ship Back**: Send the item using a trackable shipping method
4. **Inspection**: We inspect the returned item (2-3 business days)
5. **Refund**: Refund processed within 5-7 business days

## Return Shipping

- **Defective/Wrong Items**: We cover return shipping costs
- **Other Returns**: Customer pays return shipping
- Use a trackable shipping method
- We recommend insurance for high-value items

## Refund Method

- Refunds are issued to the original payment method
- COD orders: Refund via bank transfer (provide account details)
- Processing time: 5-7 business days after receiving the return

## Exchanges

- Exchanges available for size/color variations
- Subject to availability
- Contact us to arrange an exchange
- Same return eligibility criteria apply

## Damaged or Defective Items

If you receive a damaged or defective item:
1. Contact us within 48 hours of delivery
2. Provide photos of the damage/defect
3. We will arrange a replacement or full refund
4. Return shipping covered by us

## Late or Missing Refunds

If you haven't received your refund:
1. Check your bank account again
2. Contact your credit card company (processing may take time)
3. Contact your bank
4. If still not received, contact us at refunds@pakistanistore.com

## Partial Refunds

Partial refunds may be granted for:
- Items not in original condition
- Items damaged due to customer handling
- Items missing parts not due to our error

## Contact Us

For return and refund inquiries:
- Email: returns@pakistanistore.com
- Phone: +92-XXX-XXXXXXX
- Hours: 9 AM - 6 PM, Monday to Saturday`,
    metaDescription: 'Read Pakistani Store return and refund policy. Learn about our 7-day return policy and refund process.',
    isPublished: true,
    order: 5
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await FAQ.deleteMany({});
    await Page.deleteMany({});
    console.log('🗑️  Cleared existing FAQs and Pages');

    // Insert FAQs
    await FAQ.insertMany(faqs);
    console.log(`✅ Inserted ${faqs.length} FAQs`);

    // Insert Pages
    await Page.insertMany(pages);
    console.log(`✅ Inserted ${pages.length} Pages`);

    console.log('🌱 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
