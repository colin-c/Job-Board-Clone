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
router.post('/add-note', async (req, res) => {
  const { title, description, userEmail } = req.body;

  try {
    const isAdded = await appService.addNote(title, description, userEmail);

    if (isAdded) {
      res.status(201).json({ message: 'Note added successfully' });
    } else {
      res.status(500).json({ message: 'Failed to add note' });
    }
  } catch (error) {
    console.error('An error occurred during note addition:', error);
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


module.exports = router;