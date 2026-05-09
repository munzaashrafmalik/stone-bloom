# 🚀 Local MongoDB Installation Guide (Windows)

## Step 1: Download MongoDB

### Option A: Direct Download Link
```
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.14-signed.msi
```

### Option B: Official Website
```
1. https://www.mongodb.com/try/download/community pe jao
2. Version: 7.0.14 (current)
3. Platform: Windows x64
4. Package: msi
5. Download button pe click karo
```

File size: ~400 MB (download mein 5-10 minutes lag sakte hain)

---

## Step 2: Install MongoDB

### Installation Steps:

1. **Downloaded .msi file ko run karo**
   - Double click on mongodb-windows-x86_64-7.0.14-signed.msi

2. **Setup Wizard:**
   - "Next" pe click karo

3. **License Agreement:**
   - "I accept the terms..." check karo
   - "Next" pe click karo

4. **Setup Type:**
   - **"Complete"** select karo (Recommended)
   - "Next" pe click karo

5. **Service Configuration:**
   - ✅ "Install MongoDB as a Service" - **CHECKED rakho**
   - Service Name: MongoDB
   - Data Directory: C:\Program Files\MongoDB\Server\7.0\data\
   - Log Directory: C:\Program Files\MongoDB\Server\7.0\log\
   - "Next" pe click karo

6. **MongoDB Compass:**
   - ✅ "Install MongoDB Compass" - Check kar sakte ho (optional GUI tool)
   - "Next" pe click karo

7. **Install:**
   - "Install" button pe click karo
   - Wait karo (5-7 minutes)
   - UAC prompt aaye to "Yes" karo

8. **Finish:**
   - "Finish" pe click karo

---

## Step 3: Verify Installation

### Terminal mein check karo:

```bash
# MongoDB version check
mongod --version

# Expected output:
# db version v7.0.14
# Build Info: ...
```

```bash
# MongoDB service status check
sc query MongoDB

# Expected output:
# STATE: 4 RUNNING
```

Agar "mongod is not recognized" error aaye to:
1. Computer restart karo
2. Ya manually path add karo (next section dekho)

---

## Step 4: Add MongoDB to PATH (If Needed)

Agar `mongod --version` kaam nahi kar raha:

1. **Environment Variables open karo:**
   - Windows Search mein "Environment Variables" type karo
   - "Edit the system environment variables" open karo
   - "Environment Variables" button pe click karo

2. **Path edit karo:**
   - "System variables" section mein "Path" select karo
   - "Edit" pe click karo
   - "New" pe click karo
   - Add karo: `C:\Program Files\MongoDB\Server\7.0\bin`
   - "OK" pe click karo sab windows mein

3. **Terminal restart karo** aur phir se try karo

---

## Step 5: Start MongoDB Service (If Not Running)

```bash
# Service start karo
net start MongoDB

# Service status check karo
sc query MongoDB
```

---

## Step 6: Test MongoDB Connection

```bash
# MongoDB shell open karo
mongosh

# Expected output:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/
# Using MongoDB: 7.0.14
# test>

# Exit karne ke liye:
exit
```

---

## ✅ Installation Complete!

Agar sab steps successful rahe to MongoDB install ho gaya!

Next steps:
1. .env file update karo
2. Connection test karo
3. Database seed karo
4. Server start karo

---

## 🆘 Common Issues:

### Issue 1: "mongod is not recognized"
**Solution:** PATH add karo (Step 4 dekho) ya computer restart karo

### Issue 2: Service not starting
**Solution:**
```bash
# Service manually start karo
net start MongoDB

# Ya MongoDB Compass use karo
```

### Issue 3: Port 27017 already in use
**Solution:**
```bash
# Check karo kaunsa process use kar raha hai
netstat -ano | findstr :27017

# Process kill karo (if needed)
taskkill /PID <process_id> /F
```

---

## 📞 Batao Installation Status:

1. ✅ Download complete?
2. ✅ Installation complete?
3. ✅ `mongod --version` kaam kar raha hai?
4. ✅ Service running hai?

Batao kahan tak pahunche!
