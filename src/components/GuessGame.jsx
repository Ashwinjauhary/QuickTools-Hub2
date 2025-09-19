import { useState, useEffect } from 'react'

function GuessGame() {
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'won', 'lost'
  const [secretNumber, setSecretNumber] = useState(null)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(7)
  const [hints, setHints] = useState([])
  const [difficulty, setDifficulty] = useState('medium')

  const difficulties = {
    easy: { range: [1, 20], attempts: 10, name: 'Easy (1-20)' },
    medium: { range: [1, 50], attempts: 7, name: 'Medium (1-50)' },
    hard: { range: [1, 100], attempts: 5, name: 'Hard (1-100)' }
  }

  const startNewGame = (selectedDifficulty = difficulty) => {
    const diff = difficulties[selectedDifficulty]
    const min = diff.range[0]
    const max = diff.range[1]
    const newSecretNumber = Math.floor(Math.random() * (max - min + 1)) + min
    
    setSecretNumber(newSecretNumber)
    setGuess('')
    setAttempts(0)
    setMaxAttempts(diff.attempts)
    setHints([])
    setGameState('playing')
  }

  const makeGuess = () => {
    const guessNum = parseInt(guess)
    
    if (isNaN(guessNum) || guessNum < 1) {
      alert('Please enter a valid positive number!')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    let hint = ''
    if (guessNum === secretNumber) {
      setGameState('won')
      hint = `🎉 Correct! You found the number in ${newAttempts} attempts!`
    } else if (newAttempts >= maxAttempts) {
      setGameState('lost')
      hint = `💀 Game Over! The number was ${secretNumber}`
    } else {
      if (guessNum < secretNumber) {
        hint = `📈 Too low! Try a higher number.`
      } else {
        hint = `📉 Too high! Try a lower number.`
      }
    }

    setHints([...hints, { guess: guessNum, hint, attempt: newAttempts }])
    setGuess('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      makeGuess()
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setSecretNumber(null)
    setGuess('')
    setAttempts(0)
    setHints([])
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {gameState === 'menu' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              🎮 Guess the Number Game
            </h2>
            <p className="text-gray-600 mb-8">
              I'm thinking of a number. Can you guess what it is?
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Choose Difficulty:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(difficulties).map(([key, diff]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setDifficulty(key)
                      startNewGame(key)
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      difficulty === key
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">{diff.name}</div>
                    <div className="text-sm text-gray-500">
                      {diff.attempts} attempts
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => startNewGame()}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Guess the Number
              </h2>
              <p className="text-gray-600">
                Attempts: {attempts}/{maxAttempts}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(attempts / maxAttempts) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex">
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your guess..."
                  className="flex-1 px-6 py-4 border-2 border-gray-400 rounded-l-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold bg-white shadow-lg"
                  min="1"
                />
                <button
                  onClick={makeGuess}
                  className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Guess
                </button>
              </div>
            </div>

            {/* Hints History */}
            {hints.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Your Guesses:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {hints.map((hint, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white border-2 border-gray-200 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <span className="font-mono text-2xl font-bold text-blue-600">#{hint.guess}</span>
                      <span className="text-lg text-gray-800 font-semibold">{hint.hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={resetGame}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              New Game
            </button>
          </div>
        )}

        {(gameState === 'won' || gameState === 'lost') && (
          <div className="text-center">
            <div className="text-6xl mb-4">
              {gameState === 'won' ? '🎉' : '💀'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {gameState === 'won' ? 'Congratulations!' : 'Game Over!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {gameState === 'won' 
                ? `You guessed the number ${secretNumber} in ${attempts} attempts!`
                : `The secret number was ${secretNumber}. Better luck next time!`
              }
            </p>
            
            <div className="space-x-4">
              <button
                onClick={() => startNewGame()}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
              >
                Change Difficulty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuessGame
