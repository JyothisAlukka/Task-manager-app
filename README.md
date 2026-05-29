# Taskflow — Task Manager

A clean, responsive kanban-style task manager with authentication built in React.

🔗 **Live Demo**: _[add your Netlify/Vercel URL here after deploying]_

---

## Features

- **Auth**: Register & login with client-side credential storage (localStorage)
- **Kanban board**: Three stages — Todo, In Progress, Done
- **Task CRUD**: Create, edit, and delete tasks with title, description, and stage
- **Quick move**: Advance or send back tasks between stages without opening a modal
- **Search**: Filter tasks in real time across all columns
- **Responsive**: Works on mobile and desktop
- **Dark mode**: Follows system preference automatically

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Plain CSS with CSS variables |
| State | React `useState` + `useLocalStorage` hook |
| Persistence | `localStorage` (no backend) |
| Deploy | Netlify / Vercel |

---

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Deployment (Netlify — free)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy — done in ~60 seconds

---

## Project Structure

```
src/
  components/
    AuthPage.jsx    — Login & register form
    Board.jsx       — Kanban board with all three columns
    TaskCard.jsx    — Individual task card with actions
    TaskModal.jsx   — Create/edit task modal
  hooks/
    useLocalStorage.js  — Persistent state hook
  App.jsx           — Top-level routing (auth vs board)
  index.css         — Global styles & design tokens
  main.jsx          — Entry point
```

---

## Assumptions & Tradeoffs

**Auth stored in localStorage**
Credentials (including hashed passwords) are stored client-side. This is intentional since the spec marks backend as optional. In production you'd send credentials to a server and use JWT sessions.

**No password hashing**
Passwords are stored as plain text in localStorage for simplicity. A real app would use bcrypt on the server. Adding a backend (bonus) would move this to a proper auth layer.

**Per-user task isolation**
Tasks are namespaced by user ID (`tm_tasks_{userId}`) so multiple users on the same browser stay separate.

**No drag-and-drop**
Tasks move via "Next →" / "← Back" buttons. Drag-and-drop would require a library (e.g. `@dnd-kit`) and was omitted to keep the bundle lean.

**Single-page, no router**
Auth state drives rendering directly in `App.jsx`. A larger app would use React Router with protected routes.

---

## Bonus Backend (Optional)

If adding a backend:
- **Node + Express** with JWT auth (`/register`, `/login`, `/tasks` CRUD)
- **Database**: PostgreSQL (Supabase free tier) or MongoDB (Atlas free)
- **Deploy**: Railway or Render (both have free tiers)
- Replace `useLocalStorage` with API calls in `Board.jsx`

---

## Time Spent

~3 hours total: 1h design/structure, 1.5h implementation, 0.5h cleanup & README.
