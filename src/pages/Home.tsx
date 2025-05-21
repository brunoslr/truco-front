import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Truco Mineiro</h1>
      <p>Welcome to the card game!</p>
      <Link to="/game">
        <button>Start Game</button>
      </Link>
    </div>
  );
}
