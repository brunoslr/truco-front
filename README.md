# Truco Mineiro Frontend

## Project Description

This project is a single-player web implementation of Truco Mineiro, built using React and TypeScript.

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

To use the mock backend for development purposes, set the environment variable `REACT_APP_USE_MOCK_BACKEND` to `true` in the `.env` file.

```env
REACT_APP_USE_MOCK_BACKEND=true
```

This will enable the mock backend service that provides placeholder data for the player's hand. Once the actual backend is implemented, you can remove or disable the mock backend by setting the environment variable to `false`.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open Storybook for component development: `npm run storybook`

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run storybook`: Starts Storybook for component development.
- `npm run test`: Runs the test suite.

## Learn More

You can learn more about Truco Mineiro and its rules [here](https://example.com/truco-mineiro-rules).