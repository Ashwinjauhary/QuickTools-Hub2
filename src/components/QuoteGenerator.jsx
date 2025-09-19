import { useState } from 'react'

function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      author: "Roy T. Bennett"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins"
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      author: "Albert Einstein"
    }
  ]

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(randomIndex)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Quote Generator
          </h1>
          <p className="text-xl text-gray-600">Get inspired with wisdom from great minds</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="text-center">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-30 scale-110"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-16 border-2 border-white/50">
                <div className="text-6xl mb-8">💭</div>
                <p className="text-2xl md:text-3xl leading-relaxed text-gray-900 mb-8 italic font-medium">
                  "{quotes[currentQuote].text}"
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl md:text-2xl text-purple-600 font-bold">
                  — {quotes[currentQuote].author}
                </p>
              </div>
            </div>
            
            <button 
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
              onClick={generateRandomQuote}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-2xl">✨</span>
                Generate New Quote
                <span className="text-2xl">✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteGenerator
