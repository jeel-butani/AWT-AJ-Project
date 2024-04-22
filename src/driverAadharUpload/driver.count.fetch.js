const axios = require('axios');

exports.getDriverCount = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/driver/countdrivers');
    return response.data.count;
  } catch (error) {
    throw new Error('Error fetching user count');
  }
};