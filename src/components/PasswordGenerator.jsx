import { useState } from 'react'

function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let charset = ''
    if (options.uppercase) charset += uppercase
    if (options.lowercase) charset += lowercase
    if (options.numbers) charset += numbers
    if (options.symbols) charset += symbols

    if (charset === '') {
      alert('Please select at least one character type!')
      return
    }

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(newPassword)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 8) return { strength: 'Weak', color: 'text-red-500' }
    if (pwd.length < 12) return { strength: 'Medium', color: 'text-yellow-500' }
    if (pwd.length < 16) return { strength: 'Strong', color: 'text-green-500' }
    return { strength: 'Very Strong', color: 'text-green-600' }
  }

  const strength = getPasswordStrength(password)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Password Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Password
          </label>
          <div className="flex">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 px-6 py-4 border-2 border-gray-400 rounded-l-lg focus:outline-none focus:ring-4 focus:ring-blue-500 font-mono text-xl font-bold bg-white shadow-lg"
              placeholder="Click Generate to create a password"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className={`px-4 py-3 rounded-r-lg font-medium transition-colors duration-200 ${
                password
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          {password && (
            <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className={`text-lg font-bold ${strength.color}`}>
                Strength: {strength.strength}
              </span>
              <span className="text-lg text-gray-700 font-semibold">
                Length: {password.length}
              </span>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Character Types
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {key === 'uppercase' && 'Uppercase Letters (A-Z)'}
                  {key === 'lowercase' && 'Lowercase Letters (a-z)'}
                  {key === 'numbers' && 'Numbers (0-9)'}
                  {key === 'symbols' && 'Symbols (!@#$...)'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          🔐 Generate Password
        </button>

        {/* Password Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Password Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Use a unique password for each account</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator
