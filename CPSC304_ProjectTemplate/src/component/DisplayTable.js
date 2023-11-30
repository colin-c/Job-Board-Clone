// DisplayTable.js
import React, { useState, useEffect } from 'react';

const DisplayTable = () => {
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    // Fetch job positions from the backend when the component mounts
    fetchAndDisplayJobPositions();
  }, []);

  const fetchAndDisplayJobPositions = async () => {
    try {
      const response = await fetch('/get-notes');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobPositions(data);
      } else {
        console.error('Failed to fetch job positions');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('An error occurred during job position fetch:', error);
    }
  };

  return (
    <div>
      <h2>Job Positions</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Job Board Link</th>
            <th>Job Posting Link</th>
          </tr>
        </thead>
        <tbody>
          {jobPositions.map((position, index) => (
            <tr key={index}>
              <td>{position[0]}</td> {/* JobTitle */}
              <td>{position[1]}</td> {/* Description */}
              <td>{position[2]}</td> {/* Salary */}
              <td>{position[3]}</td> {/* JobBoardLink */}
              <td>{position[4]}</td> {/* JobPostingLink */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
