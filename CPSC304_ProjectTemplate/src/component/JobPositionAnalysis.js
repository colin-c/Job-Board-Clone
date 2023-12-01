// JobPositionAnalysis.js

import React, { useState } from 'react';

const JobPositionAnalysis = () => {
  const [queryResults, setQueryResults] = useState([]);
  const [constraint, setConstraint] = useState(1); // Initial constraint value

  const executeQuery = async () => {
    try {
      console.log('Executing query...');
      const response = await fetch('/execute-nested-aggregation-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ constraint }),
      });

      if (response.ok) {
        const data = await response.json();
        setQueryResults(data);
      } else {
        console.error('Failed to execute query');
      }
    } catch (error) {
      console.error('Error during query execution:', error);
    }
  };

  return (
    <div>
      <h2>Job Position Analysis</h2>
      <label>
        Min Positions Available:
        <input
          type="number"
          value={constraint}
          onChange={(e) => setConstraint(e.target.value)}
        />
      </label>
      <button onClick={executeQuery}>Find Total Job Positions by Company</button>
      <div>
        <h3>Query Results:</h3>
        {queryResults.map((result, index) => (
          <div key={index}>
            {result[0] ? `${result[0]}: ${result[1]}` : 'Company N/A'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPositionAnalysis;
