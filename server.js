const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');  // Ensure node-fetch is installed by adding it to package.json

const app = express();
app.use(bodyParser.json());

// Endpoint to receive the access token from Insurance Quote app
app.post('/receive-token', (req, res) => {
    const accessToken = req.body.access_token; // Get the token from the POST request

    if (!accessToken) {
        return res.status(400).json({ error: 'No access token provided' });
    }

    // Make API call to Facebook to fetch user info
    const facebookApiUrl = `https://graph.facebook.com/me?fields=age_range,birthday,gender,likes,location,email,public_profile&access_token=${accessToken}`;

    fetch(facebookApiUrl)
        .then(response => response.json())
        .then(data => {
            // Send the user data back as a response (you can also store it in a database if needed)
            res.status(200).json({ user_info: data });
        })
        .catch(error => {
            console.error('Error fetching user info from Facebook:', error);
            res.status(500).json({ error: 'Failed to fetch user info' });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
