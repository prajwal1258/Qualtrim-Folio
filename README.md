# Qualtrim Folio

Qualtrim Folio is a modern, visually engaging web application for managing digital assets and portfolios. Built with Next.js, it offers a sleek dashboard, advanced graphical interfaces using Three.js shaders, and robust user authentication.

## Core Technologies:

-Framework: Next.js (App Router, version 16.1.6)
-UI Library: React 19
-Styling: Tailwind CSS 4 with next-themes for potential theme management.
-Visuals & Graphics: Three.js with @react-three/fiber and @react-three/drei (used for elements like the 3D dot-shader background on the landing page).
-Data Visualization: Recharts for rendering charts in the analytics section.
-Icons: Lucide React.
-Language: TypeScript.
-Key Features (Based on project structure):

## ✨ Features
-User Authentication: Fully integrated signup, signin, and account management flows, controlled by a custom AuthContext.
- **Dashboard & Analytics:** Dedicated pages for users to view insights and manage their portfolio and digital assets.
- **Settings & Account Management:**  Routes for users to manage their personal settings.
- **Rich Graphics:**  Employs advanced graphical interfaces using WebGL/Three.js shaders, providing a premium visual aesthetic.
- **Data Visualization:** Interactive charts using Recharts.
-Overall, it is a sleek, visually engaging dashboard application built with a modern React/Next.js stack focused on tracking and analyzing digital portfolios.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Version 16+)
- **UI & DOM:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Graphics & 3D:** [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei`
- **Charting:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/`: Contains the Next.js App Router structure, including pages for `/dashboard`, `/analytics`, `/account`, `/settings`, `/signin`, /signup`, and API routes.
- `src/components/`: Reusable React components, including UI and shader backgrounds.
- `src/context/`: Context providers (e.g., `AuthContext`).

## 📜 License

This project is proprietary.
