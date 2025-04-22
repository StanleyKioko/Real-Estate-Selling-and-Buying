import apiClient from './apiConfig';

export const fetchHouses = async () => {
    try {
        const response = await apiClient.get('/houses/');
        return response.data;
    } catch (error) {
        console.error('Error fetching houses:', error);
        throw error;
    }
};

export const searchHouses = async (searchParams) => {
    try {
        const response = await apiClient.get('/search/', { params: searchParams });
        return response.data;
    } catch (error) {
        console.error('Error searching houses:', error);
        throw error;
    }
};

export const addHouse = async (houseData) => {
    try {
        const response = await apiClient.post('/houses/add/', houseData);
        console.log('House added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding house:', error.response?.data || error.message);
        throw error;
    }
};
