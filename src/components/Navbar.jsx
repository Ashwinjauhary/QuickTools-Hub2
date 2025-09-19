import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Counter', path: '/counter' },
    { name: 'Color Changer', path: '/color-changer' },
    { name: 'Todo', path: '/todo' },
    { name: 'Quote Generator', path: '/quote-generator' },
    { name: 'Weather', path: '/weather-card' },
    { name: 'Stopwatch', path: '/stopwatch' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Password Gen', path: '/password-generator' },
    { name: 'BMI Calc', path: '/bmi-calculator' },
    { name: 'Guess Game', path: '/guess-game' },
    { name: 'clock', path: '/clock' }

  ]

  return (
    <nav className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold"
          >
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🧰 QuickTools Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-100 text-blue-700'
                    : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-4 p-2 rounded-md transition-colors duration-200 ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                darkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? darkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-blue-100 text-blue-700'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
