import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
  }

  const decrease = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Digital Counter
          </h1>
          <p className="text-xl text-gray-600">Interactive counter with smooth animations</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-lg opacity-30 scale-110"></div>
              <div className="relative text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-gradient-to-r from-blue-200 to-purple-200">
                {count}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
                onClick={decrease}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl">➖</span>
                  Decrease
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
                onClick={reset}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Reset
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
                onClick={increase}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl">➕</span>
                  Increase
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter
