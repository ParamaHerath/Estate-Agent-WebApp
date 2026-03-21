# NestQuest Web App

NestQuest is a client-side estate agent web app for browsing, searching, filtering, and viewing property listings.

Built with:

- React
- Vite
- React Router
- Material UI
- Google Maps React API

## Prerequisites

Make sure these are installed before running the app:

- Node.js 18 or newer
- npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

## Run Locally

1. Clone the repository.
2. Open a terminal in the project root.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal (usually http://localhost:5173).

## Available Scripts

- `npm run dev`: Start Vite dev server with hot reload.
- `npm run build`: Create a production build in the `dist` folder.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.

## Build for Production

```bash
npm run build
npm run preview
```

## Notes

- Property data is currently loaded from local JSON in `src/assets/properties.json`.
- The app includes Google Maps support for property location display.

## Troubleshooting

- If `npm install` fails, delete `node_modules` and `package-lock.json`, then run `npm install` again.
- If the dev server port is busy, Vite may choose a different port automatically. Use the URL printed in the terminal.
