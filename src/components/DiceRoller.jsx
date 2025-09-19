import { useState } from 'react'

function DiceRoller() {
  const [result, setResult] = useState(null)

  const rollDice = () => {
    const random = Math.floor(Math.random() * 6) + 1
    setResult(random)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <h1 className="text-4xl font-bold mb-6">🎲 Dice Roller</h1>
      <button
        onClick={rollDice}
        className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
      >
        Roll Dice
      </button>
      {result && (
        <div className="mt-6 text-3xl font-semibold text-gray-800">
          You rolled: <span className="text-orange-700">{result}</span>
        </div>
      )}
    </div>
  )
}

export default DiceRoller
