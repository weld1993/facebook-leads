const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Facebook app credentials
const appId = '889122959365705'; // Your Facebook App ID
const appSecret = 'a2c9737ad27b56673ac6373ecb9fadff'; // Your Facebook App Secret
const redirectUri = 'https://www.saphyreinsurancequote.com/oauth/callback'; // Your Redirect URL

app.get('/', (req, res) => {
    res.send(`
        <h1>Login with Facebook</h1>
        <a href="https://www.facebook.com/v11.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,public_profile,user_age_range,user_birthday,user_gender,user_likes,user_location">
            Login with Facebook
        </a>
    `);
});

// Handle Facebook OAuth callback
app.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;

    // Exchange the code for an access token
    const tokenResponse = await axios.get(`https://graph.facebook.com/v11.0/oauth/access_token`, {
        params: {
            client_id: appId,
            redirect_uri: redirectUri,
            client_secret: appSecret,
            code,
        },
    });

    const accessToken = tokenResponse.data.access_token;

    // Fetch user data
    const userDataResponse = await axios.get(`https://graph.facebook.com/me`, {
        params: {
            access_token: accessToken,
            fields: 'id,name,email,age_range,birthday,gender,likes,location',
        },
    });

    const userData = userDataResponse.data;

    // Display user info
    res.send(`
        <h1>User Info</h1>
        <p>ID: ${userData.id}</p>
        <p>Name: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        <p>Age Range: ${userData.age_range ? JSON.stringify(userData.age_range) : 'Not provided'}</p>
        <p>Birthday: ${userData.birthday ? userData.birthday : 'Not provided'}</p>
        <p>Gender: ${userData.gender ? userData.gender : 'Not provided'}</p>
        <p>Likes: ${userData.likes ? JSON.stringify(userData.likes.data) : 'Not provided'}</p>
        <p>Location: ${userData.location ? JSON.stringify(userData.location) : 'Not provided'}</p>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
