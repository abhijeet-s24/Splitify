# 💸 Splitify

A simple and efficient expense-sharing web app to track group expenses and settle debts easily.

---

## 🚀 Features

### 🔐 Authentication
- User signup & login
- JWT-based authentication
- Protected routes

---

### 👥 Group Management
- Create groups
- Add/remove members
- View group details

---

### 💸 Expense Management
- Add expenses with:
  - Amount
  - Paid by
  - Participants
  - Split type (Equal / Custom)
- View expense history

---

### ⚖️ Balance Calculation
- Automatically calculate:
  - Who owes whom
  - Net balances per user

---

### 🔥 Settlement Simplification
- Minimize number of transactions
- Show optimized payments between users

---

### 💰 Settle Up
- Record payments
- Update balances accordingly

---

### 🔄 Auto Refresh
- Polling every few seconds for updated data

---

### 🧾 Activity Log (Optional)
- Track actions like:
  - Expense added
  - Payment settled

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS (optional)
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB (Mongoose)

---

## 🗄️ Database Schema (Simplified)

### User
- name
- email
- password

### Group
- name
- members[]
- createdBy

### Expense
- groupId
- paidBy
- amount
- participants[]
- splitType

### Settlement
- fromUser
- toUser
- amount

---

## 📡 API Endpoints

### Auth
- POST /auth/register
- POST /auth/login

---

### Groups
- POST /groups
- GET /groups/:id
- POST /groups/:id/add-member

---

### Expenses
- POST /expenses
- GET /groups/:id/expenses

---

### Balances
- GET /groups/:id/balances

---

### Settlements
- GET /groups/:id/settlements
- POST /settlements

---

## 🧠 Core Logic

### Balance Calculation
- Credit the payer
- Split cost among participants
- Maintain net balances

---

## 🚫 Out of Scope

- Real-time sockets  
- Payment gateways  
- Notifications  
- AI features  

---

## 🏁 Goal

Build a clean, working system with:
- Accurate calculations  
- Minimal transactions  
- Simple UI