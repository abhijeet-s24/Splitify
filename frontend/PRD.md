# 🧾 PRD — Splitwise Clone (Frontend Pages)

## 📌 Overview
This document defines the minimum frontend pages and features required to build a functional Splitwise-like application using the existing backend APIs.

The goal is clarity, usability, and demo readiness, not overengineering.

---

## 🎯 Objective
Allow users to:
- Authenticate
- Manage groups
- Add expenses
- View settlements (who owes whom)

---

## 🧭 App Flow

text Login/Register → Home (Groups) → Group Page → Add Expense → View Settlements 

---

# 📄 1. AUTH PAGES

## 🔐 Login Page

### Purpose
Allow existing users to log in.

### UI Elements
- Email input
- Password input
- Login button
- Link to Register page

### API
- POST /auth/login

### Behavior
- On success:
  - Store JWT token (localStorage)
  - Redirect to Home Page

---

## 📝 Register Page

### Purpose
Allow new users to create an account.

### UI Elements
- Name input
- Email input
- Password input
- Register button
- Link to Login page

### API
- POST /auth/register

### Behavior
- On success:
  - Redirect to Login page

---

# 🏠 2. HOME PAGE (GROUP DASHBOARD)

## Purpose
Display all groups the user is part of.

---

## UI Sections

### 📋 Group List
- List of group cards
- Each card shows:
  - Group name
  - Optional: member count

### ➕ Create Group
- Button: “Create Group”
- Modal/Input:
  - Group name

### 🔗 Join Group
- Input field:
  - Invite Code
- Button: “Join”

---

## APIs

- GET /groups
- POST /groups
- POST /groups/join

---

## Behavior

- Clicking a group → navigate to Group Page
- After creating/joining:
  - refresh group list

---

# 👥 3. GROUP PAGE (CORE PAGE)

## Purpose
Central screen showing all group activity.

---

## 🧩 Sections

---

## 📌 A. Group Header

### UI
- Group Name
- Invite Code (with copy button)

---

## 👤 B. Members List

### UI
- List of members
- Highlight current user (e.g., “You”)

### API
- GET /groups/:groupId/members

---

## 💸 C. Expenses List

### UI
Each expense shows:
- Description
- Amount
- Paid by (user name)

### API
- GET /groups/:groupId/expenses

---

## ⚖️ D. Settlements (MOST IMPORTANT)

### UI

Split into two sections:

#### 🔴 You Owe
- List of:
  - Person name
  - Amount

#### 🟢 You Get
- List of:
  - Person name
  - Amount

---

### API
- GET /groups/:groupId/settlements

---

### Behavior
- Update whenever:
  - page loads
  - new expense is added

---

## ➕ E. Add Expense

### UI
- Button: “Add Expense”

### Modal/Form:
- Amount input
- Description input

### API
- POST /expenses

### Behavior
- On success:
  - refresh expenses
  - refresh settlements

---

# 🔄 4. GLOBAL BEHAVIOR

## 🔐 Authentication Handling
- Store JWT in localStorage
- Send token in all API requests:
  http   Authorization: Bearer <token>   

---

## 🔁 Data Refresh Strategy
- On page load → fetch all data
- After mutations → refetch relevant endpoints

---

## 🚫 Error Handling
- Show:
  - invalid login
  - invalid invite code
  - failed API calls

---

# 🎨 UI Guidelines

- Use clean layout (Tailwind recommended)
- Avoid clutter
- Use colors:
  - Red → owes money
  - Green → gets money
- Keep spacing consistent

---

# 🚀 MVP SCOPE (DO NOT EXCEED)

### Included:
- Auth
- Groups
- Expenses
- Settlements

### Excluded:
- Real-time updates
- Notifications
- Payment integrations
- Advanced splitting
- Chat

---

# 🧨 Success Criteria

The app is considered complete when:

- User can log in
- User can create/join a group
- User can add expenses
- User can clearly see:
  - who owes whom
  - exact amounts

---

# 💀 Final Note

A working flow with:
- clean UI  
- correct calculations  
- smooth navigation  


