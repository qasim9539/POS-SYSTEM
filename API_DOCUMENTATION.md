# POS System — API Documentation (for App Developers) 📱

Yeh document POS System (Smart Inventory & Sales System) ke **backend ki saari APIs** ka complete reference hai. Isko parh kar aap directly app/frontend mein APIs integrate kar sakte hain.

> Har endpoint ka **method, full URL, request body, aur sample response** neeche diya gaya hai.

---

## 🔧 General Information

| Cheez | Value |
|-------|-------|
| **Base URL (Local)** | `http://localhost:5000/api` |
| **Base URL (Production)** | `http://<YOUR_SERVER_IP>:5000/api` *(deploy ke baad update karein)* |
| **Data Format** | JSON |
| **Request Header** | `Content-Type: application/json` |
| **Database** | MongoDB |
| **Default Port** | `5000` |

> ⚠️ **Note:** Har request mein header `Content-Type: application/json` zaroor bhejein (POST / PUT requests mein).

### IDs ke baare mein
Har record (product, sale, notification) ki ek unique MongoDB ID hoti hai jo `_id` field mein aati hai (example: `"665f1c2a8b1e4a0012ab34cd"`). Jahan bhi URL mein `:id` likha hai, wahan yeh `_id` bhejna hai.

### Common Error Responses
| Status Code | Matlab |
|-------------|--------|
| `200 OK` | Request successful |
| `201 Created` | Naya record ban gaya |
| `400 Bad Request` | Galat / missing data ya stock kam hai |
| `404 Not Found` | Record nahi mila |
| `500 Server Error` | Server side problem |

Error response ka format aam tor par aisa hota hai:
```json
{ "message": "Product not found" }
```

---

## 1. 🔐 Authentication APIs
**Base Route:** `/api/auth`

> ⚠️ **Important (Developer ke liye):** Filhaal yeh login/register endpoints **placeholder** hain — yeh sirf success message return karte hain, abhi token (JWT) generate nahi karte aur password verify nahi karte. App mein login screen bana sakte hain, lekin real authentication baad mein add hogi.

### 1.1 Register (Naya user banayein)
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/auth/register` |

**Request Body:**
```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "123456"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful"
}
```

### 1.2 Login
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/auth/login` |

**Request Body:**
```json
{
  "email": "ali@example.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

---

## 2. 📦 Products APIs (Inventory)
**Base Route:** `/api/products`

Yeh CRUD APIs products / inventory manage karti hain. Product banane, update karne, ya delete karne par **automatic notification** bhi ban jaata hai.

### Product Fields (Schema)
| Field | Type | Required | Note |
|-------|------|----------|------|
| `name` | String | ✅ | Product ka naam |
| `sku` | String | ✅ | Unique code (do products ka same SKU nahi ho sakta) |
| `category` | String | ✅ | Category |
| `purchasePrice` | Number | ✅ | Khareed ki keemat |
| `sellingPrice` | Number | ✅ | Bechne ki keemat |
| `stockQuantity` | Number | ✅ | Mojooda stock (default: 0) |
| `lowStockThreshold` | Number | ❌ | Low stock alert level (default: 5) |
| `description` | String | ❌ | Tafseel (optional) |

---

### 2.1 Create Product
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/products` |

**Request Body:**
```json
{
  "name": "Coca Cola 1.5L",
  "sku": "CC-1500",
  "category": "Beverages",
  "purchasePrice": 90,
  "sellingPrice": 120,
  "stockQuantity": 50,
  "lowStockThreshold": 10,
  "description": "Cold drink bottle"
}
```

**Success Response (201):**
```json
{
  "_id": "665f1c2a8b1e4a0012ab34cd",
  "name": "Coca Cola 1.5L",
  "sku": "CC-1500",
  "category": "Beverages",
  "purchasePrice": 90,
  "sellingPrice": 120,
  "stockQuantity": 50,
  "lowStockThreshold": 10,
  "description": "Cold drink bottle",
  "createdAt": "2026-06-22T10:00:00.000Z",
  "updatedAt": "2026-06-22T10:00:00.000Z"
}
```

**Error (400):** Agar same SKU pehle se mojood ho —
```json
{ "message": "Product with this SKU already exists" }
```

---

### 2.2 Get All Products
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/products` |

Saari products ki list (newest pehle) return karta hai.

**Success Response (200):**
```json
[
  {
    "_id": "665f1c2a8b1e4a0012ab34cd",
    "name": "Coca Cola 1.5L",
    "sku": "CC-1500",
    "category": "Beverages",
    "purchasePrice": 90,
    "sellingPrice": 120,
    "stockQuantity": 50,
    "lowStockThreshold": 10,
    "description": "Cold drink bottle",
    "createdAt": "2026-06-22T10:00:00.000Z",
    "updatedAt": "2026-06-22T10:00:00.000Z"
  }
]
```

---

### 2.3 Get Single Product
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/products/:id` |

