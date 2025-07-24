# 📊 MarketPulse - Price Tracker for Local Markets 

## 🌐 Live Site
👉 [Visit MarketPulse Live](https://marketpulse-7f4bf.web.app/)

---

## 🚀 Project Overview
MarketPulse is a modern and responsive React frontend application designed to provide users with updated local market prices of essential items. Vendors update daily prices, and users can explore, compare, and track prices across various markets with interactive charts and filters.

---

## ✨ Key Features
- **🔒 Secure Authentication** – Email/password and Google login via Firebase
- **🛍️ Product Browsing** – View approved products with images, prices, and market details
- **📅 Filter & Sort** – Filter products by date and sort prices (low to high, high to low)
- **📊 Price Trends** – Interactive line and bar charts to compare price fluctuations over time using Recharts
- **🛒 Purchase Integration** – Buy products securely with Stripe payment gateway
- **⭐ Reviews & Ratings** – Users can add star ratings and comments on products
- **👤 Role-Based Dashboards** – Separate views and controls for Users, Vendors, and Admins
- **📋 Watchlist Management** – Add or remove products to personal watchlist for easy tracking
- **📱 Fully Responsive UI** – Works smoothly on mobile, tablet, and desktop devices
- **✨ Smooth Animations** – Framer Motion powered animations enhance UX

---

## 🛠️ Technologies & Packages Used
| npm Packages           | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| **React.js**           | Frontend framework                                   |
| **React Router**       | Client-side routing                                  |
| **Tailwind CSS**       | Utility-first styling                                |
| **Framer Motion**      | Animations and transitions                           |
| **Firebase Auth**      | Authentication with Email & Google login             |
| **Axios**              | HTTP client for API requests                         |
| **React Query**        | Data fetching and caching                            |
| **React Toastify**     | Notification system                                  |
| **React DatePicker**   | Date selection UI                                    |
| **Recharts**           | Interactive charts and data visualization            |
| **SweetAlert2**        | Confirmation modals                                  |
| **React Icons**        | SVG icon components                                  |
| **Stripe React SDK**   | Stripe payment integration                           |

---

## 📄 Pages Structure

### Public Pages

- **Home** – Banner, featured products, and advertisements
- **All Products** – Browse and filter all approved products
- **Login/Register** – User authentication pages

### Private Pages (🔒 Requires Login)

- **Product Details** – Detailed product info, price charts, reviews, and purchase option
- **User Dashboard** – Manage watchlist, orders, and view price trends
- **Vendor Dashboard** – Add/update products and advertisements
- **Admin Dashboard** – Manage users, products, ads, and orders

### Utility Pages

- **403 Page** – Custom forbidden page
- **404 Page** – Custom error page
- **Loading** – Animated loading indicator

---

## 📌 Additional Features
- Pagination with scroll-to-top on page changes  
- Role-based route protection  
- Toast notifications for success/error feedback  
- Secure environment variable management for Firebase and API keys  

---

## Made with ❤️ by Hasanuzzaman Joy
