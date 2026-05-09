# MongoDB Atlas - Step by Step Guide (Urdu)

## 🔐 Step 1: MongoDB Atlas Login

1. Browser mein jao: https://cloud.mongodb.com/
2. Apne credentials se login karein

## 🔍 Step 2: Cluster Check Karein

### Cluster Status Dekhein:
- Dashboard pe "Database" section mein jao
- Apna cluster "stone-bloom-cluster" dhundo
- Status check karein:
  - ✅ **RUNNING** - Good, cluster active hai
  - ⏸️ **PAUSED** - Resume button pe click karein
  - ❌ **DELETED** - Naya cluster banana padega

### Agar Cluster Paused Hai:
1. Cluster ke saamne "..." (three dots) pe click karein
2. "Resume" option select karein
3. 2-3 minutes wait karein cluster start hone ke liye

### Agar Cluster Deleted Hai Ya Nahi Mil Raha:
Naya cluster banana padega (instructions neeche hain)

## 🌐 Step 3: Network Access Fix Karein

1. Left sidebar mein **"Network Access"** pe click karein
2. Check karein koi IP address allowed hai ya nahi
3. **"Add IP Address"** button pe click karein
4. **"Allow Access from Anywhere"** select karein
   - Ya manually add karein: `0.0.0.0/0`
5. **"Confirm"** pe click karein

## 👤 Step 4: Database User Check Karein

1. Left sidebar mein **"Database Access"** pe click karein
2. User list mein **"munza_db_user"** dhundo
3. Agar user nahi hai to:
   - **"Add New Database User"** pe click karein
   - Username: `munza_db_user`
   - Password: `malik` (ya koi strong password)
   - Database User Privileges: **"Read and write to any database"**
   - **"Add User"** pe click karein

## 🔗 Step 5: New Connection String Copy Karein

1. **"Database"** section mein wapas jao
2. Apne cluster ke saamne **"Connect"** button pe click karein
3. **"Connect your application"** select karein
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Connection string copy karein (looks like this):
   ```
   mongodb+srv://munza_db_user:<password>@cluster-name.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. `<password>` ko apne actual password se replace karein
8. Database name add karein: `/pakistani_store?` (question mark se pehle)

### Final Connection String Example:
```
mongodb+srv://munza_db_user:malik@cluster-name.xxxxx.mongodb.net/pakistani_store?retryWrites=true&w=majority
```

## 📝 Step 6: .env File Update Karein

Backend folder mein `.env` file open karein aur update karein:
```
MONGODB_URI=YOUR_NEW_CONNECTION_STRING_HERE
```

## ✅ Step 7: Test Connection

Terminal mein run karein:
```bash
cd backend
node testMongoConnection.js
```

Agar "✅ SUCCESS! MongoDB Connected" dikhe to sab theek hai!

---

## 🆕 Naya Cluster Banana Hai? (Agar Purana Deleted Hai)

### Step-by-Step New Cluster:

1. **MongoDB Atlas Dashboard** pe jao
2. **"Build a Database"** ya **"Create"** button pe click karein
3. **FREE (M0)** tier select karein
4. Cloud Provider: **AWS**
5. Region: **Mumbai (ap-south-1)** ya **Singapore** (Pakistan ke paas)
6. Cluster Name: `pakistani-store-cluster`
7. **"Create Cluster"** pe click karein
8. Wait karein 3-5 minutes (cluster create ho raha hai)
9. Upar ke steps follow karein (Network Access, Database User, Connection String)

---

## 🚨 Agar Abhi Bhi Problem Hai?

### Quick Alternative: Local MongoDB

Agar Atlas kaam nahi kar raha, to temporarily local MongoDB use kar sakte hain:

1. MongoDB Community Edition download karein:
   - https://www.mongodb.com/try/download/community
   - Windows installer download karein

2. Install karein (default settings theek hain)

3. `.env` file mein change karein:
   ```
   MONGODB_URI=mongodb://localhost:27017/pakistani_store
   ```

4. MongoDB service start karein:
   ```bash
   net start MongoDB
   ```

5. Test karein:
   ```bash
   node testMongoConnection.js
   ```

---

## 📞 Mujhe Batao:

1. ✅ Cluster mil gaya aur running hai?
2. ⏸️ Cluster paused tha, resume kar diya?
3. ❌ Cluster nahi mila, naya banana hai?
4. 🏠 Local MongoDB use karna hai?

Batao kya situation hai, main aage help karunga!