**Example:** `GET /api/products/665f1c2a8b1e4a0012ab34cd`

**Success Response (200):** Ek product object (upar jaisa).
**Error (404):** `{ "message": "Product not found" }`

---

### 2.4 Update Product
| | |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/products/:id` |

Sirf woh fields bhejein jo change karni hain.

**Request Body (example — stock aur price update):**
```json
{
  "stockQuantity": 80,
  "sellingPrice": 130
}
```

**Success Response (200):** Updated product object return hota hai.
**Error (404):** `{ "message": "Product not found" }`

---

### 2.5 Delete Product
| | |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/products/:id` |

**Success Response (200):**
```json
{ "message": "Product deleted successfully" }
```
**Error (404):** `{ "message": "Product not found" }`

---

## 3. 🛒 Sales & Invoicing APIs
**Base Route:** `/api/sales`

Sale banate waqt system **automatically stock ghata** deta hai, **invoice number generate** karta hai, aur ek notification banata hai. Sale delete karne par stock **wapas restore** ho jaata hai.

### Sale Fields (Schema)
| Field | Type | Note |
|-------|------|------|
| `invoiceNumber` | String | Auto-generated, e.g. `INV-2026-0001` |
| `items` | Array | Bechi gayi products ki list |
| `totalAmount` | Number | Auto-calculated (quantity × price ka total) |
| `paymentMethod` | String | `Cash` / `Card` / `Online` (default: `Cash`) |
| `customerName` | String | Default: `Walk-in Customer` |

**`items` array ka har object:**
| Field | Type | Note |
|-------|------|------|
| `product` | String (ID) | Product ki `_id` |
| `quantity` | Number | Kitni quantity bechi |
| `price` | Number | Per unit price |

---

### 3.1 Create Sale (Invoice banayein)
| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/sales` |

> `totalAmount` aur `invoiceNumber` aap ko bhejne ki zaroorat nahi — server khud bana deta hai.

**Request Body:**
```json
{
  "customerName": "Bilal Ahmed",
  "paymentMethod": "Cash",
  "items": [
    {
      "product": "665f1c2a8b1e4a0012ab34cd",
      "quantity": 2,
      "price": 120
    }
  ]
}
```

**Success Response (201):**
```json
{
  "_id": "665f2a3b8b1e4a0012ab9999",
  "invoiceNumber": "INV-2026-0001",
  "items": [
    { "product": "665f1c2a8b1e4a0012ab34cd", "quantity": 2, "price": 120, "_id": "..." }
  ],
  "totalAmount": 240,
  "paymentMethod": "Cash",
  "customerName": "Bilal Ahmed",
  "createdAt": "2026-06-22T10:30:00.000Z",
  "updatedAt": "2026-06-22T10:30:00.000Z"
}
```

**Errors:**
- `400` — Agar `items` khaali ho: `{ "message": "Sale items are required" }`
- `400` — Agar stock kam ho: `{ "message": "Not enough stock for Coca Cola 1.5L. Available: 1" }`
- `404` — Agar product na mile: `{ "message": "Product not found with ID ..." }`

---

### 3.2 Get All Sales
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/sales` |

Saari sales (newest pehle). Har sale ke andar `items.product` mein product ka `name` aur `sku` bhi aata hai (populated).

**Success Response (200):**
```json
[
  {
    "_id": "665f2a3b8b1e4a0012ab9999",
    "invoiceNumber": "INV-2026-0001",
    "items": [
      {
        "product": { "_id": "665f1c2a8b1e4a0012ab34cd", "name": "Coca Cola 1.5L", "sku": "CC-1500" },
        "quantity": 2,
        "price": 120
      }
    ],
    "totalAmount": 240,
    "paymentMethod": "Cash",
    "customerName": "Bilal Ahmed",
    "createdAt": "2026-06-22T10:30:00.000Z"
  }
]
```

---

