import PlayerHand from '../components/PlayerHand';
import { usePlayerHand } from '../services/playerHandProvider';

export default function Game() {
  const initialCards = usePlayerHand();
  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <p>Here we will play Truco against the AI.</p>
      <PlayerHand initialCards={initialCards} />
    </div>
  );
}