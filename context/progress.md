# Progress

## Current Snapshot

- Repo structure is split into `frontend/` and `backend/`.
- The backend already exposes auth, groups, join-group, group detail, members, expenses, and settlements routes.
- The frontend is still mostly static UI and is not yet wired to the backend.
- `frontend/src/App.jsx` currently renders multiple pages/components together instead of driving screens through routing or state.

## Backend Contracts Confirmed

### Auth

- `POST /auth/register`
  - Body: `{ name, email, password }`
- `POST /auth/login`
  - Body: `{ email, password }`
- Login response returns `data.token` and `data.user`.

### Groups

- `POST /groups`
  - Body: `{ name }`
- `GET /groups`
  - Returns groups for the authenticated user.
- `POST /groups/join`
  - Body: `{ inviteCode }`
- `GET /groups/:groupId`
  - Returns `{ group, memberCount, expenseCount }`
- `GET /groups/:groupId/members`
- `GET /groups/:groupId/expenses`
- `GET /groups/:groupId/settlements`

### Expenses

- `POST /expenses`
  - Body: `{ groupId, amount, description }`
  - `paidBy` is derived from the auth token on the backend.
- `amount` must reach the backend as a number, not a raw input string.

## Mismatches Found In Frontend

- Login screen uses `username`, but the backend expects `email`.
- Register screen collects `fullName` and `username`, but the backend expects `name`, `email`, and `password`.
- Group and home pages are hardcoded and do not fetch real group/member/expense/settlement data.
- Expense UI shows `paidBy` and split-mode controls even though the current backend create-expense API does not accept those fields.
- No shared API layer exists yet for attaching the auth token and normalizing request bodies.

## Direction

- Do not add new business validations on the frontend.
- Only reshape frontend state, form fields, and request payloads so they match backend requirements exactly.
- Keep normalization close to submit handlers or a shared API layer so payloads are consistent everywhere.
