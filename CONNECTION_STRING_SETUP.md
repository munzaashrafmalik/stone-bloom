# MongoDB Connection String Setup

## ✅ Aapka Cluster Active Hai!

Connection string mila:
```
mongodb+srv://munza_db_user:<db_password>@stone-bloom-cluster.wdygown.mongodb.net/?appName=stone-bloom-cluster
```

## 🔧 Ab Kya Karna Hai:

### Step 1: Password Replace Karein

`<db_password>` ko apne **actual password** se replace karna hai.

**Agar password yaad hai:**
- `<db_password>` ki jagah actual password likho
- Example: Agar password `malik123` hai to:
  ```
  mongodb+srv://munza_db_user:malik123@stone-bloom-cluster.wdygown.mongodb.net/pakistani_store?retryWrites=true&w=majority&appName=stone-bloom-cluster
  ```

**Agar password yaad nahi:**
1. MongoDB Atlas dashboard pe jao
2. Left sidebar mein **"Database Access"** pe click karein
3. User `munza_db_user` ke saamne **"Edit"** pe click karein
4. **"Edit Password"** pe click karein
5. Naya password set karein (simple rakhein jaise `malik123` ya `password123`)
6. **"Update User"** pe click karein
7. Naya password use karein connection string mein

### Step 2: Database Name Add Karein

Connection string mein database name add karna hai:
- `mongodb.net/` ke baad `pakistani_store?` add karein
- Final format:
  ```
  mongodb+srv://munza_db_user:YOUR_PASSWORD@stone-bloom-cluster.wdygown.mongodb.net/pakistani_store?retryWrites=true&w=majority&appName=stone-bloom-cluster
  ```

### Step 3: Special Characters Check

**IMPORTANT:** Agar password mein special characters hain (@, :, /, ?, #, [, ], @) to unhe encode karna padega:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| :         | %3A     |
| /         | %2F     |
| ?         | %3F     |
| #         | %23     |

Example: Agar password `malik@123` hai to `malik%40123` likhein

---

## 📝 Mujhe Batao:

1. **Kya password yaad hai?** (haan/nahi)
2. **Agar yaad hai to kya hai?** (main .env file update kar dunga)
3. **Agar nahi to main guide karunga password reset karne ke liye**

Batao, main aage help karunga!
