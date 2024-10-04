const fetch = require('node-fetch');
const accessToken = 'USER_ACCESS_TOKEN'; // You will replace this with the actual access token from OAuth flow

// The Facebook Graph API URL to request user info
const url = `https://graph.facebook.com/me?fields=age_range,birthday,gender,likes,location,email,public_profile&access_token=${accessToken}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // This will contain the user's info
  })
  .catch(error => {
    console.error('Error fetching user info:', error);
  });
