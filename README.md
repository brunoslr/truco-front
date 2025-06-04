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

### Special Rule: "Mão de 10"

If either team reaches 10 points, the next hand is automatically worth 4 points (regardless of Truco calls), unless the leading team chooses to forfeit. In this case:
- The team with 10 points (the leading team) can either:
  - **Play the hand for 4 points** (normal play, no Truco call needed), or
  - **Fold before playing any cards**, immediately giving 2 points to the opposing team (the hand is not played).
- This rule is known as "Mão de 10" in Truco Mineiro.

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

## API and Data Transfer Objects (DTOs)

This project is designed to work with a backend API that manages game state, player actions, and game history. The following DTOs (Data Transfer Objects) define the contract between frontend and backend:

### PlayerDto
- `playerId`: string or number (unique identifier)
- `name`: string (e.g., "You", "AI 1", "Partner", "AI 2")
- `team`: string (e.g., "Player's Team", "Opponent Team")
- `hand`: Array of `CardDto` (the player's current hand)
- `isDealer`: boolean (true if this player is the dealer for the current hand)
- `isActive`: boolean (true if this player is the current turn)
- `seat`: number (0-3, for table position)
- `firstPlayerSeat`: number (seat number of the first player for the hand)

### CardDto
- `value`: string (e.g., "4", "7", "A", "K")
- `suit`: string (e.g., "Clubs", "Hearts", "Spades", "Diamonds")

### PlayedCardDto
- `playerId`: string or number
- `card`: `CardDto` or null (null if not played yet)

### GameStateDto
- `players`: Array of `PlayerDto`
- `playedCards`: Array of `PlayedCardDto` (one per seat)
- `stakes`: number (current points at stake)
- `isTrucoCalled`: boolean
- `isRaiseEnabled`: boolean
- `currentHand`: number (hand number in the match)
- `teamScores`: object with team names as keys and numbers as values (e.g., `{ "Player's Team": 6, "Opponent Team": 4 }`)
- `turnWinner`: string or null (team name or null if undecided)
- `actionLog`: Array of `ActionLogEntryDto`

### ActionLogEntryDto
- `type`: string (e.g., "card-played", "button-pressed", "hand-result", "turn-result")
- `playerId`: string or number (optional, depending on type)
- `card`: string (optional, for "card-played")
- `action`: string (optional, for "button-pressed")
- `handNumber`: number (optional, for "hand-result")
- `winner`: string (optional, for "hand-result" or "turn-result")
- `winnerTeam`: string (optional, for "turn-result")

**All DTOs are serialized as JSON and use camelCase for property names.**

#### Example API Endpoints
- `GET /api/game/state` — Returns the current `GameStateDto`.
- `POST /api/game/play-card` — Plays a card. Body varies by actor:
  - **Human:** `{ playerId, card }` (where `card` is a valid `CardDto`)
  - **AI:** `{ playerId }` (no `card` property, or `card: null`)
  - **Fold:** `{ playerId, card: { value: 0, suit: "" } }`

  The backend determines the next valid move for AI players if called with only `playerId`. For a fold, send a card object with `value: 0` and `suit: ""`.
- `POST /api/game/press-button` — Handles "Truco", "Raise", or "Fold" actions. Body: `{ playerId, action }`.
- `POST /api/game/new-hand` — Starts a new hand.

For more details, see the backend documentation or contact the backend team.

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