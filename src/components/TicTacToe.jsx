import { useState, useEffect } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [gameMode, setGameMode] = useState('player');
  const [difficulty, setDifficulty] = useState('medium');
  const [isThinking, setIsThinking] = useState(false);

  // Calculate winner function
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    
    if (squares.every(square => square !== null)) {
      return 'Draw';
    }
    
    return null;
  };

  // Improved Minimax algorithm
  const minimax = (squares, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    const winner = calculateWinner(squares);
    
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'Draw') return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return bestScore;
    }
  };

  // AI Move Logic
  const getBestMove = (squares, difficulty) => {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter(val => val !== null);
    
    if (difficulty === 'easy') {
      // Easy: Random move
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    
    // Check for immediate win
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const newSquares = [...squares];
      newSquares[index] = 'O';
      if (calculateWinner(newSquares) === 'O') {
        return index;
      }
    }
    
    // Block opponent win
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const newSquares = [...squares];
      newSquares[index] = 'X';
      if (calculateWinner(newSquares) === 'X') {
        return index;
      }
    }
    
    if (difficulty === 'medium') {
      // Medium: Sometimes strategic, sometimes random
      // Prefer center and corners for better strategy
      const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // Center first, then corners, then edges
      const availableStrategicMoves = strategicMoves.filter(index => emptySquares.includes(index));
      
      return Math.random() > 0.6 ? 
        availableStrategicMoves[0] : 
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    
    // Hard: Use minimax with alpha-beta pruning
    let bestScore = -Infinity;
    let bestMove = null;
    
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const newSquares = [...squares];
      newSquares[index] = 'O';
      const score = minimax(newSquares, 0, false);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
    
    return bestMove;
  };

  // Handle AI move
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !calculateWinner(board)) {
      setIsThinking(true);
      
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board, difficulty);
        const newBoard = [...board];
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
        setIsThinking(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, gameMode, difficulty]);

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index] || isThinking) return;
    if (gameMode === 'ai' && !isXNext) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? winner === 'Draw' 
      ? "Game ended in a draw!" 
      : `Winner: ${winner}`
    : gameMode === 'ai'
    ? isXNext ? 'Your turn (X)' : (isThinking ? 'AI thinking...' : 'AI\'s turn (O)')
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    if (winner) {
      if (winner === 'X') {
        setScores({...scores, X: scores.X + 1});
      } else if (winner === 'O') {
        setScores({...scores, O: scores.O + 1});
      } else {
        setScores({...scores, draws: scores.draws + 1});
      }
      
      setGameHistory([...gameHistory, {board, winner}]);
    }
    
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsThinking(false);
  };

  const resetAll = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
    setGameHistory([]);
    setIsThinking(false);
  };

  const renderSquare = (index) => {
    const isWinningSquare = winner && winner !== 'Draw' && 
      (board[index] === winner) && 
      calculateWinner(board) === winner;
    
    return (
      <button
        className={`w-16 h-16 text-3xl font-bold border-2 ${
          board[index] === 'X' 
            ? 'text-blue-600 border-blue-400' 
            : board[index] === 'O' 
            ? 'text-red-600 border-red-400' 
            : 'border-gray-300 hover:bg-gray-100'
        } ${isWinningSquare ? 'bg-green-100' : ''} transition-all duration-200 flex items-center justify-center`}
        onClick={() => handleClick(index)}
        disabled={winner || board[index] || (gameMode === 'ai' && !isXNext) || isThinking}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">⭕ Tic Tac Toe ❌</h1>
        
        {/* Game Mode Selection */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => {
              setGameMode('player');
              resetGame();
            }}
            className={`px-4 py-2 rounded-lg transition ${
              gameMode === 'player' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Player vs Player
          </button>
          <button
            onClick={() => {
              setGameMode('ai');
              resetGame();
            }}
            className={`px-4 py-2 rounded-lg transition ${
              gameMode === 'ai' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Player vs AI
          </button>
        </div>
        
        {/* Difficulty Selection */}
        {gameMode === 'ai' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">AI Difficulty:</label>
            <div className="flex space-x-2">
              {['easy', 'medium', 'hard'].map(level => (
                <button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    resetGame();
                  }}
                  className={`px-3 py-1 rounded-lg transition flex-1 ${
                    difficulty === level 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {difficulty === 'easy' ? 'AI makes random moves' : 
               difficulty === 'medium' ? 'AI uses basic strategy' : 
               'AI uses advanced algorithm (unbeatable)'}
            </p>
          </div>
        )}
        
        {/* Score Board */}
        <div className="flex justify-between mb-6 bg-gray-100 p-3 rounded-lg">
          <div className="text-center">
            <div className="text-blue-600 font-bold text-xl">X</div>
            <div className="text-2xl">{scores.X}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 font-bold text-xl">Draws</div>
            <div className="text-2xl">{scores.draws}</div>
          </div>
          <div className="text-center">
            <div className="text-red-600 font-bold text-xl">O</div>
            <div className="text-2xl">{scores.O}</div>
          </div>
        </div>
        
        {/* Game Status */}
        <div className={`text-lg font-semibold mb-4 text-center p-3 rounded-lg ${
          winner === 'X' 
            ? 'bg-blue-100 text-blue-800' 
            : winner === 'O' 
            ? 'bg-red-100 text-red-800' 
            : winner === 'Draw'
            ? 'bg-gray-100 text-gray-800'
            : isThinking
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {status}
        </div>
        
        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-6 justify-center">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={resetGame}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isThinking}
          >
            {winner ? 'Play Again' : 'Reset Game'}
          </button>
          <button
            onClick={resetAll}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            disabled={isThinking}
          >
            Reset All
          </button>
        </div>
        
        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Game History</h3>
            <div className="max-h-40 overflow-y-auto">
              {gameHistory.map((game, index) => (
                <div key={index} className="text-sm p-2 border-b">
                  Game {index + 1}: {game.winner === 'Draw' ? 'Draw' : `${game.winner} won`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;