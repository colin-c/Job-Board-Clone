// JobFilterComponent.js

import React, { useState } from 'react';
import './JobFilterComponent.css';

const JobFilterComponent = () => {
    // Handles SELECTION for JobBoard_PositionPay
    const [filters, setFilters] = useState({
        jobTitle: '',
        description: '',
        salary: '',
        jobBoardLink: '',
        jobPostingLink: ''
    });
    const [condition, setCondition] = useState('AND');
    const [jobData, setJobData] = useState([]);

    const handleFetchJobsData = async () => {
        const query = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&') + `&logicalOperator=${condition}`;

        const response = await fetch(`/filtered-jobboard-positionpay?${query}`);
        const data = await response.json();
        if (data.success) {
            setJobData(data.data);
        } else {
            console.error('Failed to fetch data');
        }
    };

    const updateFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }));
    };

    // Handles JOIN for Company, JobBoard, and JobBoard_Position
    const [companyName, setCompanyName] = useState('');
    const [companyJobData, setCompanyJobData] = useState([]);

    const handleFetchCompanyJobData = async () => {
        const response = await fetch(`/fetch-job-postings?companyName=${encodeURIComponent(companyName)}`);
        const data = await response.json();
        if (data.success) {
            setCompanyJobData(data.data);
        } else {
            console.error('Failed to fetch data');
        }
    };

    // Handles DIVISION to get all companies all users applied to
    const [companiesAllUsersApplied, setCompaniesAllUsersApplied] = useState([]);

    const fetchCompaniesAllUsersAppliedTo = async () => {
        try {
            const response = await fetch('/companies-all-users-applied');
            const data = await response.json();
            if (data.success) {
                setCompaniesAllUsersApplied(data.data);
            } else {
                console.error('Failed to fetch companies');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="job-filter-container">
            {/* SELECTION */}
            <div>
                <input
                    type="text"
                    value={filters.jobTitle}
                    onChange={(e) => updateFilter('jobTitle', e.target.value)}
                    placeholder="Enter Job Title"
                />
                <input
                    type="text"
                    value={filters.description}
                    onChange={(e) => updateFilter('description', e.target.value)}
                    placeholder="Enter Description"
                />
                <input
                    type="text"
                    value={filters.salary}
                    onChange={(e) => updateFilter('salary', e.target.value)}
                    placeholder="Enter Salary"
                />
                <input
                    type="text"
                    value={filters.jobBoardLink}
                    onChange={(e) => updateFilter('jobBoardLink', e.target.value)}
                    placeholder="Enter Job Board Link"
                />
                <input
                    type="text"
                    value={filters.jobPostingLink}
                    onChange={(e) => updateFilter('jobPostingLink', e.target.value)}
                    placeholder="Enter Job Posting Link"
                />

                <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>

                <button onClick={handleFetchJobsData}>Fetch Job Data</button>
            </div>

            {/* Display the fetched job data in a table */}
            {jobData.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Description</th>
                        <th>Salary</th>
                        <th>Job Board Link</th>
                        <th>Job Posting Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobData.map((item, index) => (
                        <tr key={index}>
                            {item.map((column, colIndex) => (
                                <td key={colIndex}>{column}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* JOIN */}
            <div>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter Company Name"
                />
                <button onClick={handleFetchCompanyJobData}>Fetch Job Postings by Company</button>
            </div>

            {/* Display the fetched company job data in a table */}
            {companyJobData.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Job Posting Link</th>
                        <th>Deadline</th>
                        <th>Job Board Name</th>
                        <th>Company Name</th>
                        <th>Company Website</th>
                        <th>Company Email</th>
                        <th>Company Address</th>
                        <th>Company Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companyJobData.map((item, index) => (
                        <tr key={index}>
                            {item.map((column, colIndex) => (
                                <td key={colIndex}>{column}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* DIVISION */}
            <div>
                <button onClick={fetchCompaniesAllUsersAppliedTo}>Find Companies Where All Users Have Applied</button>
            </div>

            {/* Display the fetched companies data in a table */}
            {companiesAllUsersApplied.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        {/* Add more columns as needed */}
                    </tr>
                    </thead>
                    <tbody>
                    {companiesAllUsersApplied.map((company, index) => (
                        <tr key={index}>
                            <td>{company[0]}</td>
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobFilterComponent;