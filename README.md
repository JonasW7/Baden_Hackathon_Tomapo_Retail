# Tomapo Retail — Frontend

React dashboard for managing product recalls and quality issues across production and community sources.

## Prerequisites

- Node.js 18+
- Backend running on `http://localhost:3000` with seed data applied

## Setup

```bash
yarn install
```

Create a `.env` file in the project root:

```env
VITE_TEST_EMAIL=max@exampadfadadle.com
VITE_TEST_PASSWORD=Test1234!
```

> **Note:** Authentication does not validate credentials against the database. Any email/password combination is accepted — the `.env` values are only used to pre-fill the login form.

```bash
npm run dev
```

## Stack

- **React 19** + **TypeScript** — UI
- **React Router v7** — routing & URL-driven sheet state
- **Tailwind CSS v4** + **shadcn/ui** — styling
- **Vite** — build tooling
