const axios = require('axios');

exports.getUserCount = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/user/countUsers');
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching user count');
  }
};