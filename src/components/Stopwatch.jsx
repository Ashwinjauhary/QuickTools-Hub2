import { useState, useEffect, useRef } from 'react'

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const addLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time])
    }
  }

  const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((timeInMs % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center">
        {/* Time Display */}
        <div className="text-8xl font-mono font-bold text-blue-600 mb-8 bg-white border-4 border-blue-200 rounded-2xl p-10 shadow-2xl">
          {formatTime(time)}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {!isRunning ? (
            <button
              onClick={start}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ▶️ Start
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ⏸️ Pause
            </button>
          )}
          
          <button
            onClick={reset}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🔄 Reset
          </button>
          
          {isRunning && (
            <button
              onClick={addLap}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ⏱️ Lap
            </button>
          )}
        </div>

        {/* Laps Display */}
        {laps.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lap Times</h3>
            <div className="max-h-64 overflow-y-auto">
              {laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 px-6 bg-white border-2 border-gray-200 rounded-lg mb-3 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-bold text-xl text-blue-600">Lap {index + 1}</span>
                  <span className="font-mono text-2xl text-gray-800 font-bold">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setLaps([])}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm"
            >
              Clear Laps
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stopwatch
