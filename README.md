
# Truco Mineiro - React Frontend

A modern React-based frontend for the traditional Brazilian card game Truco Mineiro, featuring real-time gameplay integration with a backend API.

## Features

### ✅ Completed
- **Full Backend Integration**: Connects to ASP.NET Core backend API
- **Real-time Game State**: Polls backend for live game updates
- **Visual Turn Indicators**: Active players highlighted with pulsing yellow borders
- **Interactive Card Play**: Clickable cards with hover effects when it's your turn
- **Team-based Gameplay**: 4-player game with 2 teams
- **Action System**: Supports Truco, Raise, and Fold actions
- **Responsive Design**: Modern UI with SCSS styling
- **Error Handling**: Robust error handling with exponential backoff

### 🎮 Gameplay Features
- **Card Display**: Automatic face-up/face-down card detection
- **Turn Management**: Clear visual indication of whose turn it is
- **Score Tracking**: Team scores displayed prominently
- **Action Log**: Detailed game action history
- **Stakes Display**: Current game stakes visualization

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Modern React patterns with hooks
- **SCSS Modules**: Scoped styling with CSS modules
- **API Configuration**: Centralized API endpoint management
- **Hot Reload**: Development server with instant updates

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5084`

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:5175` (or next available port).

### Build
```bash
npm run build
```

## API Integration

The frontend connects to the backend API with the following endpoints:

- `POST /api/game/start` - Start a new game
- `GET /api/game/{gameId}?playerSeat={seat}` - Get game state
- `POST /api/game/play-card` - Play a card
- `POST /api/game/press-button` - Perform game actions (truco, raise, fold)

## Game Flow

1. **Game Start**: Automatically creates a new game when the page loads
2. **Player Assignment**: Backend assigns player to a seat (0-3)
3. **Turn-based Play**: Players take turns playing cards
4. **Visual Feedback**: Active player highlighted with pulsing border
5. **Card Interaction**: Click cards to play them (only when it's your turn)
6. **Action Buttons**: Use Truco, Raise, and Fold buttons for game actions
7. **Score Updates**: Scores update in real-time as hands are completed

## UI/UX Features

### Visual Turn Indicators
- **Active Player**: Pulsing yellow border around the active player's avatar
- **Turn Message**: "It's your turn!" message displayed when it's the player's turn
- **Card Interactions**: Hover effects and tooltips on playable cards

### Card Interactions
- **Hover Effects**: Cards lift up and brighten when hovered (only when playable)
- **Visual Feedback**: Non-playable cards slightly grayed out
- **Click to Play**: Simply click a card to play it during your turn

### Responsive Design
- **Player Layout**: Players arranged in a square formation
- **Card Display**: Cards automatically show face-up or face-down
- **Action Log**: Collapsible action history panel
- **Team Colors**: Blue for player's team, red for opponent team

## Testing the Integration

To test the complete integration:

1. **Start Backend**: Ensure the backend API is running on port 5084
2. **Start Frontend**: Run `npm run dev` to start the development server
3. **Game Flow**: 
   - Open browser to `http://localhost:5175`
   - Navigate to the game page
   - Verify that a new game starts automatically
   - Check that players are displayed correctly
   - Verify turn indicators work (yellow pulsing border)
   - Test card clicking functionality
   - Test action buttons (Truco, Raise, Fold)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameRound.tsx   # Main game layout
│   ├── PlayerAvatar.tsx # Player display with actions
│   ├── PlayerHand.tsx  # Card hand display
│   ├── Card.tsx        # Individual card component
│   └── ...
├── pages/
│   ├── Game.tsx        # Main game page with backend integration
│   └── Home.tsx        # Home page
├── config/
│   └── apiConfig.ts    # API configuration
└── services/           # Legacy mock services (unused)
```

## Development Notes

- The application uses polling (1.5s intervals) to fetch game state updates
- Exponential backoff is implemented for error handling
- All API calls include proper error handling and logging
- Turn-based logic ensures only the active player can interact with cards
- Visual feedback provides clear indication of game state and available actions

## Next Steps

1. **Backend Testing**: Test with full 4-player game flow
2. **Game Completion**: Handle end-game scenarios and score limits
3. **Reconnection**: Add support for reconnecting to existing games
4. **Mobile Support**: Optimize for mobile device interactions
5. **Sound Effects**: Add audio feedback for actions and turns