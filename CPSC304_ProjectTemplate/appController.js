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

// Add Job Position endpoint
router.post('/add-job-position', async (req, res) => {
  const { title, description, salary, jobBoardLink, jobPostingLink } = req.body;

  try {
    const isAdded = await appService.addJobPosition(title, description, salary, jobBoardLink, jobPostingLink);

    if (isAdded) {
      res.status(201).json({ message: 'Job position added successfully' });
    } else {
      res.status(500).json({ message: 'Failed to add job position' });
    }
  } catch (error) {
    console.error('An error occurred during job position addition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View Notes endpoint
router.get('/get-notes', async (req, res) => {
  try {
    const notes = await appService.getNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error('An error occurred during note fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
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


module.exports = router;