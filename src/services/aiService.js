import apiClient from './apiConfig';

export const sendChatMessage = async (message) => {
    try {
        const response = await apiClient.post('/ai/chat/', { message });
        return response.data;
    } catch (error) {
        console.error('Chat error:', error);
        throw error;
    }
};
