# 🥗 YummyFood Frontend Documentation

A premium, highly responsive food delivery application built with **React 19**, **Vite 8**, and **Tailwind CSS 4.0**.

---

## **1. Core Features**

### **🔐 Authentication & User Roles**
- **Dynamic Role Management**: Supports both `Customer` and `Admin` roles.
- **OTP Verification**: Secure 6-digit email verification flow using Supabase Auth.
- **Session Persistence**: Automatic login restoration via `localStorage`.
- **Admin Dashboard**: Specialized view for administrators to track global payments and orders.

### **🛒 Smart Ordering System**
- **Real-time State**: Orders are synced instantly across the homepage and cart.
- **Dynamic Pricing**: Automatic **5% discount** for registered users.
- **Multi-device Support**: Mobile-first design with a slide-out navigation menu.

### **📦 Payment & Tracking**
- **Proof of Payment**: Dedicated form for uploading bank transfer receipts (Images/PDFs).
- **Order History**: Personalized tracking with real-time status updates (e.g., "Awaiting Confirmation").
- **Receipt Viewing**: Users can view their uploaded proof of payment directly from their history.

---

## **2. Technical Architecture**

### **Folder Structure**
- `src/component/`: Modular UI components.
  - `homepage.jsx`: Main hub with personalized greetings and food list.
  - `historyorder.jsx`: Global and personal order tracking.
  - `settings.jsx`: Responsive account management and logout.
  - `reachus.jsx`: Contact form integrated with **Formspree** (sends to `olaoyealexander44@gmail.com`).
  - `VerifyOTP.jsx`: Secure email verification screen.
- `src/hook/`: Custom React hooks (e.g., `useOrderHistory`, `useAdminPayments`) powered by **TanStack Query**.
- `src/axios/`: Centralized API configuration with automatic token injection.

### **State Management**
- **TanStack Query**: Handles all server-state, caching, and background synchronization.
- **React State**: Manages local UI toggles and navigation views.
- **Toaster**: Professional feedback via `react-hot-toast`.

---

## **3. Setup & Installation**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### **Installation**
1. **Clone & Install**:
   ```bash
   cd yummyfood
   npm install
   ```
2. **Environment Config**: Create a `.env` in the root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. **Run Dev**:
   ```bash
   npm run dev
   ```

---

## **4. Deployment Guide**

### **Vercel / Netlify**
1. **Build Settings**:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
2. **Environment Variables**: Ensure `VITE_API_URL` points to your production backend (e.g., Render).

---

## **5. Troubleshooting**
- **Blank Page?** Ensure you are signed in before accessing `Settings` or `History`.
- **Emails not sending?** Verify your **Formspree** activation link sent to `olaoyealexander44@gmail.com`.
- **Styles missing?** Confirm Tailwind 4 is correctly imported in `index.css`.

---

*Last Updated: 2024-04-16*
