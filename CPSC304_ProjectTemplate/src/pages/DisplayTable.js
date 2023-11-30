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
      const response = await fetch('/get-notes');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
            <th>Note ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              {/* Access elements using numeric indices */}
              <td>{note[0]}</td> {/* NoteID */}
              <td>{note[1]}</td> {/* Title */}
              <td>{note[2]}</td> {/* Description */}
              <td>{note[3]}</td> {/* UserEmail */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
