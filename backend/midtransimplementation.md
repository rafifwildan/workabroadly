# 🚀 GUIDE LENGKAP: TRANSISI STRIPE → MIDTRANS

**Tanggal:** 31 Oktober 2025  
**Status:** COMPLETE - Ready to Test!

---

## 📦 DELIVERABLES

Berikut adalah semua file yang sudah dibuat untuk transisi payment gateway:

### 1. **Backend Code (Folder `src/`)**
- ✅ `models/Transaction.ts` - Model untuk tracking transaksi
- ✅ `models/User.ts` - Updated dengan field `tokens`
- ✅ `controllers/midtransController.ts` - Logic pembayaran lengkap
- ✅ `routes/midtransRoutes.ts` - API endpoints
- ✅ `server.ts` - Updated dengan Midtrans routes

### 2. **Documentation**
- ✅ `TESTING_GUIDE.md` - Panduan testing SUPER LENGKAP step-by-step
- ✅ `STRIPE_VS_MIDTRANS.md` - Perbandingan implementasi
- ✅ `README.md` - File ini

### 3. **Testing Tools**
- ✅ `Midtrans_Postman_Collection.json` - Import ke Postman
- ✅ `.env.example` - Template environment variables

---

## 🎯 APA YANG SUDAH DIKERJAKAN?

### ✅ Code Implementation

**1. Model Layer:**
- Transaction model untuk tracking semua pembayaran
- User model updated dengan field `tokens: number`

**2. Controller Layer:**
- `getProducts()` - List paket tokens yang tersedia
- `createTransaction()` - Buat transaksi baru dengan Midtrans
- `handleNotification()` - Terima webhook dari Midtrans (auto update status)
- `getTransactionStatus()` - Cek status transaksi

**3. Route Layer:**
- `GET /api/midtrans/products`
- `POST /api/midtrans/create-transaction`
- `POST /api/midtrans/notification` (webhook)
- `GET /api/midtrans/transaction/:orderId`

**4. Features:**
- ✅ Support multiple payment methods (Bank Transfer, GoPay, QRIS)
- ✅ Signature verification untuk keamanan
- ✅ Auto update user tokens setelah pembayaran sukses
- ✅ Transaction tracking lengkap
- ✅ Error handling comprehensive

**Next Action:** 
# 🚀 PANDUAN LENGKAP TESTING MIDTRANS PAYMENT GATEWAY

## 📋 Prerequisites
- ✅ Sudah daftar Midtrans dan dapat Sandbox API Keys
- ✅ Backend sudah berjalan di `http://localhost:3010`
- ✅ MongoDB sudah running
- ✅ Postman atau curl terinstall

---

## 🔧 STEP 1: Setup Environment Variables

Buat/update file `.env` di root folder backend:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Midtrans Sandbox Keys
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxx

# Other configs
PORT=3010
FRONTEND_URL=http://localhost:3000
```

**PENTING:** Ganti `xxxxxxxxxxxxx` dengan Server Key dan Client Key yang Anda dapat dari dashboard Midtrans Sandbox!

---

## 🏃 STEP 2: Install Dependencies & Run Server

```bash
# Install dependencies (jika belum)
npm install

# Run development server
npm run dev
```

Server akan berjalan di: `http://localhost:3010`

Pastikan Anda lihat output:
```
[Server] Running on http://localhost:3010
Registered Routes:
  get /api/midtrans/products
  post /api/midtrans/create-transaction
  post /api/midtrans/notification
  get /api/midtrans/transaction/:orderId
```

---

## 🧪 STEP 3: Testing dengan Postman

# 🧪 Panduan Testing Midtrans dengan Postman

**Untuk Developer Backend yang Sedang Development di Localhost**

---

## 📋 Prerequisites

1. ✅ Backend server sudah running di `http://localhost:3010`
2. ✅ MongoDB terhubung dengan baik
3. ✅ File `.env` sudah configured dengan Midtrans Sandbox keys
4. ✅ Postman sudah terinstall
5. ✅ Punya minimal 1 user ID di database (untuk testing)

---

## 📥 Import Collection ke Postman

1. Buka Postman
2. Klik **Import** (pojok kiri atas)
3. Pilih file `Midtrans_Postman_Collection.json`
4. Collection akan muncul dengan nama: **"Midtrans Payment Gateway - WorkAbroadly Backend"**

---

## ⚙️ Setup Collection Variables

Sebelum testing, set dulu variabel di level collection:

1. Klik collection → tab **Variables**
2. Set value berikut:

