const axios = require('axios');

exports.getCarCount = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/cars/count');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching car count');
  }
};