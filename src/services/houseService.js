import axios from 'axios';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const fetchHouses = async () => {
  console.log('Attempting to fetch houses from:', `${API_URL}/api/houses/`);
  try {
    const response = await axiosInstance.get('/api/houses/');
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      config: error.config,
      response: error.response
    });
    throw new Error(`Failed to fetch houses: ${error.message}`);
  }
};
