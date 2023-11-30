import React, { useState } from 'react';

const SalaryAnalysis = () => {
  const [selectedTable, setSelectedTable] = useState('JOBBOARD_POSITIONPAY'); // Set the initial value
  const [queryResults, setQueryResults] = useState([]);

  const executeQuery = async () => {
    try {
      console.log('Selected Table:', selectedTable); // Add this line
      const response = await fetch('/execute-aggregation-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table: selectedTable }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data)
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
      <label htmlFor="tableSelector">Select Table:</label>
      <select id="tableSelector" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="JobBoard_PositionPay">JobBoard_PositionPay</option>
        {/* Add other tables as needed */}
      </select>
      <button onClick={executeQuery}>Calculate Average Salary</button>
      <div>
        <h3>Query Results:</h3>
        {queryResults.map((result, index) => (
          <div key={index}>
            {result[0] ? `${result[0]}: ${result[1] ? `$${result[1].toFixed(2)}` : 'N/A'}` : 'Job Title N/A'}
          </div>
        ))}

      </div>
    </div>
  );
};

export default SalaryAnalysis;