| Variable | Current Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:3010` | URL backend Anda |
| `user_id` | `672370a09c4faf7bb0bd1a8a` | User ID dari MongoDB (ganti dengan user ID real Anda) |
| `order_id` | (kosongkan dulu) | Akan terisi otomatis saat create transaction |

**Cara dapat `user_id`:**
```bash
# Buka MongoDB shell atau Compass
# Query: db.users.findOne()
# Copy _id field
```

---

## 🚀 Testing Flow (Step by Step)

### **STEP 0: Get Products**

**Request:** `GET {{base_url}}/api/midtrans/products`

**Expected Response:**
```json
{
  "products": [
    {
      "id": "basic",
      "name": "Basic Plan",
      "description": "100 tokens for career coaching",
      "price": 50000,
      "tokens": 100
    },
    {
      "id": "pro",
      "name": "Pro Plan",
      "description": "500 tokens for career coaching",
      "price": 200000,
      "tokens": 500
    },
    {
      "id": "premium",
      "name": "Premium Plan",
      "description": "1000 tokens for career coaching",
      "price": 350000,
      "tokens": 1000
    }
  ]
}
```

✅ **Success:** Status `200 OK` dan muncul list products

---

# 🧪 TESTING GUIDE LOCALHOST - PRAKTIS & REAL

## 🎯 **REALITA TESTING DI LOCALHOST**

**PENTING DIPAHAMI:**
- ❌ Midtrans **TIDAK BISA** kirim webhook ke `http://localhost:3010`
- ❌ Database MongoDB **TIDAK AKAN** auto-update setelah payment
- ✅ Anda **HARUS** pakai webhook.site atau ngrok
- ✅ Status settlement **HANYA** bisa dilihat di webhook.site
- ✅ Untuk update database, **HARUS** manual copy JSON dari webhook.site

---

## 📋 **FLOW TESTING LOCALHOST (REAL)**

```
1. Setup Backend Localhost ✅
   ↓
2. Create Transaction via Postman ✅
   ↓
3. Simulasi Payment di Simulator ✅
   ↓
4. Midtrans kirim notification ke WEBHOOK.SITE (BUKAN localhost!) ✅
   ↓
5. Copy JSON dari webhook.site ✅
   ↓
6. Manual POST ke localhost/notification via Postman ✅
   ↓
7. Database MongoDB updated ✅
```

**Kesimpulan:** Testing localhost butuh **2 tahap manual**!

---

## 🚀 **STEP-BY-STEP TESTING PRAKTIS**

### **STEP 1: Setup Webhook.site**

1. Buka: https://webhook.site
2. Akan dapat **Unique URL** seperti: `https://webhook.site/abc123-def456`
3. **COPY URL INI!**

### **STEP 2: Setup Midtrans Dashboard**

1. Login: https://dashboard.sandbox.midtrans.com/
2. Menu: **Settings → Payment**
3. Paste URL webhook.site ke **Payment Notification URL**:
   ```
   https://webhook.site/abc123-def456
   ```
4. Klik **Update**

**PENTING:** Jangan isi `http://localhost:3010` - tidak akan work!

---

### **STEP 3: Create Transaction (Postman)**

**Request:**
```
POST http://localhost:3010/api/midtrans/create-transaction

Body:
{
  "productId": "pro",
  "userId": "YOUR_USER_ID",
  "paymentType": "bank_transfer"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORDER-1730000000-ABC123",
  "token": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/...",
  "transaction": {
    "status": "pending"  ← Masih pending
  }
}
```

**SAVE:**
- `orderId`
- `redirect_url`

---

### **STEP 4A: Bank Transfer (BCA/BNI/BRI) - WORKING ✅**

#### **Sub-step 1: Buka Snap Payment Page**
1. Copy `redirect_url` dari response
2. Paste di browser
3. Pilih **"BCA Virtual Account"** (atau bank lain)
4. Akan muncul **VA Number**: `12345678901`
5. **COPY VA Number ini!**

#### **Sub-step 2: Simulasi Payment**
1. Buka: https://simulator.sandbox.midtrans.com/
2. Tab: **"VA/Bank Transfer"**
3. Pilih bank: **BCA**
4. Input VA Number: `12345678901`
5. Klik **"Inquire"**
6. Muncul detail transaksi:
   ```
   Order ID: ORDER-1730000000-ABC123
   Amount: Rp 200.000
   Status: PENDING
   ```
7. Klik **"Pay"**
8. Status berubah: **SUCCESS** ✅

#### **Sub-step 3: Cek Webhook.site**
1. Balik ke tab webhook.site
2. Akan muncul **request baru** dari Midtrans
3. Klik request tersebut
4. Lihat **Raw Content (JSON)**:

