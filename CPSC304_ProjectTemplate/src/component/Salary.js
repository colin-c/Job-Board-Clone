import React, { useState } from 'react';
import './Salary.css'; // Import the CSS file

const Salary = () => {
    const [selectedTable, setSelectedTable] = useState('JOBBOARD_POSITIONPAY'); // Set the initial value
    const [queryResults, setQueryResults] = useState([]);

    const executeQuery = async () => {
        try {
            const response = await fetch('/execute-aggregation-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ table: selectedTable }),
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
        <div className="Salary">
            <h2>Salary</h2>
            <label htmlFor="tableSelector">Select Table:</label>
            <select id="tableSelector" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
                <option value="JobBoard_PositionPay">JobBoard_PositionPay</option>
                {/* Add other tables as needed */}
            </select>
            <button onClick={executeQuery}>Calculate Average Salary</button>
            {queryResults.length > 0 && (
                <div>
                    <h3>Salary Analysis Results</h3>
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
                </div>
            )}
        </div>
    );
};

export default Salary;
