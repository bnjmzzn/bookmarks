<h1 align="center">Bnjmzzn's Bookmarks</h1>

<p align="center">
A curated list of useful websites, filterable by tags and available as a public API.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vercel-23272f?logo=vercel&logoColor=fff&style=for-the-badge" alt="Vercel">
  <img src="https://img.shields.io/badge/Next.js-23272f?logo=nextdotjs&logoColor=fff&style=for-the-badge" alt="Next.js">
  <img src="https://img.shields.io/badge/React-23272f?logo=react&logoColor=61dafb&style=for-the-badge" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-23272f?logo=typescript&logoColor=3178c6&style=for-the-badge" alt="TypeScript">
  <img src="https://img.shields.io/badge/Mantine-23272f?logo=mantine&logoColor=339af0&style=for-the-badge" alt="Mantine">
  <img src="https://img.shields.io/badge/Neon-23272f?logo=neon&logoColor=00e599&style=for-the-badge" alt="Neon">
  <img src="https://img.shields.io/badge/Drizzle-23272f?logo=drizzle&logoColor=c5f74f&style=for-the-badge" alt="Drizzle">
</p>

<p align="center">
  <a href="https://bnjmzzn-bookmark.vercel.app"><b>Live App</b></a> |
  <a href="https://bnjmzzn-bookmark.vercel.app/api/docs"><b>API Docs</b></a> |
  <a href="https://bnjmzzn-bookmark.vercel.app/about"><b>About</b></a>
</p>

<p align="center">
  <img src="./public/og.png" alt="Bookmarks preview" width="700">
</p>

> [!NOTE]
> This is not a browser bookmark manager. It is a plain list of links that anyone can browse. It is a learning project built to practice fullstack development with Mantine, Neon, and Drizzle.

> [!WARNING]
> The site is maintained by one person and may go down, for example from free tier limits on Vercel or Neon. This app does not formally accept listing suggestions. 

## ✨ Features

- Browse a curated list of websites
- Filter entries by tags
- Public API for the full entry list, no key needed
- JSend formatted responses

## ⚓ Tech Stack

| Technology | Purpose |
| --- | --- |
| Vercel | hosting |
| Next.js | framework, routing, API routes |
| React | UI components |
| Mantine | component library, theming, notifications |
| Neon | serverless Postgres database |
| Drizzle ORM | schema, queries, migrations |
| drizzle-zod | schemas generated from the database tables |
| Zod | schema validation |
| TypeScript | type safety |
| Axios | HTTP client |
| react-markdown | markdown rendering |
| Tabler Icons | icons |
| Biome | linting, formatting |

## 👨‍🍳 Development

Requires Node 26 and pnpm 12. Clone the repo and install dependencies:

```bash
git clone <this repo>
cd bookmarks
pnpm install
```

Copy the example env file and fill in your Neon connection string:

```bash
cp .env.example .env
```

Run migrations and start the dev server:

```bash
pnpm db:migrate
pnpm dev
```

Other scripts:

| Script | Purpose |
| --- | --- |
| `pnpm format` | format with Biome |
| `pnpm db:generate` | generate migrations from the schema |
| `pnpm db:studio` | open Drizzle Studio, edit the database locally |

## 🧑‍⚖️ License

See [MIT LICENSE](/LICENSE)