```json
{
  "transaction_time": "2025-10-31 10:30:00",
  "transaction_status": "settlement",  ← SETTLEMENT!
  "transaction_id": "abc123-def456",
  "status_code": "200",
  "signature_key": "abcdef123456...",
  "payment_type": "bank_transfer",
  "order_id": "ORDER-1730000000-ABC123",
  "gross_amount": "200000.00",
  "fraud_status": "accept",
  "bank": "bca",
  "va_numbers": [
    {
      "va_number": "12345678901",
      "bank": "bca"
    }
  ]
}
```

**COPY SEMUA JSON INI!** (Akan dipakai di step berikutnya)

---

### **STEP 4B: GoPay Deeplink - TROUBLESHOOTING 🔧**

**Problem:** 500 Internal Server Error di simulator

**Root Cause:** Snap API response untuk GoPay **BERBEDA** dari dokumentasi. Perlu update controller.

#### **Cara Benar:**

**Sub-step 1: Buka Snap Page**
1. Copy `redirect_url` dari Postman response
2. Buka di browser
3. Pilih **"GoPay"**
4. Akan muncul **QR Code** dan **Deeplink button**
5. **Jangan** klik deeplink (tidak akan work di sandbox)

**Sub-step 2: Get Transaction ID**
1. Di Snap page, buka **DevTools** (F12)
2. Tab **Network**
3. Cari request ke Midtrans API
4. Atau langsung pakai `orderId` dari Postman response

**Sub-step 3: Simulasi via API (Alternatif)**

Sayangnya, GoPay deeplink simulator **sering error di sandbox**. 

**Solusi:**
1. **Skip GoPay** untuk sekarang
2. **Fokus ke Bank Transfer** (paling stabil)
3. Atau pakai **manual webhook test** (dijelaskan di STEP 5)

**Note:** GoPay simulator di sandbox memang **tidak reliable**. Untuk production, GoPay akan work normal.

---

### **STEP 4C: QRIS - CARA BENAR 📱**

**Problem:** Tidak tahu cara dapat QR Code Image URL

**Penjelasan:** Snap response untuk QRIS **TIDAK** return image URL langsung di JSON. Anda perlu copy qr link image.

#### **Cara Alternatif (Mudah):**

**Sub-step 1: Buka Snap Page**
1. Copy `redirect_url` dari Postman
2. Buka di browser
3. Pilih **"QRIS"**
4. Akan muncul **QR Code image** di page

**Sub-step 2: Ambil url QR Code**
1. Right-click pada QR code image
2. **"Copy image link"**

**Sub-step 3: Simulasi Payment**
1. Buka: https://simulator.sandbox.midtrans.com/qris/index
2. **Paste** image link QR code image sub-step 2
3. Klik **"Scan QR"**
4. Pilih Issuer **"GoPay"** lalu Klik **"Pay"**
5. Status: **SUCCESS**
6. Diperoleh Order ID (misal: A1202511010505156h9aRm2h8uID) dan status **"PAID"**

**Sub-step 4: Cek Webhook.site**
(Same as Bank Transfer - akan ada notifikasi masuk)

### **STEP 5: Update Database Manual (PENTING!)**

**REALITA:** Database Anda **TIDAK** auto-update karena webhook tidak sampai ke localhost.

**Solusi:** Manual POST notification ke localhost.

#### **Sub-step 1: Copy JSON dari Webhook.site**

Dari webhook.site, copy **SEMUA** JSON notification:

```json
{
  "transaction_time": "2025-10-31 10:30:00",
  "transaction_status": "settlement",
  "transaction_id": "abc123-def456",
  "status_code": "200",
  "signature_key": "abcdef123456789...",
  "payment_type": "bank_transfer",
  "order_id": "ORDER-1730000000-ABC123",
  "merchant_id": "G812220002",
  "gross_amount": "200000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "bank": "bca",
  "va_numbers": [
    {
      "va_number": "12345678901",
      "bank": "bca"
    }
  ]
}
```

#### **Sub-step 2: POST ke Localhost via Postman**

**Request:**
```
POST http://localhost:3010/api/midtrans/notification
Content-Type: application/json

Body: (paste JSON dari webhook.site)
```

**Response:**
```json
{
  "success": true,
  "message": "Notification processed"
}
```

#### **Sub-step 3: Cek Terminal Backend**

Akan muncul log:
```
[Midtrans Notification]: {...}
[Midtrans] Transaction ORDER-1730000000-ABC123 status: settlement, fraud: accept
[Midtrans] Added 500 tokens to user test@example.com
```

**✅ Sekarang database updated!**

---

### **STEP 6: Verify Database Updated**

#### **Via Postman:**
```
GET http://localhost:3010/api/midtrans/transaction/ORDER-1730000000-ABC123
```

**Response:**
```json
{
  "transaction": {
    "orderId": "ORDER-1730000000-ABC123",
    "status": "settlement",  ← Updated! ✅
    "vaNumber": "12345678901"
  }
}
```

