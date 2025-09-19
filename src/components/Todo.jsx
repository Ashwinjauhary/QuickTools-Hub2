import { useState, useEffect } from 'react'

function Todo() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('react-playground-todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('react-playground-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim()
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Todo App
          </h1>
          <p className="text-xl text-gray-600">Organize your tasks with style</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-xl font-medium bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 placeholder-gray-400"
                  placeholder="Add a new task..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 overflow-hidden"
                onClick={addTodo}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl">➕</span>
                  Add Task
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📝</div>
              <div className="text-2xl text-gray-500 font-medium mb-2">No tasks yet</div>
              <div className="text-lg text-gray-400">Add your first task above!</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Your Tasks</h3>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                  <span className="text-lg font-semibold text-gray-700">{todos.length} task{todos.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {todos.map((todo, index) => (
                <li key={todo.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex justify-between items-center p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-xl text-gray-800 font-medium flex-1">{todo.text}</span>
                    </div>
                    <button 
                      className="group/btn relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 overflow-hidden"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="text-xl">🗑️</span>
                        Delete
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Todo
