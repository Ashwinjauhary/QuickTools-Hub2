import { useState } from 'react'

function ColorChanger() {
  const [backgroundColor, setBackgroundColor] = useState('#3498db')

  const colors = [
    { name: 'Blue', value: '#3498db' },
    { name: 'Red', value: '#e74c3c' },
    { name: 'Green', value: '#27ae60' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Orange', value: '#f39c12' },
    { name: 'Pink', value: '#e91e63' },
    { name: 'Teal', value: '#1abc9c' },
    { name: 'Indigo', value: '#3f51b5' }
  ]

  const handleColorChange = (color) => {
    setBackgroundColor(color)
  }

  const handleSelectChange = (e) => {
    setBackgroundColor(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Color Changer
          </h1>
          <p className="text-xl text-gray-600">Interactive color palette with smooth transitions</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="text-center">
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-lg opacity-30 scale-110"></div>
              <div 
                className="relative w-80 h-80 md:w-96 md:h-96 mx-auto rounded-3xl border-4 border-white/50 transition-all duration-500 flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform hover:scale-105"
                style={{ backgroundColor }}
              >
                <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                  <div className="text-3xl font-bold">{backgroundColor}</div>
                  <div className="text-sm opacity-80 mt-1">Current Color</div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose a Color</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 justify-center">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className="group relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-transparent hover:border-white/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-xl hover:shadow-2xl overflow-hidden"
                    style={{ backgroundColor: color.value }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">✓</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6">
              <label className="block text-lg font-semibold text-gray-700 mb-4">Or select from dropdown:</label>
              <select 
                className="w-full max-w-xs mx-auto px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                value={backgroundColor}
                onChange={handleSelectChange}
              >
                {colors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorChanger
