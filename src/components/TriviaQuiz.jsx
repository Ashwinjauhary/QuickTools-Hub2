import { useState } from 'react'

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Rome", "Berlin"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Charles Dickens", "Tolstoy", "Mark Twain"],
    answer: "Shakespeare"
  }
]

function TriviaQuiz() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1)
    }
    const next = current + 1
    if (next < questions.length) {
      setCurrent(next)
    } else {
      setFinished(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <h1 className="text-4xl font-bold mb-6">❓ Trivia Quiz</h1>
      {!finished ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
          <div className="grid gap-3">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl font-semibold text-gray-800">
          🎉 Quiz Finished! Your score: <span className="text-purple-700">{score}/{questions.length}</span>
        </div>
      )}
    </div>
  )
}

export default TriviaQuiz
