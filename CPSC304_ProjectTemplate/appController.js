const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints

// Checks for Database Connection
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

// Sign In endpoint
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const isAuthenticated = await appService.signIn(email, password);

        if (isAuthenticated) {
            res.status(200).json({ message: 'Successfully signed in' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('An error occurred during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Sign Up endpoint
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const isRegistered = await appService.signUp(email, password);

        if (isRegistered) {
            res.status(201).json({ email, message: 'User successfully registered' });
        } else {
            res.status(500).json({ message: 'Failed to register user' });
        }
    } catch (error) {
        console.error('An error occurred during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add Note endpoint
router.post('/add-job', async (req, res) => {
    const { jobTitle, description, salary, jobBoardLink, jobPostingLink } = req.body;

    try {
        const isAdded = await appService.addJob(jobTitle, description, salary, jobBoardLink, jobPostingLink);

        if (isAdded) {
            res.status(201).json({ message: `Job "${jobTitle}" added successfully` });
        } else {
            res.status(500).json({ message: `Failed to add job "${jobTitle}"` });
        }
    } catch (error) {
        console.error('An error occurred during job addition:', error);
        res.status(500).json({ message: 'Failed to add job. Please try again.' });
    }
});

// View Notes endpoint
router.get('/get-jobs', async (req, res) => {
    try {
        const notes = await appService.getJobBoard_PositionPay();
        res.status(200).json(notes);
    } catch (error) {
        console.error('An error occurred during note fetch:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/delete-job', async (req, res) => {
    const { jobTitle, jobBoardLink, jobPostingLink } = req.body;

    try {
        const isDeleted = await appService.deleteJob(jobTitle, jobBoardLink, jobPostingLink);

        if (isDeleted) {
            res.status(200).json({ message: `Job "${jobTitle}" deleted successfully` });
        } else {
            res.status(500).json({ message: `Failed to delete job "${jobTitle}"` });
        }
    } catch (error) {
        console.error('An error occurred during job deletion:', error);
        res.status(500).json({ message: 'Failed to delete job. Please try again.' });
    }
});

router.post('/update-job', async (req, res) => {
    const { jobTitle, description, salary, jobBoardLink, jobPostingLink } = req.body;

    try {
        // Ensure that jobTitle and jobPostingLink are present in the request body
        if (!jobTitle || !jobPostingLink) {
            const missingParams = [];
            if (!jobTitle) missingParams.push('jobTitle');
            if (!jobPostingLink) missingParams.push('jobPostingLink');

            return res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}.` });
        }

        const isUpdated = await appService.updateJob(jobTitle, description, salary, jobBoardLink, jobPostingLink);

        if (isUpdated) {
            res.status(200).json({ message: `Job "${jobTitle}" updated successfully for JobPostingLink "${jobPostingLink}"` });
        } else {
            res.status(500).json({ message: `Failed to update job "${jobTitle}" for JobPostingLink "${jobPostingLink}"` });
        }
    } catch (error) {
        console.error('An error occurred during job update:', error);
        res.status(500).json({ message: `Failed to update job for JobPostingLink "${jobPostingLink}". Please try again.` });
    }
});


// get tables
router.get('/get-tables', async (req, res) => {
  try {
    const tables = await appService.getTables();
    res.status(200).json(tables);
  } catch (error) {
    console.error('An error occurred during table fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get attributes
router.get('/get-attributes/:table', async (req, res) => {
  const { table } = req.params;
  try {
    const attributes = await appService.getAttributes(table);
    res.status(200).json(attributes);
  } catch (error) {
    console.error('An error occurred during attribute fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to handle submitting projection
router.post('/submit-projection', async (req, res) => {
  const { table, attributes } = req.body;

  // Basic validation
  if (!table || !attributes || !Array.isArray(attributes)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Process the projection in the service
    const result = await appService.processProjection(table, attributes);

    // Respond with the processed data
    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing projection:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to execute aggregation query
router.post('/execute-aggregation-query', async (req, res) => {
  const { table } = req.body;
  console.log('Express Table:', table);
  try {
    const queryResults = await appService.calculateAverageSalary(table);
    console.log("ExpressReturn", queryResults)
    res.status(200).json(queryResults);
  } catch (error) {
    console.error('Error during aggregation query execution:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to execute aggregation query with HAVING for salary
router.post('/execute-having-salary-query', async (req, res) => {
  const { minSalaryThreshold } = req.body;

  try {
    const queryResults = await appService.findJobPositionsAboveSalaryThreshold(minSalaryThreshold);
    res.status(200).json(queryResults);
  } catch (error) {
    console.error('Error during HAVING salary query execution:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to execute nested aggregation query
router.post('/execute-nested-aggregation-query', async (req, res) => {
  try {
    const { constraint } = req.body;
    const queryResults = await appService.findTotalJobPositionsByCompanyWithConstraint(constraint);
    console.log('Controller', queryResults);
    res.status(200).json(queryResults);
  } catch (error) {
    console.error('Error during nested aggregation query execution:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/fetch-job-postings', async (req, res) => {
    try {
        const { companyName } = req.query;
        const jobPostings = await appService.getJobPostingsByCompany(companyName);
        res.json({ success: true, data: jobPostings });
    } catch (err) {
        console.error("Error fetching job postings:", err);
        res.status(500).json({ success: false, message: "Failed to fetch job postings" });
    }
});

router.get('/filtered-jobboard-positionpay', async (req, res) => {
    try {
        const filterConditions = req.query; // All filter conditions
        const filteredData = await appService.getFilteredJobBoardPositionPay(filterConditions);
        res.json({ success: true, data: filteredData });
    } catch (err) {
        console.error("Error fetching filtered data:", err);
        res.status(500).json({ success: false, message: "Failed to fetch filtered data" });
    }
});

router.get('/companies-all-users-applied', async (req, res) => {
    try {
        const companies = await appService.getCompaniesAllUsersAppliedTo();
        res.json({ success: true, data: companies });
    } catch (err) {
        console.error("Error fetching companies all users applied to:", err);
        res.status(500).json({ success: false, message: "Failed to fetch data" });
    }
});

module.exports = router;