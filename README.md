Here is your full `README.md` file for the **Advanced URL Shortener with Analytics Dashboard**, complete with all project documentation, setup instructions, API references (including JWT, QR, expiry, analytics, and tag filtering), and frontend behavior:

---

```markdown
# 🔗 Advanced URL Shortener with Analytics Dashboard

A full-stack URL Shortening application with advanced features including tagging, analytics, expiry, QR code generation, and a React-based user dashboard.

---

## 📌 Features

### ✅ Backend (Node.js + Express + MongoDB)

- 🔐 JWT Authentication (Register/Login)
- 🔗 Shorten URLs with optional:
  - Custom short code
  - Expiry date
  - Tags
- 🧭 Redirect with analytics tracking
- 📊 Analytics API (visits, devices, referrers, time-series)
- 🧠 Tag-based filtering
- 🧨 410 Gone for expired links
- 📷 QR code auto-generation for every short URL

### 🖥️ Frontend (React + Tailwind CSS)

- 🧾 User authentication (JWT token management)
- 📝 URL shortener form with:
  - Expiry, tags, custom code
- 📋 Dashboard with:
  - List of user's shortened URLs
  - QR code display
  - Analytics (charts + referrer table)
  - Filter by tag

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js v16+
- MongoDB (local or cloud)
- Vite (used for frontend)

---

## 📁 Folder Structure

```

/backend
/controllers
/models
/routes
server.js
/frontend
/components
/pages
/services
main.jsx
App.jsx

````

---

## 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and BASE_URL
npm run dev
````

### 🔐 `.env` Example

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

---

## ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Auth API (`/api/auth`)

### POST `/api/auth/register`

Register a new user.

```json
{
  "username": "akash",
  "email": "akash@example.com",
  "password": "123456"
}
```

---

### POST `/api/auth/login`

Login with email & password.

```json
{
  "email": "akash@example.com",
  "password": "123456"
}
```

**Response**:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🔗 URL Shortener API (`/api/url`)

### POST `/api/url/create`

**Headers**: `Authorization: Bearer <token>`

Create a shortened URL with optional custom code, tags, and expiry.

```json
{
  "originalUrl": "https://www.youtube.com/watch?v=A6yeOmpXIvU",
  "customCode": "russia",
  "tags": ["marketing", "social"],
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

**Response**:

```json
{
  "shortUrl": "http://localhost:5000/short/russia",
  "qrCode": "data:image/png;base64,...",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

---

### GET `/api/url/user`

Get all URLs for logged-in user.

**Headers**: `Authorization: Bearer <token>`

---

### GET `/api/url/tag/:tag`

Get all shortened URLs by a specific tag.

**Headers**: `Authorization: Bearer <token>`

---

## 🔁 Redirection API (`/short/:code`)

Redirects the user to the original URL while logging:

* Device Type
* IP Address
* Referrer
* Timestamp

**Responses**:

* `302 Found` – Valid redirection
* `410 Gone` – Expired link

---

## 📊 Analytics API (`/api/analytics/:code`)

Returns analytics for a short URL.

**Response**:

```json
{
  "originalUrl": "https://youtube.com",
  "totalVisits": 45,
  "uniqueVisitors": 30,
  "devices": {
    "desktop": 27,
    "mobile": 18
  },
  "referrers": {
    "google.com": 12,
    "facebook.com": 10
  },
  "timeSeries": [
    { "date": "2025-06-11", "count": 5 },
    { "date": "2025-06-12", "count": 7 }
  ],
  "tags": ["marketing", "social"],
  "qrCode": "data:image/png;base64,..."
}
```

---

## 📊 Frontend Dashboard Features

* Form to create short URLs with expiry, tags, and custom code
* Displays:

  * Short URL
  * Tags
  * QR Code
  * Copy to clipboard
* View analytics for each URL:

  * 📈 Line chart – Traffic over 7 days
  * 📊 Pie chart – Devices (desktop/mobile)
  * 📋 Bar chart – Referrers
* Filter URLs by tag (dropdown)

---

## 🧪 Postman Collection

Use this to test all API endpoints:

📁 `docs/postman_collection.json` (Include in your repo)

---

## 🧬 Database Schema (MongoDB)

### Collection: `shorturls`

```js
{
  originalUrl: String,
  shortCode: String,
  userId: ObjectId,
  tags: [String],
  expiresAt: Date,
  totalVisits: Number,
  uniqueVisitors: Number,
  visits: [
    {
      ip: String,
      userAgent: String,
      deviceType: String,
      referrer: String,
      timestamp: Date
    }
  ],
  qrCode: String,
  createdAt: Date
}
```

---




## 🔎 Optional Scripts

You can create a script using `axios` and fake user-agents to simulate traffic data for analytics testing.

---

## 📤 Deployment 

* **Backend**: Render, Railway, Heroku
* **Frontend**: Vercel, Netlify

---

## 📬 Contact

Made by **Deepanshu Chauhan** – for Full Stack Internship Assessment
✅ Features: JWT, QR Codes, Analytics, Expiry, Tagging
🎯 Tech: MERN Stack + Tailwind CSS + Chart.js
