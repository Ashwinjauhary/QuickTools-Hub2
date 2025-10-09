import { useState, useEffect, useRef } from 'react';

function SaranWrapGame() {
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'game-over'
  const [prizes, setPrizes] = useState([]);
  const [collectedPrizes, setCollectedPrizes] = useState({});
  const [layers, setLayers] = useState(50);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Sample prizes
  const samplePrizes = [
    'Candy', 'Sticker', 'Keychain', '$1 Bill', 'Chocolate', 
    'Toy', 'Gift Card', 'Eraser', 'Pen', 'Bookmark', 
    'Coin', 'Ring', 'Bracelet', 'Coupon', 'Mini Game'
  ];

  // Initialize game
  const initializeGame = () => {
    // Generate random prizes for each layer
    const newPrizes = [];
    for (let i = 0; i < layers; i++) {
      const randomPrize = samplePrizes[Math.floor(Math.random() * samplePrizes.length)];
      newPrizes.push(randomPrize);
    }
    setPrizes(newPrizes);
    
    // Initialize collected prizes object
    const initialCollected = {};
    players.forEach((player, index) => {
      initialCollected[index] = [];
    });
    setCollectedPrizes(initialCollected);
    
    setCurrentLayer(0);
    setCurrentPlayer(0);
    setGameState('playing');
    setTimeLeft(0);
  };

  // Start the timer
  const startTimer = () => {
    if (gameState !== 'playing') return;
    
    setIsTimerRunning(true);
    const time = 5 + Math.floor(Math.random() * 10); // Random time between 5-15 seconds
    setTimeLeft(time);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          nextPlayer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle unwrap action
  const handleUnwrap = () => {
    if (!isTimerRunning) {
      startTimer();
      return;
    }
    
    if (currentLayer >= layers) {
      endGame();
      return;
    }
    
    // Add prize to current player's collection
    const newCollectedPrizes = { ...collectedPrizes };
    newCollectedPrizes[currentPlayer].push(prizes[currentLayer]);
    setCollectedPrizes(newCollectedPrizes);
    
    // Move to next layer
    setCurrentLayer(prev => prev + 1);
  };

  // Move to next player
  const nextPlayer = () => {
    if (currentLayer >= layers) {
      endGame();
      return;
    }
    
    setCurrentPlayer(prev => (prev + 1) % players.length);
  };

  // End the game
  const endGame = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setGameState('game-over');
  };

  // Reset the game
  const resetGame = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    setGameState('setup');
  };

  // Add a player
  const addPlayer = () => {
    setPlayers([...players, `Player ${players.length + 1}`]);
  };

  // Remove a player
  const removePlayer = (index) => {
    if (players.length <= 2) return;
    setPlayers(players.filter((_, i) => i !== index));
  };

  // Update player name
  const updatePlayerName = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">🎁 Saran Wrap Ball Game</h1>
        
        {gameState === 'setup' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Game Setup</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Layers:</label>
              <input
                type="number"
                min="10"
                max="100"
                value={layers}
                onChange={(e) => setLayers(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Players:</label>
              {players.map((player, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={() => removePlayer(index)}
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addPlayer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full"
              >
                Add Player
              </button>
            </div>
            
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition w-full"
            >
              Start Game
            </button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2">
                Current Player: <span className="text-orange-600">{players[currentPlayer]}</span>
              </div>
              
              <div className="text-lg mb-2">
                Layers unwrapped: {currentLayer}/{layers}
              </div>
              
              <div className={`text-3xl font-bold mb-4 ${timeLeft <= 3 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
                Time Left: {timeLeft}s
              </div>
              
              <button
                onClick={handleUnwrap}
                disabled={isTimerRunning && timeLeft === 0}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-xl"
              >
                {isTimerRunning ? 'UNWRAP!' : 'START TURN'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {players.map((player, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{player}</h3>
                  <div className="text-sm">
                    {collectedPrizes[index]?.length > 0 ? (
                      <ul>
                        {collectedPrizes[index].map((prize, i) => (
                          <li key={i}>🎁 {prize}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No prizes yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {gameState === 'game-over' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Game Over!</h2>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Final Results:</h3>
              {players.map((player, index) => (
                <div key={index} className="mb-3 bg-gray-100 p-3 rounded-lg">
                  <h4 className="font-semibold">{player}: {collectedPrizes[index]?.length} prizes</h4>
                  <div className="text-sm">
                    {collectedPrizes[index]?.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition w-full"
            >
              Play Again
            </button>
          </div>
        )}
        
        <div className="text-center text-gray-600">
          <p>How to play: Players take turns unwrapping the saran wrap ball to reveal prizes. When the timer runs out, pass the ball to the next player!</p>
        </div>
      </div>
    </div>
  );
}

export default SaranWrapGame;