// DisplayTable.js

import React, { useState, useEffect } from 'react';

const DisplayTable = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the backend when the component mounts
    fetchAndDisplayNotes();
  }, []);

  const fetchAndDisplayNotes = async () => {
    try {
      const response = await fetch('/get-notes'); // Adjust the endpoint based on your backend
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('An error occurred during note fetch:', error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.NOTEID}>
              <td>{note.TITLE}</td>
              <td>{note.DESCRIPTION}</td>
              <td>{note.USEREMAIL}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
