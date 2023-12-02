// ProjectionSelector.js

import React, { useState, useEffect } from 'react';
import './ProjectionSelector.css'; // Import the CSS file

const ProjectionSelector = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [loadedTableData, setLoadedTableData] = useState([]);

  useEffect(() => {
    // Fetch tables from the backend when the component mounts
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch('/get-tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      } else {
        console.error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('An error occurred during table fetch:', error);
    }
  };

  const fetchAttributes = async () => {
    try {
      const response = await fetch(`/get-attributes/${selectedTable}`);
      if (response.ok) {
        const data = await response.json();
        setAttributes(data);
      } else {
        console.error('Failed to fetch attributes');
      }
    } catch (error) {
      console.error('An error occurred during attribute fetch:', error);
    }
  };

  const handleTableChange = (event) => {
    const table = event.target.value;
    setSelectedTable(table);
  };

  const handleAttributeChange = (event) => {
    const attribute = event.target.value;
    setSelectedAttributes((prevSelected) => {
      if (prevSelected.includes(attribute)) {
        return prevSelected.filter((a) => a !== attribute);
      } else {
        return [...prevSelected, attribute];
      }
    });
  };

  const submitProjection = async () => {
    try {
      const response = await fetch('/submit-projection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table: selectedTable,
          attributes: selectedAttributes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setLoadedTableData(result);
        console.log('Projection submitted successfully');
      } else {
        console.error('Failed to submit projection');
      }
    } catch (error) {
      console.error('An error occurred during projection submission:', error);
    }
  };

  useEffect(() => {
    if (selectedTable) {
      fetchAttributes();
    }
  }, [selectedTable]);

  return (
      <div className="projection-selector-container">
        <h2>Projection Selector</h2>
        <div>
          <label>Select Table:</label>
          <select value={selectedTable} onChange={handleTableChange}>
            <option value="" disabled>Select a table</option>
            {tables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
            ))}
          </select>
        </div>
        {selectedTable && (
            <div className="select-attributes">
              <label>Select Attributes:</label>
              {attributes.map((attribute) => (
                  <label key={attribute}>
                    <input
                        type="checkbox"
                        value={attribute}
                        checked={selectedAttributes.includes(attribute)}
                        onChange={handleAttributeChange}
                    />
                    {attribute}
                  </label>
              ))}
            </div>
        )}
        <div>
          <button onClick={submitProjection}>Submit Projection</button>
        </div>
        {loadedTableData.length > 0 && (
            <div>
              <table>
                <thead>
                <tr>
                  {selectedAttributes.map((attr) => (
                      <th key={attr}>{attr}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {loadedTableData.map((row, index) => (
                    <tr key={index}>
                      {row.map((value, colIndex) => (
                          <td key={colIndex}>{value}</td>
                      ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default ProjectionSelector;
