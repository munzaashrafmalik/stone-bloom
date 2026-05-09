# Customer Service & Quick Links API Documentation

## 📋 Overview
All customer service and quick links functionality has been implemented with the following features:

---

## 🔗 Quick Links (Pages)

### Public Endpoints

#### Get All Published Pages
```
GET /api/pages
```
Returns all published pages (About Us, Privacy Policy, Terms, etc.)

#### Get Single Page by Slug
```
GET /api/pages/:slug
```
Example: `/api/pages/about-us`, `/api/pages/privacy-policy`

### Admin Endpoints (Requires Authentication)

#### Get All Pages (Including Unpublished)
```
GET /api/pages/admin/all
Headers: Authorization: Bearer <token>
```

#### Create New Page
```
POST /api/pages/admin
Headers: Authorization: Bearer <token>
Body: {
  "title": "Page Title",
  "slug": "page-slug",
  "content": "Page content in markdown",
  "metaDescription": "SEO description",
  "isPublished": true,
  "order": 1
}
```

#### Update Page
```
PUT /api/pages/admin/:id
Headers: Authorization: Bearer <token>
Body: { fields to update }
```

#### Delete Page
```
DELETE /api/pages/admin/:id
Headers: Authorization: Bearer <token>
```

---

## ❓ FAQs

### Public Endpoints

#### Get All Published FAQs
```
GET /api/faq
Query params: ?category=shipping (optional)
```
Categories: shipping, returns, payment, products, account, general

#### Get Single FAQ
```
GET /api/faq/:id
```
Automatically increments view count

#### Submit FAQ Feedback
```
POST /api/faq/:id/feedback
Body: {
  "helpful": true  // or false
}
```

### Admin Endpoints

#### Get All FAQs
```
GET /api/faq/admin/all
Headers: Authorization: Bearer <token>
```

#### Create FAQ
```
POST /api/faq/admin
Headers: Authorization: Bearer <token>
Body: {
  "question": "Question text",
  "answer": "Answer text",
  "category": "shipping",
  "order": 1,
  "isPublished": true
}
```

#### Update FAQ
```
PUT /api/faq/admin/:id
Headers: Authorization: Bearer <token>
Body: { fields to update }
```

#### Delete FAQ
```
DELETE /api/faq/admin/:id
Headers: Authorization: Bearer <token>
```

---

## 📧 Contact Form

### Public Endpoints

#### Submit Contact Form
```
POST /api/contact
Body: {
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "03001234567" (optional),
  "subject": "Subject",
  "message": "Message text"
}
```

#### Get User's Own Messages (Authenticated)
```
GET /api/contact/my-messages
Headers: Authorization: Bearer <token>
```

### Admin Endpoints

#### Get All Contact Messages
```
GET /api/contact/admin
Headers: Authorization: Bearer <token>
Query params: ?status=new&page=1&limit=20
```
Status options: new, in-progress, resolved, closed

#### Get Single Contact Message
```
GET /api/contact/admin/:id
Headers: Authorization: Bearer <token>
```

#### Update Contact Status
```
PUT /api/contact/admin/:id
Headers: Authorization: Bearer <token>
Body: {
  "status": "resolved",
  "adminNotes": "Notes about resolution"
}
```

#### Delete Contact Message
```
DELETE /api/contact/admin/:id
Headers: Authorization: Bearer <token>
```

---

## 📰 Newsletter

### Public Endpoints

#### Subscribe to Newsletter
```
POST /api/newsletter/subscribe
Body: {
  "email": "user@email.com",
  "name": "User Name" (optional),
  "source": "footer" (optional: footer, checkout, popup, manual)
}
```

#### Unsubscribe from Newsletter
```
POST /api/newsletter/unsubscribe
Body: {
  "email": "user@email.com"
}
```

### Admin Endpoints

#### Get All Subscribers
```
GET /api/newsletter/admin/subscribers
Headers: Authorization: Bearer <token>
Query params: ?isActive=true&page=1&limit=50
```

#### Export Subscribers
```
GET /api/newsletter/admin/export
Headers: Authorization: Bearer <token>
Query params: ?isActive=true
```

#### Delete Subscriber
```
DELETE /api/newsletter/admin/:id
Headers: Authorization: Bearer <token>
```

---

## 📦 Models Created

1. **Contact** - Stores customer inquiries with status tracking
2. **FAQ** - Frequently asked questions with categories and analytics
3. **Page** - Static pages (About, Privacy, Terms, etc.)
4. **Newsletter** - Email subscription management

---

## 🌱 Seeding Data

To populate initial FAQs and Pages, run:
```bash
node seedCustomerService.js
```

This will create:
- 15 FAQs across 6 categories
- 5 pages (About Us, Privacy Policy, Terms & Conditions, Shipping Policy, Return Policy)

---

## ✅ Features Implemented

### Contact Form
- ✅ Public submission
- ✅ Status tracking (new, in-progress, resolved, closed)
- ✅ Admin management
- ✅ User can view their own messages
- ✅ Admin notes

### FAQs
- ✅ Category-based organization
- ✅ View count tracking
- ✅ Helpful/Not helpful feedback
- ✅ Admin CRUD operations
- ✅ Order management

### Pages
- ✅ Slug-based routing
- ✅ Markdown content support
- ✅ SEO meta descriptions
- ✅ Publish/unpublish
- ✅ Order management

### Newsletter
- ✅ Subscribe/unsubscribe
- ✅ Duplicate prevention
- ✅ Reactivation support
- ✅ Source tracking
- ✅ Admin management
- ✅ Export functionality

---

## 🔐 Authentication

Admin endpoints require:
```
Headers: {
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

User must have `isAdmin: true` in their profile.

---

## 🚀 Next Steps

1. Ensure MongoDB connection is working
2. Run the seeder: `node seedCustomerService.js`
3. Test endpoints using Postman or similar tool
4. Integrate with frontend
