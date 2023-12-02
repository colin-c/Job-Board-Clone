import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddJob.css'; // Import a CSS file for styling

const AddJob = () => {
    const history = useNavigate();
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState(0); // Assuming salary is a number
    const [jobBoardLink, setJobBoardLink] = useState('');
    const [jobPostingLink, setJobPostingLink] = useState('');
    const [message, setMessage] = useState(''); // Combined message state

    const addJob = async () => {
        try {
            const response = await fetch('/add-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobTitle,
                    description,
                    salary,
                    jobBoardLink,
                    jobPostingLink,
                }),
            });

            if (response.ok) {
                console.log(`Job "${jobTitle}" added successfully`);
                setMessage(`Job "${jobTitle}" added successfully`);
                // Optionally, you can clear the form fields after successful addition
                setJobTitle('');
                setDescription('');
                setSalary('');
                setJobBoardLink('');
                setJobPostingLink('');
            } else {
                const errorData = await response.json();
                console.error('Failed to add job:', errorData.message);
                setMessage(`Failed to add job: ${errorData.message}`);
            }
        } catch (error) {
            console.error('An error occurred during job addition:', error);
            setMessage(`An error occurred during job addition: ${error.message}`);
        }
    };

    return (
        <div className="center-content">
            <h2>New Posting</h2>
            {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}

            <div className="form-container">
                <div className="form-group">
                    <label>Job Title:</label>
                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>

                <br />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />

                <div className="form-group">
                    <label>Job Board Link:</label>
                    <input type="text" value={jobBoardLink} onChange={(e) => setJobBoardLink(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Job Posting Link:</label>
                    <input type="text" value={jobPostingLink} onChange={(e) => setJobPostingLink(e.target.value)} />
                </div>

                <br />

                <button onClick={addJob}>Add Job</button>
            </div>
        </div>
    );


};

export default AddJob;