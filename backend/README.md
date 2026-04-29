# Splitwise Clone Backend

Backend API for a Splitwise-style expense sharing app built with Node.js, Express, MongoDB, and Mongoose.

## Setup

1. Copy `.env.example` to `.env`
2. Set `MONGODB_URI` and `JWT_SECRET`
3. Install dependencies with `npm install`
4. Start the server with `npm run dev`

## Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Groups

- `POST /groups`
- `GET /groups`
- `POST /groups/join`
- `GET /groups/:groupId`
- `GET /groups/:groupId/members`

### Expenses

- `POST /expenses`
- `GET /groups/:groupId/expenses`

### Settlements

- `GET /groups/:groupId/settlements`

## Notes

- Expenses are split equally among all current group members
- Balances and settlements are computed dynamically on every request
- No balances or settlements are stored in the database
