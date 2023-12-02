import React, { useState } from 'react';
import './SalaryAnalysis.css'; // Import the CSS file

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
        <div className="salary-analysis-container">
            <h2>Salary Analysis</h2>
            <label htmlFor="minSalaryThreshold">Minimum Salary Threshold:</label>
            <input
                type="number"
                id="minSalaryThreshold"
                value={minSalaryThreshold}
                onChange={(e) => setMinSalaryThreshold(e.target.value)}
            />
            <button onClick={executeQuery}>Find Job Positions</button>
            {queryResults.length > 0 && (
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Average Salary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queryResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result[0] || 'N/A'}</td>
                            <td>{result[1] ? `$${result[1].toFixed(2)}` : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalaryAnalysis;
