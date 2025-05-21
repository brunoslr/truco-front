import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { getMockPlayerHand } from './services/mockBackend';
import { Card } from './models/Card';

const MainApp: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);

  useEffect(() => {
    if (process.env.REACT_APP_USE_MOCK_BACKEND === 'true') {
      const mockHand = getMockPlayerHand();
      setPlayerHand(mockHand);
    } else {
      // Replace with actual backend call when implemented
      // Example: fetchPlayerHand().then(setPlayerHand);
    }
  }, []);

  return (
    <div className="App">
      <h1>Player's Hand</h1>
      <div className="hand">
        {playerHand.map((card, index) => (
          <div key={index} className="card">
            {card.rank} of {card.suit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainApp;