# Smart Inventory & Sales System - Full Backend Documentation

This document serves as the complete technical guide for the backend architecture developed for the **Smart Inventory & Sales System**. It includes all implemented features: Products CRUD, Sales CRUD with Auto-Stock Deduction, Analytics Alerts, and the Notification System.

---

## 1. Products Management (CRUD & Inventory) 📦
The Products feature handles the complete CRUD system and is intrinsically linked to inventory control.

**Endpoints (`/api/products`):**
*   `POST /` - **CREATE:** Add a new product along with its initial stock quantity.
*   `GET /` - **READ:** Fetch the complete list of products.
*   `GET /:id` - **READ:** Fetch details of a specific product.
*   `PUT /:id` - **UPDATE:** Edit product details (e.g., manually updating stock quantity or price).
*   `DELETE /:id` - **DELETE:** Remove a product from the database.

**Schema Fields (`product.model.js`):**
*   `name` (String)
*   `sku` (String, Unique)
*   `category` (String)
*   `purchasePrice` (Number)
*   `sellingPrice` (Number)
*   `stockQuantity` (Number - Represents Current Inventory)
*   `lowStockThreshold` (Number - Threshold for low stock alerts, default: 5)

---

## 2. Sales & Invoicing (CRUD & Auto-Stock Deduction) 🛒
The Sales feature directly interacts with the Products inventory.

**Endpoints (`/api/sales`):**
*   `POST /` - **CREATE (with Auto-Deduction):** Create a new sale/invoice. Upon creation, the system automatically deducts the sold quantities from the respective product's `stockQuantity`.
*   `GET /` - **READ:** Fetch the complete history of sales and generated invoices.
*   `GET /:id` - **READ:** Fetch the full record of a specific sale.
*   `DELETE /:id` - **DELETE (with Auto-Restore):** If a sale is deleted, the system automatically restores the deducted quantities back to the product's inventory.

**Schema Fields (`sale.model.js`):**
*   `invoiceNumber` (String, Auto-generated, e.g., INV-2024-0001)
*   `items` (Array - Products, quantity, price)
*   `totalAmount` (Number)
*   `paymentMethod` (Cash/Card/Online)
*   `customerName` (String)

---

## 3. Analytics & Stock Alerts 🚨📊
This module handles dashboard statistics, graphical data, and low-stock warnings.

**Endpoints (`/api/analytics`):**
*   `GET /summary` - Provides summary data for dashboard cards (Total Products, Total Sales, Total Revenue, and Low Stock Item Count).
*   `GET /low-stock` - **STOCK ALERT FEATURE 🚨:** Fetches a filtered list of products where the `stockQuantity` is less than or equal to their `lowStockThreshold`. This data powers the frontend "Critical Alerts" and "Top Risk Products" sections.
*   `GET /sales-chart` - Provides aggregated daily sales data for the last 30 days, formatted for charting libraries (like Chart.js).

---

## 4. Notifications System 🔔
Designed to provide real-time updates to the frontend for the "Recent Notifications" section. Notifications are generated automatically upon specific backend actions (e.g., creating a product, deleting a sale, generating an invoice).

**Endpoints (`/api/notifications`):**
*   `GET /` - Fetch recent notifications.
*   `PUT /mark-read` - Mark all unread notifications as read.

**Schema Fields (`notification.model.js`):**
*   `title` (String)
*   `message` (String)
*   `type` (info / success / warning / error)
*   `isRead` (Boolean)

---

## Technical Details (Code Structure)
The backend follows a Feature-Based Architecture:
*   `server/src/features/products` (Product models, routes, controllers)
*   `server/src/features/sales` (Sale models, routes, controllers)
*   `server/src/features/analytics` (Analytics routes, controllers)
*   `server/src/features/notifications` (Notification models, routes, controllers)

All feature routes are integrated and registered in the main express application at `server/src/app.js`.
