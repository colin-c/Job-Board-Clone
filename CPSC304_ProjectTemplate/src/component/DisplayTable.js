// DisplayTable.js
import React, { useState, useEffect } from 'react';
import './DisplayTable.css';

const DisplayTable = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Combine success messages into one state
  const [updateValues, setUpdateValues] = useState({
    jobTitle: '',
    jobPostingLink: '',
    description: '',
    salary: '',
    jobBoardLink: '',
  });

  useEffect(() => {
    // Fetch job positions from the backend when the component mounts
    fetchAndDisplayJobPositions();
  }, []);

  const fetchAndDisplayJobPositions = async () => {
    try {
      const response = await fetch('/get-jobs');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setJobPositions(data);
        // Clear success message when refreshing
        setSuccessMessage('');
      } else {
        console.error('Failed to fetch job positions');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('An error occurred during job position fetch:', error);
    }
  };

  const handleRefresh = () => {
    // Clear success message on refresh
    setSuccessMessage('');
    fetchAndDisplayJobPositions();
  };

  const handleDelete = async (jobTitle, jobBoardLink, jobPostingLink) => {
    try {
      const response = await fetch('/delete-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          jobBoardLink,
          jobPostingLink,
        }),
      });

      if (response.ok) {
        console.log(`Job "${jobTitle}" deleted successfully`);

        // Fetch updated job positions after deletion
        await fetchAndDisplayJobPositions();

        // Set the success message after the table has been updated
        setSuccessMessage('Deletion Successful');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete job:', errorData.message);
        setSuccessMessage(`Failed to delete job: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred during job deletion:', error);
      setSuccessMessage(`An error occurred during job deletion: ${error.message}`);
    }
  };

  const handleUpdate = async () => {
    const { jobTitle, jobPostingLink, description, salary, jobBoardLink } = updateValues;

    // Check if the jobBoardLink exists in the current job positions
    const jobBoardLinkExists = jobPositions.some((position) => position[3] === jobBoardLink);

    if (!jobBoardLinkExists) {
      // Display an error message if the jobBoardLink doesn't exist
      setSuccessMessage('Update Failed: Job Board Link does not exist');
      return;
    }

    try {
      const response = await fetch('/update-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          jobPostingLink,
          description,
          salary,
          jobBoardLink,
        }),
      });

      if (response.ok) {
        console.log(`Job "${jobTitle}" updated successfully`);

        // Fetch updated job positions after update
        await fetchAndDisplayJobPositions();

        // Set the success message after the table has been updated
        setSuccessMessage('Update Successful');

        // Reset updateValues to close the update form
        setUpdateValues({
          jobTitle: '',
          jobPostingLink: '',
          description: '',
          salary: '',
          jobBoardLink: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to update job:', errorData.message);
        setSuccessMessage(`Failed to update job: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred during job update:', error);
      setSuccessMessage(`An error occurred during job update: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
      <div className="center-container">
        <div className="title-container">
          <h2>Job Positions</h2>
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
        {successMessage && (
            <p style={{ color: successMessage.includes('Failed') ? 'red' : 'green' }}>
              {successMessage}
            </p>
        )}
        <table className="job-table">
          <thead>
          <tr>
            <th>Job Title</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Job Board Link</th>
            <th>Job Posting Link</th>
            <th>Action</th>
            <th>Action</th> {/* New column for Update */}
          </tr>
          </thead>
          <tbody>
          {jobPositions.map((position, index) => (
              <tr key={index}>
                <td>{position[0]}</td>
                <td>{position[1]}</td>
                <td>{position[2]}</td>
                <td>{position[3]}</td>
                <td>{position[4]}</td>
                <td>
                  <button
                      onClick={() =>
                          handleDelete(
                              position[0],
                              position[3],
                              position[4]
                          )
                      }
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                      onClick={() => {
                        setUpdateValues({
                          jobTitle: position[0],
                          jobPostingLink: position[4],
                          description: position[1],
                          salary: position[2],
                          jobBoardLink: position[3],
                        });
                      }}
                  >
                    Update
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        {/* Update Form */}
        {updateValues.jobTitle && (
            <div className="update-form">
              <h3>Update Job</h3>
              <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={updateValues.description}
                    onChange={handleInputChange}
                />
              </label>
              <label>
                Salary:
                <input
                    type="number"
                    name="salary"
                    value={updateValues.salary}
                    onChange={handleInputChange}
                />
              </label>
              <label>
                Job Board Link:
                <input
                    type="text"
                    name="jobBoardLink"
                    value={updateValues.jobBoardLink}
                    onChange={handleInputChange}
                />
              </label>
              <button onClick={handleUpdate}>Update</button>
            </div>
        )}
      </div>
  );
};

export default DisplayTable;