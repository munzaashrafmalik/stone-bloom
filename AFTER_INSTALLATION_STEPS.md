# 🎯 MongoDB Installation Ke Baad - Next Steps

## ✅ Prerequisites Check:
- MongoDB installed hai
- `mongod --version` kaam kar raha hai
- MongoDB service running hai

---

## Step 1: Update .env File

Backend folder mein `.env` file ko update karo:

### Before (Atlas):
```env
MONGODB_URI=mongodb+srv://munza_db_user:malik@stone-bloom-cluster.wdygown.mongodb.net/pakistani_store?retryWrites=true&w=majority&appName=stone-bloom-cluster
```

### After (Local):
```env
MONGODB_URI=mongodb://localhost:27017/pakistani_store
```

**Complete .env file:**
```env
MONGODB_URI=mongodb://localhost:27017/pakistani_store
JWT_SECRET=pakistani_store_secret_key_2026
NODE_ENV=development
```

---

## Step 2: Test MongoDB Connection

Terminal mein run karo:

```bash
cd C:\Users\DELL\pakistani-store\backend
node testMongoConnection.js
```

**Expected Output:**
```
🔍 Testing MongoDB Connection...

Connection String: mongodb://localhost:27017/pakistani_store

⏳ Attempting to connect...

✅ SUCCESS! MongoDB Connected
📊 Connection Details:
   - Host: localhost
   - Database: pakistani_store
   - Ready State: 1

✅ Connection closed successfully
```

Agar yeh output aaye to **PERFECT!** Connection successful hai!

---

## Step 3: Seed Database (Populate Data)

Ab database mein FAQs aur Pages ka data dalo:

```bash
node seedCustomerService.js
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing FAQs and Pages
✅ Inserted 15 FAQs
✅ Inserted 5 Pages
🌱 Seeding completed successfully!
```

**Yeh data add hoga:**
- 15 FAQs (6 categories mein)
- 5 Pages (About Us, Privacy Policy, Terms, Shipping, Returns)

---

## Step 4: Start Server

Ab server start karo:

```bash
npm run dev
```

**Expected Output:**
```
✅ Connected to MongoDB
🚀 Server running on port 5000
📦 Environment: development
```

Server ab running hai on: http://localhost:5000

---

## Step 5: Test APIs

### Option A: Test Script Run Karo
```bash
# New terminal window open karo
cd C:\Users\DELL\pakistani-store\backend
node testCustomerService.js
```

**Expected Output:**
```
🚀 Starting Customer Service API Tests...

📧 Testing Contact Form...
Submit Contact: ✅ PASS Thank you for your message...

📰 Testing Newsletter...
Subscribe: ✅ PASS Thank you for subscribing...
Duplicate Check: ✅ PASS This email is already subscribed
Unsubscribe: ✅ PASS You have been successfully unsubscribed

❓ Testing FAQs...
Get All FAQs: ✅ PASS Found 15 FAQs
Get by Category: ✅ PASS Found 3 shipping FAQs
Get Single FAQ: ✅ PASS
Submit Feedback: ✅ PASS

📄 Testing Pages...
Get All Pages: ✅ PASS Found 5 pages
Get About Us: ✅ PASS
Get Privacy Policy: ✅ PASS
Get Terms: ✅ PASS

✅ All tests completed!
```

### Option B: Browser Mein Test Karo

Browser open karo aur yeh URLs try karo:

```
http://localhost:5000/api/health
http://localhost:5000/api/faq
http://localhost:5000/api/pages
http://localhost:5000/api/pages/about-us
```

### Option C: Postman Use Karo

1. Postman open karo
2. Import karo: `postman_collection.json`
3. Variable set karo: `baseUrl = http://localhost:5000/api`
4. Endpoints test karo

---

## 🎉 Success Indicators:

Agar yeh sab kaam kar raha hai to **COMPLETE SUCCESS!**

✅ MongoDB connected
✅ Database seeded (15 FAQs + 5 Pages)
✅ Server running on port 5000
✅ All 24 endpoints working
✅ Contact form working
✅ Newsletter working
✅ FAQs working
✅ Pages working

---

## 📊 Available Endpoints Summary:

### Public Endpoints (No Auth Required):
```
GET    /api/faq                    - All FAQs
GET    /api/faq/:id                - Single FAQ
POST   /api/faq/:id/feedback       - FAQ feedback
GET    /api/pages                  - All pages
GET    /api/pages/:slug            - Single page
POST   /api/contact                - Submit contact form
POST   /api/newsletter/subscribe   - Subscribe
POST   /api/newsletter/unsubscribe - Unsubscribe
```

### Admin Endpoints (Auth Required):
```
GET    /api/contact/admin          - All contacts
GET    /api/faq/admin/all          - All FAQs
GET    /api/pages/admin/all        - All pages
GET    /api/newsletter/admin/subscribers - All subscribers
... and more CRUD operations
```

---

## 🔧 Troubleshooting:

### Issue: Connection test fail
```bash
# Check MongoDB service
sc query MongoDB

# Start service if stopped
net start MongoDB
```

### Issue: Port 5000 already in use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process_id> /F
```

### Issue: Seeder error
```bash
# Make sure MongoDB is running
sc query MongoDB

# Make sure .env file is updated
cat .env
```

---

## 📞 Mujhe Batao:

Installation complete hone ke baad batao:

1. ✅ MongoDB install ho gaya?
2. ✅ Connection test successful?
3. ✅ Database seed successful?
4. ✅ Server start ho gaya?
5. ✅ APIs test successful?

Har step ke baad update do, main help karunga agar koi issue aaye!
