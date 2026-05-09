# 🔍 MongoDB Atlas Cluster Status Check Karo

## ⚠️ Problem: DNS Error Aa Raha Hai

Yeh error tab aata hai jab:
1. Cluster PAUSED ho
2. Network Access configured na ho
3. Cluster delete ho gaya ho

---

## ✅ STEP-BY-STEP: Atlas Dashboard Mein Check Karo

### 1️⃣ Cluster Status Check Karo

**Kahan jao:**
- https://cloud.mongodb.com/
- Login karo
- "Database" section mein jao

**Kya dekhna hai:**
Apne cluster "stone-bloom-cluster" ke paas status dekho:

```
✅ RUNNING (green dot)     → Good! Cluster active hai
⏸️ PAUSED (yellow/orange)  → RESUME button pe click karo
❌ DELETED                  → Naya cluster banana padega
```

**Agar PAUSED hai:**
1. Cluster ke saamne "..." (three dots) pe click karo
2. "Resume" select karo
3. 2-3 minutes wait karo
4. Status "RUNNING" hone tak wait karo

---

### 2️⃣ Network Access Check Karo (IMPORTANT!)

**Kahan jao:**
- Left sidebar mein "Network Access" pe click karo

**Kya dekhna hai:**
IP Address list mein kuch entries honi chahiye:

```
✅ 0.0.0.0/0 (Allow from anywhere)  → Perfect!
✅ Your IP address                   → Good
❌ Empty list                        → Problem! Add karna padega
```

**Agar empty hai ya 0.0.0.0/0 nahi hai:**
1. "Add IP Address" button pe click karo
2. "Allow Access from Anywhere" select karo
3. Confirm karo
4. Status "Active" hone tak wait karo (30 seconds)

---

### 3️⃣ Database User Check Karo

**Kahan jao:**
- Left sidebar mein "Database Access" pe click karo

**Kya dekhna hai:**
User list mein "munza_db_user" hona chahiye:

```
✅ munza_db_user exists              → Good!
❌ User nahi hai                     → Add karna padega
```

**Agar user nahi hai:**
1. "Add New Database User" pe click karo
2. Username: munza_db_user
3. Password: malik
4. Built-in Role: "Read and write to any database"
5. "Add User" pe click karo

---

## 📸 Mujhe Screenshots Bhejo (Optional)

Agar confusion hai to yeh screenshots bhejo:
1. Cluster status (Database page)
2. Network Access page
3. Database Access page

---

## 🏠 Alternative: Local MongoDB (Quick Solution)

Agar Atlas mein problem solve nahi ho rahi, to temporarily local MongoDB use kar sakte ho:

### Windows pe MongoDB Install:

1. **Download:**
   - https://www.mongodb.com/try/download/community
   - Windows MSI installer download karo

2. **Install:**
   - Run installer
   - "Complete" installation select karo
   - "Install MongoDB as a Service" check rakho
   - Install karo

3. **Verify:**
   ```bash
   mongod --version
   ```

4. **Update .env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/pakistani_store
   ```

5. **Test:**
   ```bash
   node testMongoConnection.js
   ```

---

## 🎯 Mujhe Batao:

**Atlas Dashboard mein check karo aur batao:**

1. ✅ Cluster status kya hai? (RUNNING / PAUSED / DELETED)
2. 🌐 Network Access mein 0.0.0.0/0 hai? (YES / NO)
3. 👤 Database user "munza_db_user" exist karta hai? (YES / NO)

**Ya:**

4. 🏠 Local MongoDB install karna chahte ho? (Quick solution)

Batao kya situation hai!
