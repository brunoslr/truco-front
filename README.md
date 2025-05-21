# Truco Mineiro Frontend

## Project Description

This project is a single-player web implementation of Truco Mineiro, built using React and TypeScript.

## Packages Used

- **React**: UI library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Fast frontend build tool
- **React Router DOM**: Routing for React apps
- **classnames**: Utility for conditionally joining classNames
- **Storybook**: UI component explorer and documentation tool
- **Sass (SCSS)**: CSS preprocessor for styling components
- **Jest**: Unit testing framework for React components

## Rules of Truco Mineiro

- The game uses a 40-card deck (8s, 9s, and 10s removed).
- The card ranking is as follows:
  - 4 of Clubs (Zap)
  - 7 of Hearts (Copas)
  - Ace of Spades (Espadão)
  - 7 of Diamonds (Espadinha)
  - 3s, 2s, Aces, Kings, Jacks, Queens, 7 of Spades, 7 of Clubs, 6s, 5s, 4s
- A regular hand is worth 2 points.
- A hand with Truco is worth 4 points, with increments of 4 points if raised.
- The first team to reach 12 points wins the game.
- The game does not include Envido or Flor.

## Using the Mock Backend

To use the mock backend for development purposes, set the environment variable `VITE_REACT_APP_USE_MOCK_BACKEND` to `true` in the `.env` file:

```env
VITE_REACT_APP_USE_MOCK_BACKEND=true
```

This will enable the mock backend service that provides placeholder data for the player's hand. Once the actual backend is implemented, you can remove or disable the mock backend by setting the environment variable to `false`.

## Developer Instructions

### Install dependencies
```powershell
npm install
```

### Run the development server
```powershell
npm run dev
```
- Open [http://localhost:5173/](http://localhost:5173/) (or the port shown in your terminal) to view the app.

### Run Storybook (Component Explorer)
```powershell
npm run storybook
```
- Open [http://localhost:6006/](http://localhost:6006/) (or the port shown in your terminal) to view Storybook.

### Build for production
```powershell
npm run build
```

### Run unit tests (Jest)
```powershell
npm test
```
- Runs all unit tests using Jest. You can also use `npx jest` for advanced options.
- Test files are located alongside their components (e.g., `src/components/Card.test.tsx`).

This project uses **Jest** and **React Testing Library** for unit testing React components.

## Learn More

You can learn more about Truco Mineiro and its rules [here](https://example.com/truco-mineiro-rules).