Resume Builder - Backend (Landing Page)

This is a small Express + MongoDB backend that implements landing-page APIs:

- POST /api/contact — accept contact form submissions and store them in MongoDB (optional email notify)
- GET /api/meta/stats — return precomputed site stats (seedable)

Setup

1. Install dependencies

```bash
cd backend
npm install
```

2. Create `.env` from `.env.example` and set `MONGODB_URI`.

3. Seed stats (optional):

```bash
npm run seed
```

4. Start dev server:

```bash
npm run dev
```

## Prisma / Auth (Login) setup

This repo now includes a PostgreSQL + Prisma setup for authentication (login/register).

1. Install dependencies (if not already):

```bash
cd backend
npm install
```

2. Set `DATABASE_URL` and `JWT_SECRET` in your `.env` (see `.env.example`).

3. Initialize database schema and generate client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. (Optional) Create a seed admin user:

```bash
npm run seed:auth
```

5. Start dev server:

```bash
npm run dev
```

New Endpoints

- POST /api/auth/register — register a new user (body: `email`, `password`, optional `firstName`, `lastName`)
- POST /api/auth/login — login with `email` + `password`, returns JWT token and user info

Notes

- Keep `DATABASE_URL` and `JWT_SECRET` secret; do not commit `.env` to git.
- For Vercel or other serverless hosts, use a serverless-friendly Postgres (Neon, Supabase) or use Prisma Data Proxy.

Endpoints

- POST /api/contact
  - body: { name, email, message, source? }
  - returns 201 on success

- GET /api/meta/stats
  - returns { resumesCreated, users, atsPassRate, createdAt }

Notes

- The contact endpoint will attempt to send a notification email if SMTP settings are provided.
- The Stats collection is used to expose site statistics; other backend services can increment these counters later.
