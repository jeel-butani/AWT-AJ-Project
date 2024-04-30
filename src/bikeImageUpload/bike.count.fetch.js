const axios = require('axios');

exports.getBikeCount = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/bikes/count');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching bike count');
  }
};