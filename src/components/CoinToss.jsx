import { useState } from 'react'

function CoinToss() {
  const [result, setResult] = useState(null)

  const tossCoin = () => {
    const outcomes = ['Heads', 'Tails']
    const random = outcomes[Math.floor(Math.random() * outcomes.length)]
    setResult(random)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <h1 className="text-4xl font-bold mb-6">🪙 Coin Toss</h1>
      <button
        onClick={tossCoin}
        className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition"
      >
        Toss Coin
      </button>
      {result && (
        <div className="mt-6 text-3xl font-semibold text-gray-800">
          Result: <span className="text-cyan-700">{result}</span>
        </div>
      )}
    </div>
  )
}

export default CoinToss
