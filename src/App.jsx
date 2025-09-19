import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Counter from './components/Counter'
import ColorChanger from './components/ColorChanger'
import Todo from './components/Todo'
import QuoteGenerator from './components/QuoteGenerator'
import WeatherCard from './components/WeatherCard'
import Stopwatch from './components/Stopwatch'
import Calculator from './components/Calculator'
import PasswordGenerator from './components/PasswordGenerator'
import BMICalculator from './components/BMICalculator'
import GuessGame from './components/GuessGame'
import DigitalClock from './components/DigitalClock'
import DiceRoller from './components/DiceRoller'
import CoinToss from './components/CoinToss'
import TriviaQuiz from './components/TriviaQuiz'
import UnitConverter from './components/UnitConverter'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('react-playground-dark-mode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('react-playground-dark-mode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div
        className={`${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/color-changer" element={<ColorChanger />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/quote-generator" element={<QuoteGenerator />} />
            <Route path="/weather-card" element={<WeatherCard />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/guess-game" element={<GuessGame />} />
            <Route path="/clock" element={<DigitalClock />} />
            <Route path="/dice-roller" element={<DiceRoller />} />
            <Route path="/coin-toss" element={<CoinToss />} />
            <Route path="/trivia-quiz" element={<TriviaQuiz />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
