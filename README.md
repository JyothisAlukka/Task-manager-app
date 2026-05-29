# Taskflow — Task Manager

A clean, responsive kanban-style task manager built with React. Manage your tasks across three stages with a smooth drag-and-drop interface.

🔗 **Live Demo**: https://6a18dd96a5b7d100080cb9cb--creative-beijinho-e840b4.netlify.app/

---

## Screenshots
sc

---

## Features

- **Authentication** — Register and login with persistent sessions
- **Kanban Board** — Three stages: Todo, In Progress, Done
- **Drag & Drop** — Drag tasks between columns using the HTML5 Drag and Drop API
- **Task Management** — Create, edit, and delete tasks with title and description
- **Search** — Filter tasks by title in real time
- **Responsive** — Works on mobile and desktop
- **Dark Mode** — Follows system preference automatically
- **Persistent Storage** — All data saved in localStorage, survives page refresh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Plain CSS with CSS variables |
| State Management | React `useState` + custom `useLocalStorage` hook |
| Drag & Drop | HTML5 Drag and Drop API (no library) |
| Data Persistence | Browser `localStorage` |
| Deployment | Netlify |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher — download from [nodejs.org](https://nodejs.org)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JyothisAlukka/Task-manager-app.git

# 2. Navigate into the project
cd Task-manager-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

---

## Deployment Guide (Netlify — Free)

1. Push this repository to GitHub
2. Go to [netlify.com](https://netlify.com) and click **"Add new site"**
3. Select **"Import from Git"** and connect your GitHub repo
4. Set the following:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy** — your app will be live in about 60 seconds

---

## Project Structure

```
Task-manager-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AuthPage.jsx      # Login & register form
│   │   ├── Board.jsx         # Kanban board with drag and drop
│   │   ├── TaskCard.jsx      # Individual task card
│   │   └── TaskModal.jsx     # Create / edit task modal
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom hook for persistent state
│   ├── App.jsx               # Root component — auth routing
│   ├── index.css             # Global styles and design tokens
│   └── main.jsx              # App entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## How It Works

### Authentication
- On register, a user object `{ id, name, email, password }` is saved to `localStorage`
- On login, the entered credentials are matched against saved users
- The logged-in user is stored in a session key in `localStorage` so they stay signed in after refresh
- Each user's tasks are namespaced by their ID (`tm_tasks_{userId}`) so multiple users on the same device stay isolated

### Drag and Drop
- Built using the native HTML5 Drag and Drop API — no third-party library
- `onDragStart` records which task is being dragged
- `onDragOver` highlights the target column
- `onDrop` updates the task's stage in state and localStorage
- Visual feedback: dragged card fades out, target column gets a green dashed outline

### State Management
- All state is managed with React's `useState`
- A custom `useLocalStorage` hook wraps `useState` + `useEffect` to automatically sync state to `localStorage` on every change

---

## Assumptions & Tradeoffs

**Passwords stored in plain text**
Passwords are stored as plain text in `localStorage`. This is intentional since the spec marks backend as optional and this is a frontend-only project. In a production app, passwords would be hashed with bcrypt on a backend server and never stored on the client.

**Client-side authentication**
There is no real auth server. Authentication is simulated using `localStorage`. This means it is not secure for real-world use — anyone with browser DevTools access can read stored credentials. A production implementation would use a backend with JWT tokens or session cookies.

**No drag-and-drop library**
The native HTML5 Drag and Drop API was used instead of a library like `@dnd-kit` or `react-beautiful-dnd`. This keeps the bundle size small and avoids extra dependencies. The tradeoff is less polished animation compared to dedicated libraries.

**Search by title only**
Search filters tasks by title only, as the spec did not mention searching by description.

**No backend**
All data lives in the browser's `localStorage`. This means data is device-specific — tasks created on one device won't appear on another. A backend with a database would solve this.

---

## Bonus Features Implemented

- Drag and drop between columns
- Real-time search/filter
- Delete confirmation modal
- Per-user task isolation
- Dark mode via CSS media query

---

## What I Would Add With More Time

- Backend with Node.js + Express
- Database with PostgreSQL or MongoDB
- Proper JWT-based authentication with password hashing
- Due dates and priority levels on tasks
- Drag to reorder tasks within a column
- Task activity history / audit log

---

## Time Spent

Approximately 3–4 hours total:
- 1 hour — planning, structure, and design decisions
- 2 hours — implementation (auth, board, drag and drop, search)
- 30 minutes — bug fixes, README, and cleanup

---

## License

MIT
