import { useState } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const Button = ({ onClick, className, children }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="max-w-sm mx-auto bg-gray-800 rounded-2xl p-6 shadow-2xl">
      {/* Display */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6 border-4 border-gray-700">
        <div className="text-right text-5xl font-mono text-white overflow-hidden font-bold">
          {display}
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button onClick={clear} className="col-span-2 bg-gray-600 text-white hover:bg-gray-500">
          Clear
        </Button>
        <Button onClick={() => performOperation('÷')} className="bg-orange-500 text-white hover:bg-orange-600">
          ÷
        </Button>
        <Button onClick={() => performOperation('×')} className="bg-orange-500 text-white hover:bg-orange-600">
          ×
        </Button>

        {/* Row 2 */}
        <Button onClick={() => inputNumber(7)} className="bg-gray-700 text-white hover:bg-gray-600">
          7
        </Button>
        <Button onClick={() => inputNumber(8)} className="bg-gray-700 text-white hover:bg-gray-600">
          8
        </Button>
        <Button onClick={() => inputNumber(9)} className="bg-gray-700 text-white hover:bg-gray-600">
          9
        </Button>
        <Button onClick={() => performOperation('-')} className="bg-orange-500 text-white hover:bg-orange-600">
          -
        </Button>

        {/* Row 3 */}
        <Button onClick={() => inputNumber(4)} className="bg-gray-700 text-white hover:bg-gray-600">
          4
        </Button>
        <Button onClick={() => inputNumber(5)} className="bg-gray-700 text-white hover:bg-gray-600">
          5
        </Button>
        <Button onClick={() => inputNumber(6)} className="bg-gray-700 text-white hover:bg-gray-600">
          6
        </Button>
        <Button onClick={() => performOperation('+')} className="bg-orange-500 text-white hover:bg-orange-600">
          +
        </Button>

        {/* Row 4 */}
        <Button onClick={() => inputNumber(1)} className="bg-gray-700 text-white hover:bg-gray-600">
          1
        </Button>
        <Button onClick={() => inputNumber(2)} className="bg-gray-700 text-white hover:bg-gray-600">
          2
        </Button>
        <Button onClick={() => inputNumber(3)} className="bg-gray-700 text-white hover:bg-gray-600">
          3
        </Button>
        <Button onClick={handleEquals} className="row-span-2 bg-orange-500 text-white hover:bg-orange-600">
          =
        </Button>

        {/* Row 5 */}
        <Button onClick={() => inputNumber(0)} className="col-span-2 bg-gray-700 text-white hover:bg-gray-600">
          0
        </Button>
        <Button onClick={inputDecimal} className="bg-gray-700 text-white hover:bg-gray-600">
          .
        </Button>
      </div>
    </div>
  )
}

export default Calculator
