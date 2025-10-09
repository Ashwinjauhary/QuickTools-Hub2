import { useState, useEffect } from 'react';

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('react-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('react-notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (currentNote.title.trim() === '' && currentNote.content.trim() === '') return;
    
    const newNote = {
      id: Date.now(),
      title: currentNote.title,
      content: currentNote.content,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote({ id: null, title: '', content: '' });
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleUpdateNote = () => {
    if (currentNote.title.trim() === '' && currentNote.content.trim() === '') return;
    
    setNotes(notes.map(note => 
      note.id === currentNote.id 
        ? { ...note, title: currentNote.title, content: currentNote.content } 
        : note
    ));
    
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (isEditing && currentNote.id === id) {
      setCurrentNote({ id: null, title: '', content: '' });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Notes App</h1>
        
        {/* Note Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Note' : 'Add New Note'}
          </h2>
          
          <div className="mb-4">
            <input
              type="text"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Note title"
            />
            <textarea
              value={currentNote.content}
              onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your note here..."
            ></textarea>
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex-1"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
              >
                Add Note
              </button>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Notes ({notes.length})</h2>
          
          {notes.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">No notes yet. Create your first note above!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-xl shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <span className="text-sm text-gray-500">{note.date}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line mb-3">{note.content}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesApp;