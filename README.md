# KodBank App

KodBank is a Next.js app with:
- User registration
- Login with username/password validation
- JWT token generation and storage
- Balance check using JWT verification
- Aiven MySQL storage with SSL

## Implemented Features

1. `KodUser` table with:
- `uid`
- `username`
- `email`
- `password` (bcrypt hash)
- `balance` (default `100000.00`)
- `phone`
- `role` (`Customer`, `manager`, `admin`)

2. `UserToken` table with:
- `tid`
- `token`
- `uid`
- `expairy`

3. Registration flow:
- Collects `uid`, `uname`, `password`, `email`, `phone`, `role`
- Role is restricted to `Customer`
- Inserts user with default balance `100000`
- Redirects to login page on success

4. Login flow:
- Validates username/password in backend
- Generates JWT with:
- subject = username
- claim = role
- algorithm = HS256
- Stores token in `UserToken`
- Sets token in HTTP-only cookie
- Redirects to dashboard

5. Dashboard flow:
- `Check Balance` button sends request with cookie token
- Backend verifies JWT and token existence/expiry
- Extracts username from token subject
- Fetches user balance and returns response
- UI shows: `your balance is : <amount>`
- Includes confetti-style party animation

## Environment Variables

Create `.env.local`:

```env
DB_HOST=mysql-1d11440d-movieland.i.aivencloud.com
DB_PORT=17674
DB_USER=avnadmin
DB_PASSWORD=YOUR_AIVEN_PASSWORD
DB_NAME=defaultdb
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
```

`SSL mode REQUIRED` is already handled in `src/lib/db.ts`.

## Local Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build Check

```bash
npm run lint
npm run build
```

Both currently pass.

## Vercel Deployment

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. In Vercel Project Settings -> Environment Variables, add:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
4. Deploy.

No extra server needed; Next.js API routes run on Vercel serverless functions.

## Schema File

SQL schema is available at:
- `db/schema.sql`

The app also auto-creates tables on first register/login request via `ensureSchema()`.
