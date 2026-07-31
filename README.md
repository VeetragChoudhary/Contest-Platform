# KodeZilla.io - Contest Platform

![KodeZilla Banner](kodezilla-banner.png)

The project is now split into a backend in `BE/` and a lightweight browser frontend in `FE/`.

## Structure

```text
BE/
  src/
  prisma/
  package.json
  tsconfig.json
  prisma.config.ts

FE/
  index.html
  app.jsx
  server.ts
  styles.css
  package.json

.env
package.json
```

## Backend

The API lives in `BE/` and uses Node.js, Express, Prisma, PostgreSQL, JWT, and Zod.
TypeScript is executed directly by [`tsx`](https://tsx.is), so there is no build step.

Requires Node.js 20.6 or newer.

Useful commands from the repo root:

```bash
npm run dev:be
npm run typecheck:be
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The backend loads environment variables from the repo root `.env`.
The frontend proxy can also read `BACKEND_URL` from the same file.

Example:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/contestdb
JWT_SECRET=your_secret_key
SALT_ROUNDS=10
PORT=3000
BACKEND_URL=http://localhost:3000
```

## Frontend

The frontend lives in `FE/` as a React app built with Vite.
The Vite dev server proxies `/api/*` calls to the backend, so the browser can talk to the API through the frontend origin.

It supports:

- signup and login
- token storage
- listing contests
- contest detail and leaderboard lookup
- creator flows for contest, MCQ, and DSA creation
- contestant flows for MCQ and DSA submission

Run it from the repo root:

```bash
npm run build:fe
npm run dev:fe
```

Then open `http://localhost:5173`.

## Notes

- The React entry point is `FE/src/main.tsx`; Vite emits the production build to `FE/dist/`.
- The Vite dev proxy in `FE/vite.config.ts` forwards `/api` to `http://localhost:4000`,
  so run the backend with `PORT=4000` (or change the proxy target to match your `PORT`).
- A new authenticated route, `GET /api/contests`, was added to make the frontend contest list possible.
- CORS headers are enabled in the backend so the frontend can call the API during development.
