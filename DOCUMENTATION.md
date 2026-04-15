# YummyFood Project Documentation

A modern food delivery application built with **React**, **Vite**, and **Tailwind CSS 4.0**.

---

## **1. Project Overview**
YummyFood is a responsive web application that allows users to browse food categories, view an order menu, and access authentication pages (Sign In/Sign Up).

### **Tech Stack**
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/docs/v4-beta) (CSS-first engine)
- **Icons/Images**: SVG and Optimized JPGs

---

## **2. Setup and Installation**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### **Installation Steps**
1. **Navigate to the project directory**:
   ```bash
   cd yummyfood
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Install Tailwind CSS 4.0 Vite Plugin**:
   ```bash
   npm install @tailwindcss/vite
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## **3. Architecture and File Structure**

- `src/assets/`: Contains global images and icons.
- `src/component/`: Contains modular React components.
  - `homepage.jsx`: Main dashboard with sidebar, banner, and food items.
  - `orderlist.jsx`: Real-time order summary with quantity controls (add/delete).
  - `reachus.jsx`: Contact form for customer inquiries and feedback.
  - `payement.jsx`: Bank transfer details and logistics contact.
  - `ihavemadepayment.jsx`: Payment proof submission form.
  - `historyorder.jsx`: Responsive order tracking with status updates.
  - `signIn.jsx`: User login page with backdrop blur effects.
  - `signup.jsx`: User registration page.
- `src/App.jsx`: Root component managing global state (orders, history, navigation).
- `src/index.css`: Global CSS entry point where Tailwind 4 is imported.
- `vite.config.js`: Configuration for Vite and the Tailwind plugin.

---

## **4. Features and Workflow (Step-by-Step)**

### **1. Browsing & Real-time Selection**
- Users can view and click food items in the **Order List** section on the homepage.
- **Global State**: Orders are synced in real-time across all pages (Homepage and OrderList).
- **Visual Feedback**: Selected items show an orange border and a floating quantity badge (e.g., `x2`) immediately.
- A floating cart icon in the mobile header tracks the total quantity and provides quick access to the `OrderList`.

### **2. Reach Us (Contact Form)**
- Users can access the **Reach Us** page via the sidebar.
- **Features**: A comprehensive contact form requesting Name, Phone, Email, and a Message.
- **Interaction**: Submitting the form provides instant feedback and redirects to the homepage.

### **3. Currency & Localization**
- All prices are formatted in **Nigerian Naira (₦)**.
- Large numbers include standard comma separators (e.g., `₦15,000`).

### **3. Smart Discounts**
- **Registered Users**: Receive an automatic **5% discount** on their total.
- **Unregistered Users**: See a promotional banner in the cart encouraging them to "Sign up / Login now" to unlock the discount.

### **5. Order Management**
- Users can review their selection in the `OrderList` component at any time.
- **Direct Controls**: Items can be added (quantity increase) or deleted directly from the `OrderList` page.
- Subtotal, discounts, and final totals are recalculated dynamically and persist across views.

### **6. Payment Flow**
- **Checkout**: Once the order is confirmed, users proceed to the `PaymentPage`.
- **Bank Transfer**: The app provides bank account details for GTBank.
- **Proof of Payment**: After transfer, users click "I Have Made Payment" to go to the `IHaveMadePayment` form.
- **Verification**: Users submit their Name, Email, and a file upload of their receipt.

### **7. Order History & Status**
- **Pending**: Orders are added to `HistoryOrder` as soon as the user hits checkout.
- **Confirmed**: Once proof of payment is submitted, the status automatically updates to "confirmed" (green badge).
- **Responsive Tracking**: The history page is fully responsive, allowing users to track orders on mobile or desktop.

---

## **5. Configuration Details**

### **Tailwind CSS 4.0 Integration**
Tailwind 4 uses a simplified "CSS-first" approach.
- **Plugin Setup** (`vite.config.js`):
  ```javascript
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({
    plugins: [react(), tailwindcss()],
  })
  ```
- **CSS Setup** (`index.css`):
  ```css
  @import "tailwindcss";
  ```

---

## **6. Troubleshooting**
- **Styles not showing?** Ensure `@import "tailwindcss";` is at the top of `index.css` and the Vite plugin is active in `vite.config.js`.
- **Images broken?** Verify that images are located in `src/assets/` and correctly imported in the JSX file.
- **Blank screen?** Check the browser console (F12) for import path errors.
- **Discount not applying?** Ensure the `isRegistered` state is set to `true` (simulated by clicking the login link in the cart).
