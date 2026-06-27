# CLAUDE.md — Instructions for Claude AI

## 🚀 Commands

### Backend (`server/`)
- Run Dev: `npm run dev` (uses `node --watch index.js`)
- Install Dependencies: `npm install`
- Start Server: `npm start`

### Frontend (`client/`)
- Run Dev: `npm run dev` (Next.js server on port 3000)
- Build: `npm run build`
- Install Dependencies: `npm install`
- Start Production: `npm start`

## ⚙️ Development Constraints & Code Style

- **Code structure**: ES Modules (`import`/`export`) for both frontend and backend. Functional React components with hooks.
- **Next.js conventions**: Use Next.js App Router. Place page routes in `client/app/` and reusable UI components in `client/components/`. Use standard `client/hooks/` and `client/utils/`.
- **Styling**: Use Vanilla CSS or CSS Modules. Do not use Tailwind CSS. Integrate standard premium dark theme colors:
  - Background primary: `#0a0a0f`
  - Background secondary: `#0e0e16`
  - Card background: `#1a1a2e`
  - Accent colors: Purple (`#8b5cf6`), Indigo (`#6366f1`), Blue (`#3b82f6`), Red (`#ef4444`).
- **Language**: Vietnamese for client-facing user interfaces; English for code structure, variable names, and comments.
- **Stateless design**: No database, manage chat history length locally (backend slices last 10 messages before calling OpenAI API).
- **API integrations**: Standard SSE streaming (`text/event-stream`) parsing JSON chunk objects (`{ text: "chunk" }`) or `[DONE]`.
- **References**: Always read the `CONTEXT.md` file in the root directory before designing components or API routes.
