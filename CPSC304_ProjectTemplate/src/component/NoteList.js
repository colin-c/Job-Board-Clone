// Import the necessary hooks from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const addNote = async () => {
    try {
      const response = await fetch('/add-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          userEmail,
        }),
      });

      if (response.ok) {
        console.log('Note added successfully');
        history.push('/');
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('An error occurred during note addition:', error);
    }
  };

  const viewNotes = () => {
    // Redirect to the "/display-notes" route
    history('/display-notes');
  };

  return (
    <div>
      <h2>Add New Note</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <label>User Email:</label>
      <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      <br />
      <button onClick={addNote}>Add Note</button>
      {/* Call viewNotes when the button is clicked */}
      <button onClick={viewNotes}>View Notes</button>
    </div>
  );
};

export default AddNote;
