// Import the necessary hooks from 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJobPosition = () => {
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [jobBoardLink, setJobBoardLink] = useState('');
  const [jobPostingLink, setJobPostingLink] = useState('');

  const addJobPosition = async () => {
    try {
      const response = await fetch('/add-job-position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          salary,
          jobBoardLink,
          jobPostingLink,
        }),
      });

      if (response.ok) {
        console.log('Job position added successfully');
        history.push('/');
      } else {
        console.error('Failed to add job position');
      }
    } catch (error) {
      console.error('An error occurred during job position addition:', error);
    }
  };

  return (
    <div>
      <h2>Add New Job Position</h2>
      <label>Job Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <label>Salary:</label>
      <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <br />
      <label>Job Board Link:</label>
      <input type="text" value={jobBoardLink} onChange={(e) => setJobBoardLink(e.target.value)} />
      <br />
      <label>Job Posting Link:</label>
      <input type="text" value={jobPostingLink} onChange={(e) => setJobPostingLink(e.target.value)} />
      <br />
      <button onClick={addJobPosition}>Add Job Position</button>
    </div>
  );
};

export default AddJobPosition;
