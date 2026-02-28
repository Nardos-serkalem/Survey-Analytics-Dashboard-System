# Survey Analytics Dashboard

A responsive analytics dashboard built with **Next.js** that visualises survey data and provides demographic insights  
(age, education level, resident address) as well as training preferences (time, platform, sessions) and preferred training courses.

## Tech Stack

- **Next.js** – Server‑side rendering, routing, and API routes.
- **Tailwind CSS** – Utility‑first styling.
- **scadcn/ui** – Pre‑built, accessible React components.
- **better‑auth** – Authentication utilities for a smoother login experience.
- **Recharts** – Charting library for interactive data visualisations.
- **MongoDB / Mongoose** (see `database/mongoose.ts`) – user Auth
- **TypeScript** – Static typing across the app.

## Key Features

- **Demographic insights**
  - Age distribution
  - Education level breakdown
  - Resident address mapping
- **Training preferences**
  - Preferred times and platforms
  - Session counts and trends
  - Top selected courses
- **Reusable UI components**
  - Cards, charts, forms, sidebar, nav elements, etc. (under `components/`)
- **Authenticated routes**
  - Built with `better-auth` utilities for sign‑in flow and protected pages
- **Responsive layout**
  - Designed to work on mobile and desktop using Tailwind’s utility classes

## Project Structure
- app/ – Next.js pages and layouts
- components/ – UI components & chart wrappers
- charts/ – Recharts components (pie, radial, bar, etc.)
- ui/ – primitives (button, card, tooltip…)
- database/ – Mongoose connection
- lib/ – helper utilities and server actions
- types/ – global TypeScript definitions
- public/ – static assets (images, icons)

##  Setup & Development

```bash
# install deps
npm install

# run dev server
npm run dev

# build for production
npm run build
```
- Environment variables
- (e.g. MONGODB_URI, auth secrets) should be added to a .env file.
