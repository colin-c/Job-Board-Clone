// JobPositionAnalysis.js

import React, { useState } from 'react';
import './JobPositionAnalysis.css'; // Import the CSS file

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
        <div className="job-position-analysis-container">
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
            {queryResults.length > 0 && (
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Total Job Positions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {queryResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result[0] || 'N/A'}</td>
                            <td>{result[1] || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobPositionAnalysis;
