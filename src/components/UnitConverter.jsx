import { useState } from 'react'

function UnitConverter() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [type, setType] = useState('cmToInch')

  const convert = () => {
    let res = ''
    const value = parseFloat(input)
    if (isNaN(value)) {
      setResult('Please enter a valid number')
      return
    }
    switch (type) {
      case 'cmToInch':
        res = (value / 2.54).toFixed(2) + ' in'
        break
      case 'inchToCm':
        res = (value * 2.54).toFixed(2) + ' cm'
        break
      case 'kgToLbs':
        res = (value * 2.205).toFixed(2) + ' lbs'
        break
      case 'lbsToKg':
        res = (value / 2.205).toFixed(2) + ' kg'
        break
      default:
        res = 'Invalid conversion'
    }
    setResult(res)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <h1 className="text-4xl font-bold mb-6">🔄 Unit Converter</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="w-full px-3 py-2 border rounded-lg mb-4"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4"
        >
          <option value="cmToInch">Centimeter ➝ Inch</option>
          <option value="inchToCm">Inch ➝ Centimeter</option>
          <option value="kgToLbs">Kilogram ➝ Pounds</option>
          <option value="lbsToKg">Pounds ➝ Kilogram</option>
        </select>
        <button
          onClick={convert}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Convert
        </button>
        {result && (
          <div className="mt-4 text-lg font-semibold text-gray-800">
            Result: <span className="text-green-700">{result}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UnitConverter
