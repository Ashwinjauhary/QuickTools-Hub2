import { Link } from 'react-router-dom'

function LandingPage() {
  const miniApps = [
    {
      id: 'counter',
      title: 'Digital Counter',
      description: 'Increase, decrease, and reset a counter with smooth animations.',
      icon: '🔢',
      path: '/counter'
    },
    {
      id: 'color-changer',
      title: 'Color Changer',
      description: 'Change background colors with interactive buttons and dropdown.',
      icon: '🎨',
      path: '/color-changer'
    },
    {
      id: 'todo',
      title: 'Todo App',
      description: 'Add, manage, and delete tasks with persistent storage.',
      icon: '📝',
      path: '/todo'
    },
    {
      id: 'quote-generator',
      title: 'Quote Generator',
      description: 'Get inspired with random quotes from famous personalities.',
      icon: '💭',
      path: '/quote-generator'
    },
    {
      id: 'weather-card',
      title: 'Weather Card',
      description: 'View live weather updates using OpenMeteo API.',
      icon: '🌤️',
      path: '/weather-card'
    },
    {
      id: 'stopwatch',
      title: 'Stopwatch',
      description: 'Start, pause, and reset a precise stopwatch timer.',
      icon: '⏱️',
      path: '/stopwatch'
    },
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'Perform basic arithmetic operations with a clean interface.',
      icon: '🧮',
      path: '/calculator'
    },
    {
      id: 'password-generator',
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable options.',
      icon: '🔑',
      path: '/password-generator'
    },
    {
      id: 'bmi-calculator',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index with height and weight.',
      icon: '⚖️',
      path: '/bmi-calculator'
    },
    {
      id: 'guess-game',
      title: 'Guess the Number',
      description: 'Test your luck in this fun number guessing game.',
      icon: '🎮',
      path: '/guess-game'
    },
    {
      id: 'digital-clock',
      title: 'Digital Clock',
      description: 'Check the current time updating live every second.',
      icon: '⏰',
      path: '/clock'
    },
    {
      id: 'dice-roller',
      title: 'Dice Roller',
      description: 'Roll virtual dice 🎲 with random results.',
      icon: '🎲',
      path: '/dice-roller'
    },
    {
      id: 'coin-toss',
      title: 'Coin Toss',
      description: 'Flip a coin 🪙 to get Heads or Tails instantly.',
      icon: '🪙',
      path: '/coin-toss'
    },
    {
      id: 'trivia-quiz',
      title: 'Trivia Quiz',
      description: 'Answer fun static questions and track your score.',
      icon: '❓',
      path: '/trivia-quiz'
    },
    {
      id: 'unit-converter',
      title: 'Unit Converter',
      description: 'Convert cm ↔ inches, kg ↔ lbs, and more.',
      icon: '🔄',
      path: '/unit-converter'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            🧰 QuickTools Hub
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            One platform, multiple mini-tools. From digital counters and to-do lists to
            weather updates and fun games — everything you need in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold shadow-sm">
              💼 Work
            </span>
            <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold shadow-sm">
              🎨 Style
            </span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold shadow-sm">
              🎮 Play
            </span>
          </div>
        </div>

        {/* Mini-Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {miniApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
            >
              <div className="text-4xl mb-4">{app.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {app.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {app.description}
              </p>
              <Link
                to={app.path}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm"
              >
                Try Now
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-20">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
            🔧 What You’ll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Productivity Tools
              </h3>
              <p className="text-gray-600">
                Manage tasks, take notes, and use handy utilities like counters and checklists.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Personalization
              </h3>
              <p className="text-gray-600">
                Switch themes, change colors, and customize your workspace instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Fun & Everyday
              </h3>
              <p className="text-gray-600">
                Play games, generate quotes, flip coins, or check the weather — lightweight apps for daily use.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">QuickTools Hub</h3>
          <p className="mb-6">Ashwin Jauhary</p>
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://github.com/Ashwinjauhary"
              className="hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="www.linkedin.com/in/ashwin-jauhary"
              className="hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} QuickTools Hub By Ashwin Jauhary. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
