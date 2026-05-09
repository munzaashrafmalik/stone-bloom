# MongoDB Connection Troubleshooting Guide

## ❌ Current Issue
DNS lookup fail ho raha hai MongoDB Atlas cluster ke liye.

## 🔍 Possible Reasons

1. **Internet Connection Issue**
   - Aapka internet connection slow ya unstable ho sakta hai
   - VPN use kar rahe hain to try without VPN

2. **MongoDB Atlas Cluster Paused/Deleted**
   - Atlas dashboard check karein
   - Cluster active hai ya nahi

3. **Firewall/Network Restrictions**
   - Office/university network MongoDB Atlas ko block kar sakta hai
   - Try different network (mobile hotspot)

4. **Wrong Cluster Name**
   - Cluster name "stone-bloom-cluster" sahi hai?

## ✅ Solutions

### Option 1: MongoDB Atlas Fix Karein

1. **MongoDB Atlas Dashboard pe jao:**
   - https://cloud.mongodb.com/
   - Login karein

2. **Cluster Check karein:**
   - Cluster running hai?
   - Paused to nahi?
   - Resume karein agar paused hai

3. **Network Access Check karein:**
   - Left sidebar mein "Network Access" pe click karein
   - "Add IP Address" pe click karein
   - "Allow Access from Anywhere" select karein (0.0.0.0/0)
   - Save karein

4. **Database User Check karein:**
   - Left sidebar mein "Database Access" pe click karein
   - User "munza_db_user" exist karta hai?
   - Password "malik" sahi hai?
   - Agar nahi to new user banao

5. **New Connection String Copy karein:**
   - Cluster pe "Connect" button pe click karein
   - "Connect your application" select karein
   - Driver: Node.js, Version: 5.5 or later
   - Connection string copy karein
   - `.env` file mein paste karein

### Option 2: Local MongoDB Use Karein (Testing ke liye)

Agar Atlas kaam nahi kar raha, to local MongoDB install karein:

```bash
# MongoDB Community Edition download karein
# https://www.mongodb.com/try/download/community

# Install karne ke baad:
mongod --version

# Local connection string use karein:
MONGODB_URI=mongodb://localhost:27017/pakistani_store
```

### Option 3: MongoDB Atlas Free Cluster Banao (Naya)

1. https://www.mongodb.com/cloud/atlas/register pe jao
2. Free account banao
3. "Build a Database" pe click karein
4. FREE tier select karein (M0)
5. Cloud Provider: AWS
6. Region: Closest to Pakistan (Mumbai ya Singapore)
7. Cluster Name: pakistani-store
8. Create Cluster
9. Database User banao (username/password)
10. Network Access: 0.0.0.0/0 allow karein
11. Connection string copy karein

## 🧪 Test Connection

Connection string update karne ke baad test karein:

```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_MONGODB_URI').then(() => console.log('✅ Connected!')).catch(err => console.log('❌ Error:', err.message));"
```

## 📞 Need Help?

Agar abhi bhi issue hai to:
1. MongoDB Atlas dashboard ka screenshot share karein
2. Ya batao ke local MongoDB install karna hai
3. Ya koi aur free MongoDB service use kar sakte hain (MongoDB Atlas alternative)
