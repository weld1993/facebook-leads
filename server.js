const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the main page at the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Facebook Leads App! The app is working!');
});

// Route to handle the token receiving
app.post('/receive-token', (req, res) => {
  const accessToken = req.body.access_token;
  if (accessToken) {
    console.log('Received access token:', accessToken);
    res.json({ message: 'Access token received successfully.' });
  } else {
    res.status(400).json({ error: 'Access token is missing.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