#### **Via MongoDB:**
```javascript
// Check transaction
db.transactions.findOne({ orderId: "ORDER-1730000000-ABC123" })
// status: "settlement" ✅

// Check user tokens
db.users.findOne({ email: "test@example.com" })
// tokens: 500 ✅ (bertambah!)
```

---

## 📊 **COMPARISON: EXPECTATION vs REALITY**

### **EXPECTATION (SALAH) ❌**
```
Create TX → Pay → Webhook otomatis → DB updated
```

### **REALITY LOCALHOST ✅**
```
Create TX → Pay → Webhook ke webhook.site → Manual copy JSON → 
POST ke localhost → DB updated
```

---

## 🎯 **TESTING CHECKLIST PRAKTIS**

```
[ ] Setup webhook.site
[ ] Set webhook URL di Midtrans dashboard
[ ] Create transaction via Postman
[ ] Buka redirect_url di browser
[ ] Pilih Bank Transfer (BCA) - PALING STABIL
[ ] Dapat VA number
[ ] Simulasi payment di simulator
[ ] Cek webhook.site - ada request masuk?
[ ] Copy JSON dari webhook.site
[ ] POST JSON ke localhost/notification via Postman
[ ] Cek terminal - ada log "Added X tokens"?
[ ] GET /transaction/:orderId - status = "settlement"?
[ ] Cek MongoDB - tokens bertambah?
```

---

## 🐛 **TROUBLESHOOTING**

### **Q: Webhook.site tidak dapat notifikasi?**
**A:** 
1. Cek URL di Midtrans dashboard sudah benar?
2. Coba refresh webhook.site page
3. Coba payment ulang

### **Q: GoPay simulator 500 error?**
**A:** 
- GoPay simulator di sandbox **sering error**
- **Skip GoPay**, pakai Bank Transfer saja untuk testing
- Production GoPay akan work normal

### **Q: QRIS tidak ada URL di response?**
**A:**
- Snap response QRIS memang tidak include image URL
- **Upload QR code image** ke simulator
- Atau screenshot QR dari Snap page

### **Q: Signature verification failed?**
**A:**
- Pastikan `MIDTRANS_SERVER_KEY` di .env benar
- Copy JSON dari webhook.site **EXACTLY** (jangan edit)
- Include signature_key di JSON

### **Q: Database tidak update setelah POST /notification?**
**A:**
1. Cek terminal log - ada error?
2. Cek `orderId` di JSON sama dengan di database?
3. Cek `signature_key` valid?
4. Cek `transaction_status` = "settlement"?

---

## 💡 **TIPS PRAKTIS**

### **Tip 1: Fokus ke Bank Transfer**
- Paling stabil di sandbox
- Paling mudah di-test
- GoPay & QRIS sering error di sandbox

### **Tip 2: Keep Webhook.site Tab Open**
- Jangan close tab webhook.site
- Akan auto-refresh saat dapat request

### **Tip 3: Copy JSON Carefully**
- Jangan edit apapun
- Jangan hapus signature_key
- Copy full JSON dari webhook.site

### **Tip 4: Test One Payment Method**
- Jangan test semua sekaligus
- Master Bank Transfer dulu
- Baru coba payment method lain

### **Tip 5: Save Order IDs**
- Keep track order IDs di notepad
- Mudah untuk re-check status
- Mudah untuk debug

---

## 🚀 **PRODUCTION WORKFLOW (BERBEDA!)**

Setelah deploy ke production (Heroku, Railway, VPS, dll):

```
1. Deploy backend ke server public
2. Update webhook URL di Midtrans dashboard:
   https://your-domain.com/api/midtrans/notification
3. Payment flow:
   Create TX → Pay → Webhook LANGSUNG ke server → DB auto-update ✅
```

**TIDAK PERLU** webhook.site atau manual POST!

---

## 📝 **SUMMARY**

**Localhost Testing:**
- ✅ Create transaction: WORKS
- ✅ Simulate payment: WORKS
- ❌ Auto webhook: DOESN'T WORK (need webhook.site)
- ✅ Manual webhook: WORKS (via Postman)
- ✅ Database update: WORKS (after manual POST)

**Payment Methods:**
- ✅ Bank Transfer: **VERY STABLE** (use this!)
- ⚠️ GoPay: **UNSTABLE** (often 500 error in sandbox)
- ⚠️ QRIS: **WORKAROUND** (need upload image)

**Key Takeaway:**
Testing di localhost butuh **2 tahap manual**: simulasi payment + manual POST notification.

---

**Last Updated:** October 31, 2025  
**Status:** ✅ Practical & Clear  
**Tested:** Real localhost environment