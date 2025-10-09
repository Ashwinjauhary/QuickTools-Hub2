import { useState, useEffect } from 'react';

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Card emojis - each should appear twice
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  // Check if game is over
  useEffect(() => {
    if (solved.length === emojis.length * 2) {
      setGameOver(true);
    }
  }, [solved]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = flipped;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        // No match - flip back after delay
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped]);

  const resetGame = () => {
    // Create and shuffle cards
    const initialCards = [...emojis, ...emojis]
      .map((emoji, index) => ({ id: index, emoji }))
      .sort(() => Math.random() - 0.5);
    
    setCards(initialCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    // Don't allow flipping if:
    // - Card is already flipped or solved
    // - Two cards are already flipped
    // - Game is over
    if (
      flipped.includes(index) ||
      solved.includes(index) ||
      flipped.length === 2 ||
      gameOver
    ) return;

    setFlipped([...flipped, index]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">🎮 Memory Game</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">Moves: {moves}</div>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            New Game
          </button>
        </div>

        {gameOver && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
            <h2 className="text-xl font-bold mb-2">🎉 Congratulations!</h2>
            <p>You completed the game in {moves} moves!</p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || solved.includes(index);
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`h-20 flex items-center justify-center text-3xl rounded-lg cursor-pointer transition-all duration-300 ${
                  isFlipped 
                    ? 'bg-white border-2 border-blue-400 transform rotateY(180deg)' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } ${solved.includes(index) ? 'opacity-70' : ''}`}
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  perspective: '1000px'
                }}
              >
                {isFlipped ? card.emoji : '?'}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>Find all matching pairs of emojis with the fewest moves possible!</p>
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;