### 3.3 Get Single Sale
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/sales/:id` |

**Success Response (200):** Ek sale object (upar jaisa, product details populated).
**Error (404):** `{ "message": "Sale not found" }`

---

### 3.4 Delete Sale (Stock auto-restore)
| | |
|---|---|
| **Method** | `DELETE` |
| **URL** | `/api/sales/:id` |

Sale delete hone par bechi gayi quantity wapas stock mein add ho jaati hai.

**Success Response (200):**
```json
{ "message": "Sale deleted and inventory restored successfully" }
```
**Error (404):** `{ "message": "Sale not found" }`

---

## 4. 📊 Analytics & Dashboard APIs
**Base Route:** `/api/analytics`

Dashboard ke cards, charts aur low-stock alerts ke liye data.

### 4.1 Dashboard Summary
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/analytics/summary` |

Dashboard cards ke liye summary numbers.

**Success Response (200):**
```json
{
  "totalProducts": 25,
  "totalSales": 140,
  "totalRevenue": 85000,
  "lowStockCount": 4
}
```

---

### 4.2 Low Stock Products (Alerts) 🚨
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/analytics/low-stock` |

Woh products jinka `stockQuantity` apne `lowStockThreshold` se kam ya barabar hai. "Critical Alerts" / "Top Risk Products" section ke liye.

**Success Response (200):**
```json
[
  {
    "_id": "665f1c2a8b1e4a0012ab34cd",
    "name": "Coca Cola 1.5L",
    "sku": "CC-1500",
    "stockQuantity": 3,
    "lowStockThreshold": 10
  }
]
```

---

### 4.3 Sales Chart Data (Last 30 days)
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/analytics/sales-chart` |

Pichhle 30 din ka roz ka sales data (chart banane ke liye, e.g. Chart.js). Date ke hisaab se sorted.

**Success Response (200):**
```json
[
  { "_id": "2026-06-20", "dailyRevenue": 4500, "salesCount": 12 },
  { "_id": "2026-06-21", "dailyRevenue": 6200, "salesCount": 18 }
]
```
- `_id` = date (YYYY-MM-DD)
- `dailyRevenue` = us din ka total revenue
- `salesCount` = us din kitni sales hui

---

## 5. 🔔 Notifications APIs
**Base Route:** `/api/notifications`

Notifications **automatically** banti hain jab koi action hota hai (product add/update/delete, sale create/delete). "Recent Notifications" section ke liye.

### Notification Fields (Schema)
| Field | Type | Note |
|-------|------|------|
| `title` | String | Notification heading |
| `message` | String | Tafseel |
| `type` | String | `info` / `success` / `warning` / `error` |
| `isRead` | Boolean | Read hui ya nahi (default: false) |

---

### 5.1 Get Notifications
| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/notifications` |

Latest 20 notifications (newest pehle).

**Success Response (200):**
```json
[
  {
    "_id": "665f3c4d8b1e4a0012abaaaa",
    "title": "Invoice Generated",
    "message": "INV-2026-0001 has been generated.",
    "type": "success",
    "isRead": false,
    "createdAt": "2026-06-22T10:30:00.000Z"
  }
]
```

---

### 5.2 Mark All As Read
| | |
|---|---|
| **Method** | `PUT` |
| **URL** | `/api/notifications/mark-read` |

Saari unread notifications ko read mark kar deta hai. (Koi body nahi chahiye.)

**Success Response (200):**
```json
{ "message": "All notifications marked as read" }
```

---

## 📋 Quick Reference — Saari Endpoints Ek Nazar Mein

| # | Feature | Method | Endpoint | Kaam |
|---|---------|--------|----------|------|
| 1 | Auth | POST | `/api/auth/register` | Naya user register |
| 2 | Auth | POST | `/api/auth/login` | Login |
| 3 | Products | POST | `/api/products` | Naya product |
| 4 | Products | GET | `/api/products` | Saare products |
| 5 | Products | GET | `/api/products/:id` | Ek product |
| 6 | Products | PUT | `/api/products/:id` | Product update |
| 7 | Products | DELETE | `/api/products/:id` | Product delete |
| 8 | Sales | POST | `/api/sales` | Nayi sale/invoice |
| 9 | Sales | GET | `/api/sales` | Saari sales |
| 10 | Sales | GET | `/api/sales/:id` | Ek sale |
| 11 | Sales | DELETE | `/api/sales/:id` | Sale delete (stock restore) |
| 12 | Analytics | GET | `/api/analytics/summary` | Dashboard summary |
| 13 | Analytics | GET | `/api/analytics/low-stock` | Low stock alerts |
| 14 | Analytics | GET | `/api/analytics/sales-chart` | 30-din sales chart |
| 15 | Notifications | GET | `/api/notifications` | Latest notifications |
| 16 | Notifications | PUT | `/api/notifications/mark-read` | Sab read mark |

---

*Yeh documentation backend code (`server/src/features/...`) se generate ki gayi hai. Backend update ho to is file ko bhi update kar lein.*
