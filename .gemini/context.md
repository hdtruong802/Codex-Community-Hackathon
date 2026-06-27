# Project Context for Gemini Code Assist

This is the **SửViệtAI** project being built for the **Codex Community Hackathon 2026**.
Please follow these conventions and constraints when generating code or answering questions:

## ⚙️ Tech Stack & Architecture
1. **Backend (`server/`)**:
   - Runtime: Node.js (with `"type": "module"` in package.json).
   - Framework: Express.
   - AI SDK: OpenAI SDK (v4+), model `gpt-4o`.
   - Communication: REST for characters list, SSE (Server-Sent Events) for chat streaming.
2. **Frontend (`client/`)**:
   - Framework: Next.js (App Router, JavaScript, CSS Modules, and Global Vanilla CSS).
   - Tailwind CSS: **DO NOT USE TAILWIND**. Styling should be premium dark-theme custom CSS.
   - Communication: Standard `fetch` API reading ReadableStreams for SSE data.

## 📏 Rules for Code Generation
- Keep functions and components modular and focused.
- Ensure strict separation of concerns between `client/` and `server/`.
- UI strings, titles, placeholders, and error messages should be in **Vietnamese**.
- Code comments, function documentation, and variable names should be in **English**.
- Refer to `CONTEXT.md` at the project root as the single source of truth for the API contract and current progress.
- Do not write any database connections (stateless design).
- Keep code clean, performant, and premium in aesthetics (smooth micro-animations, curated dark colors, HSL gradients).
