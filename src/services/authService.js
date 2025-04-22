import apiClient from './apiConfig';

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/admin/login/', credentials);
        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await apiClient.post('/admin/signup/', userData);
        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
        }
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};
