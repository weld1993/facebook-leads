const fetch = require('node-fetch');

// Function to fetch Facebook user data using the access token
const fetchFacebookUserData = async (accessToken) => {
  const url = `https://graph.facebook.com/me?fields=age_range,birthday,gender,location,email&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching user info:', data.error);
      return null;
    }

    console.log('Fetched Facebook User Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

module.exports = fetchFacebookUserData;
