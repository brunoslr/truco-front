// Backend API contract types

export interface Card {
  value: string;
  suit: string;
}

export interface Player {
  name: string;
  team: string;
  hand: Card[];
  isDealer: boolean;
  isActive: boolean;
  seat: number;
}

export interface PlayedCard {
  playerSeat: number;
  card: Card;
}

export interface ActionLogEntry {
  type: 'game-started' | 'turn-start' | 'card-played' | 'button-pressed' | 'hand-result' | 'turn-result' | 'truco-called' | 'truco-accepted' | 'truco-rejected';
  playerSeat: number | null;
  card: Card | null;
  action: string | null;
  handNumber: number | null;
  winner: string | null;
  winnerTeam: string | null;
}

export interface TeamScores {
  "Player's Team": number;
  "Opponent Team": number;
  [key: string]: number;
}

export interface GameState {
  players: Player[];
  playedCards: PlayedCard[];
  stakes: number;
  isTrucoCalled: boolean;
  isRaiseEnabled: boolean;
  currentHand: number;
  teamScores: TeamScores;
  turnWinner: string | null;
  actionLog: ActionLogEntry[];
}

export interface StartGameRequest {
  playerName: string;
}

export interface StartGameResponse {
  gameId: string;
  playerSeat: number;
  teams: {
    name: string;
    seats: number[];
  }[];
  players: Player[];
  hand: Card[];
  playerHands: {
    seat: number;
    cards: Card[];
  }[];
  dealerSeat: number;
  teamScores: TeamScores;
  stakes: number;
  currentHand: number;
  actions: ActionLogEntry[];
}

export interface PlayCardRequest {
  gameId: string;
  playerSeat: number;
  cardIndex: number;
  isFold: boolean;
}

export interface PressButtonRequest {
  gameId: string;
  playerSeat: number;
  action: 'truco' | 'raise' | 'fold';
}
