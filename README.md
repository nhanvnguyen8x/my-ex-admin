# Experience Review Admin

Admin web application for managing the User Review Platform. Built with **React**, **TypeScript**, and **Redux**.

## Features

- **Dashboard** – Statistics overview, charts (reviews over time, by category), top products table
- **Users** – User list with search, roles, status, review counts
- **Products** – Product catalog with categories, SKU, ratings, review counts
- **Master Data** – Categories, tags, and attributes
- **Permissions** – Roles and permission matrix

## Tech Stack

- [Vite](https://vitejs.dev/) – Build tool
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management
- [React Router v6](https://reactrouter.com/) – Routing
- [Recharts](https://recharts.org/) – Dashboard charts
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [Lucide React](https://lucide.dev/) – Icons

## Getting Started

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Layout, Sidebar, Header
├── pages/          # Dashboard, Users, Products, Master Data, Permissions
├── store/          # Redux store, slices, typed hooks
├── App.tsx
├── main.tsx
└── index.css
```

## Next Steps

- Connect to a real API (replace mock data in Redux slices)
- Add authentication (login, protected routes, token refresh)
- Add CRUD modals for users, products, master data, and roles
- Add pagination and filters for list pages
