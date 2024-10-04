const express = require('express');
const fetchFacebookUserData = require('./app'); // Import the function from app.js
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the main page at the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Facebook Leads App! The app is working!');
});

// Route to handle the token receiving
app.post('/receive-token', async (req, res) => {
  const accessToken = req.body.access_token;
  if (accessToken) {
    console.log('Received access token:', accessToken);

    // Fetch user data from Facebook
    const userData = await fetchFacebookUserData(accessToken);

    if (userData) {
      res.json({
        message: 'Access token received successfully.',
        user_data: userData, // Return user data fetched from Facebook
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch user data from Facebook.' });
    }
  } else {
    res.status(400).json({ error: 'Access token is missing.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
