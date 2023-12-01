import React, { useState } from 'react';

const SalaryAnalysis = () => {
  const [minSalaryThreshold, setMinSalaryThreshold] = useState(80000); // Initial minimum salary threshold
  const [queryResults, setQueryResults] = useState([]);

  const executeQuery = async () => {
    try {
      const response = await fetch('/execute-having-salary-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ minSalaryThreshold }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Query Results:', data);
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
      <h2>Salary Analysis</h2>
      <label htmlFor="minSalaryThreshold">Minimum Salary Threshold:</label>
      <input
        type="number"
        id="minSalaryThreshold"
        value={minSalaryThreshold}
        onChange={(e) => setMinSalaryThreshold(e.target.value)}
      />
      <button onClick={executeQuery}>Find Job Positions</button>
      <div>
        <h3>Query Results:</h3>
        {queryResults.map((result, index) => (
          <div key={index}>
            {result[0] ? (
              `Job Title: ${result[0]}, Average Salary: ${
                result[1] ? `$${result[1].toFixed(2)}` : 'N/A'
              }`
            ) : (
              'Job Title N/A'
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryAnalysis;
