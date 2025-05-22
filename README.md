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

### Players and Teams
Truco Mineiro is typically played with two or four players divided into two teams of one or two players each.

### Deck
- The game uses a 40-card deck (standard deck with 8s, 9s, and 10s removed).

### Card Ranking (Highest to Lowest)
1. 4 of Clubs (Zap)
2. 7 of Hearts (Copas)
3. Ace of Spades (Espadão)
4. 7 of Diamonds (Espadinha)
5. 3s, 2s, Aces, Kings, Jacks, Queens, 7 of Spades, 7 of Clubs, 6s, 5s, 4s

### Objective
The objective is to win rounds (hands) and accumulate points. The first team to reach 12 points wins the game.

---

### Turn Structure

#### Dealing Cards
- At the beginning of each hand, the dealer shuffles the deck and deals three cards to each player.
- The dealer rotates clockwise after each hand.

#### Playing Cards
- Players take turns playing one card each, starting with the player to the left of the dealer.
- Each player plays one card face-up in the center of the table.

#### Winning Rounds
- The highest-ranked card wins the round.
- The team that wins two out of three rounds wins the hand.

#### Handling Draws
- **Draw in the first round:** All players may show their highest card. The player with the highest card wins the hand. Players can choose to play or fold in this case.
- **Draw in the second or third rounds:** The team that won the first round wins the hand.

---

### Truco Call
- At any point during the hand, a player can call "Truco" to raise the stakes.
- The opposing team can accept, raise further, or fold.
- If accepted, the points at stake increase by increments of 4 points.

---

### Scoring
- **Winning a hand without Truco:** 2 points
- **Winning a hand with Truco:** 4 points (or more if raised by increments of 4)

---

### Winning the Game
- The first team to reach 12 points wins the game.

---

### Exclusions
- The game does not include Envido or Flor, as they are not used in the Truco Mineiro variant.

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