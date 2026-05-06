# Way Of Writing Code

## Goal

Write frontend code so it matches backend contracts exactly and stays easy to audit when request bugs happen.

## Rules To Use Throughout

- Keep API field names identical to backend request keys.
  - Use `name`, not `fullName`.
  - Use `email`, not `username`.
  - Use `groupId`, not `groupID` or nested alternatives.
- Convert form values into backend-ready payloads before sending requests.
  - Example: convert amount inputs to a number before `POST /expenses`.
  - Example: trim invite codes before `POST /groups/join`.
- Do not send UI-only fields to the backend.
  - For expenses, do not send `paidBy` from the frontend because the backend derives it from auth.
  - Do not send split configuration until the backend actually supports it.
- Keep request logic centralized in one frontend API utility/module.
  - Base URL setup
  - JSON headers
  - `Authorization: Bearer <token>`
  - Common response parsing
- Keep page components focused on:
  - local form state
  - loading state
  - calling API helpers
  - rendering returned backend data
- Store auth once and reuse it everywhere.
  - Persist token
  - Rehydrate current session on app load
  - Use the same token source for all protected requests
- Prefer backend response data over assumed UI shapes.
  - Render group name from API data
  - Render members from `/groups/:groupId/members`
  - Render expenses from `/groups/:groupId/expenses`
  - Render settlements from `/groups/:groupId/settlements`
- Keep transformations explicit and small.
  - Build a `payload` object just before each request.
  - Avoid sending raw component state when the state shape differs from the API shape.

## Working Pattern

1. Read the backend route contract first.
2. Shape frontend state around the contract.
3. Normalize the outgoing payload.
4. Send only supported fields.
5. Render from the returned response instead of hardcoded placeholders.

## Example Payload Shapes

### Register

```js
const payload = {
  name: form.name.trim(),
  email: form.email.trim(),
  password: form.password,
};
```

### Login

```js
const payload = {
  email: form.email.trim(),
  password: form.password,
};
```

### Create Group

```js
const payload = {
  name: groupName.trim(),
};
```

### Join Group

```js
const payload = {
  inviteCode: inviteCode.trim(),
};
```

### Create Expense

```js
const payload = {
  groupId,
  description: description.trim(),
  amount: Number(amount),
};
```
