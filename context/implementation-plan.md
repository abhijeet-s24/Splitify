# Frontend To Backend Implementation Plan

## Objective

Connect the existing frontend to the current backend by changing frontend structure, state, and payload formatting so every request matches backend requirements. Do not add new frontend validations beyond what already exists. Focus on correct data flow and complete payload delivery.

## Phase 1: App Structure And Shared Request Layer

1. Replace the current `App.jsx` demo-style rendering with actual screen flow.
2. Add routing for:
   - login
   - register
   - dashboard/home
   - group details
3. Create a shared frontend API module for:
   - base backend URL
   - JSON request helper
   - auth token header injection
   - centralized error handling for failed API calls
4. Add a small auth/session utility to:
   - save `token`
   - save `user`
   - read them on reload
   - clear them on logout

## Phase 2: Auth Screens Match Backend Contracts

### Login Page

Current issue:
- frontend uses `username`

Required frontend change:
- replace login form state and input names with `email`
- submit `{ email, password }` to `POST /auth/login`
- store `data.token` and `data.user` from the response

Why this matters:
- the backend does not accept `username`, so the request body will be incomplete even if the UI looks correct

### Register Page

Current issues:
- frontend uses `fullName`
- frontend collects `username`, which the backend does not use

Required frontend change:
- replace `fullName` with `name`
- remove `username` from the request flow
- submit `{ name, email, password }` to `POST /auth/register`

Why this matters:
- extra UI fields are fine visually, but the outgoing payload must contain the exact backend keys or registration will fail

## Phase 3: Dashboard/Home Integration

### Create Group

Current issue:
- static UI only, no API integration

Required frontend change:
- wire the create-group form to `POST /groups`
- send `{ name }`
- after success, refresh the group list or append the returned group into state

### Join Group

Current issue:
- static UI only, no API integration

Required frontend change:
- wire the join-group form to `POST /groups/join`
- send `{ inviteCode }`
- trim the invite code before submit so complete data reaches the backend cleanly
- refresh the group list after success

### Group List

Current issue:
- group cards are hardcoded

Required frontend change:
- fetch `GET /groups`
- render cards from API data
- navigate into a real group page using the group id from the backend

## Phase 4: Group Detail Page Integration

### Group Header

Required frontend change:
- fetch `GET /groups/:groupId`
- render:
  - group name
  - invite code
  - member count
  - expense count

### Members

Required frontend change:
- fetch `GET /groups/:groupId/members`
- render backend member data instead of hardcoded names

### Expenses

Required frontend change:
- fetch `GET /groups/:groupId/expenses`
- render list from response data

### Settlements

Required frontend change:
- fetch `GET /groups/:groupId/settlements`
- map returned balances/settlements into the existing UI sections

## Phase 5: Expense Creation Must Match Backend

### Contract To Follow

- endpoint: `POST /expenses`
- body: `{ groupId, amount, description }`

### Current risk areas

- amount from HTML input arrives as a string by default
- UI includes `paidBy`
- UI includes split mode
- group page is static, so a valid `groupId` is not yet flowing into the request

### Required frontend changes

1. Pass the active backend group id into the expense form/modal.
2. Keep only fields that the backend currently supports for create-expense:
   - description
   - amount
3. Convert amount before submit:
   - `amount: Number(amount)`
4. Do not send:
   - `paidBy`
   - split mode
   - custom split data
5. After successful create:
   - close/reset the form
   - re-fetch group expenses
   - re-fetch settlements
   - optionally re-fetch group summary counts

Why this matters:
- this is the most likely place for “backend not receiving the correct data or complete data” because form inputs and API fields do not currently match

## Phase 6: Protected Request Consistency

Every protected frontend request should include:

- `Authorization: Bearer <token>`
- `Content-Type: application/json`

Apply this to:

- `POST /groups`
- `GET /groups`
- `POST /groups/join`
- `GET /groups/:groupId`
- `GET /groups/:groupId/members`
- `GET /groups/:groupId/expenses`
- `GET /groups/:groupId/settlements`
- `POST /expenses`

## Likely Issues To Watch While Implementing

- Missing token causes all protected routes to fail.
- Using email/username labels inconsistently causes incomplete auth payloads.
- Sending string amounts causes expense creation to fail because the backend expects a number.
- Keeping hardcoded group/member names can hide whether API responses are actually wired correctly.
- Sending unsupported expense fields can create confusing backend failures even when the UI seems complete.
- Not refreshing state after create/join actions can make the frontend look broken even when the backend succeeds.

## Suggested Order Of Execution

1. Build shared API/auth utilities.
2. Fix login payload shape.
3. Fix register payload shape.
4. Connect dashboard create-group and join-group actions.
5. Load real group list.
6. Route into real group detail pages by group id.
7. Load group details, members, expenses, and settlements.
8. Replace the expense form payload so it only sends backend-supported fields.
9. Re-fetch group data after create-expense.

## Done Criteria

- Login sends `email` and `password` only.
- Register sends `name`, `email`, and `password` only.
- Group create and join actions use backend payload keys exactly.
- Group pages render backend data instead of placeholders.
- Expense creation sends a complete backend-ready payload with numeric `amount`.
- No frontend request sends fields the backend does not support.
