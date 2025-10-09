import { useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [editMode, setEditMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !number.trim()) return;

    if (editMode !== null) {
      // Edit existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editMode] = { name, number };
      setContacts(updatedContacts);
      setEditMode(null);
    } else {
      // Add new contact
      setContacts([...contacts, { name, number }]);
    }

    setName('');
    setNumber('');
  };

  const handleEdit = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setNumber(contact.number);
    setEditMode(index);
  };

  const handleDelete = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
    if (editMode === index) {
      setName('');
      setNumber('');
      setEditMode(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">📞 Contact List</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name (eg. Ashwin Jauhary)"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number (eg. 95556 81211)"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editMode !== null ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contacts ({contacts.length})</h2>
          
          {contacts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No contacts yet. Add some above!</p>
          ) : (
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-gray-600">{contact.number}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
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

export default ContactList;