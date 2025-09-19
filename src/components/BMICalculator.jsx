import { useState } from 'react'

function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('metric')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (!h || !w || h <= 0 || w <= 0) {
      alert('Please enter valid height and weight values!')
      return
    }

    let bmiValue
    if (unit === 'metric') {
      // BMI = weight(kg) / height(m)²
      bmiValue = w / ((h / 100) ** 2)
    } else {
      // BMI = (weight(lbs) / height(in)²) * 703
      bmiValue = (w / (h ** 2)) * 703
    }

    setBmi(bmiValue.toFixed(1))

    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory('Underweight')
    } else if (bmiValue < 25) {
      setCategory('Normal weight')
    } else if (bmiValue < 30) {
      setCategory('Overweight')
    } else {
      setCategory('Obese')
    }
  }

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Underweight':
        return 'text-blue-600 bg-blue-100'
      case 'Normal weight':
        return 'text-green-600 bg-green-100'
      case 'Overweight':
        return 'text-yellow-600 bg-yellow-100'
      case 'Obese':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const reset = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          BMI Calculator
        </h2>

        {/* Unit Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Unit System
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={unit === 'metric'}
                onChange={(e) => setUnit(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Metric (kg, cm)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={(e) => setUnit(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Imperial (lbs, inches)</span>
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '170' : '67'}
              className="w-full px-6 py-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold bg-white shadow-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
              className="w-full px-6 py-4 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-xl font-semibold bg-white shadow-lg"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Calculate BMI
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {bmi && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Your BMI Results
            </h3>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-4 bg-white border-4 border-blue-200 rounded-2xl p-6 shadow-lg">
                {bmi}
              </div>
              <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getCategoryColor(category)}`}>
                {category}
              </div>
            </div>

            {/* BMI Chart */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3">BMI Categories:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>Underweight</span>
                  <span className="font-mono">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span>Normal weight</span>
                  <span className="font-mono">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span>Overweight</span>
                  <span className="font-mono">25.0 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span>Obese</span>
                  <span className="font-mono">≥ 30.0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Disclaimer:</strong> BMI is a screening tool and may not be accurate for everyone. 
            It doesn't account for muscle mass, bone density, or other factors. 
            Consult with a healthcare professional for personalized health advice.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BMICalculator
