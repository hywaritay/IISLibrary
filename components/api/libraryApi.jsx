import axios from 'axios';

const API_BASE_URL = 'https://9005-197-215-23-119.ngrok-free.app/api';

export const getItems = async () => {
    return await axios.get(`${API_BASE_URL}/IISLib`);
};

export const getItem = async (id) => {
    return await axios.get(`${API_BASE_URL}/IISLib/${id}`);
};

export const createItem = async (formData) => {
    console.log(formData);
    return await axios.post(`${API_BASE_URL}/IISLib/Add`, formData);
};


export const updateItem = async (formData) => {
    return await axios.put(`${API_BASE_URL}/IISLib/Update`, formData);
};

export const deleteItem = async (id) => {
    return await axios.delete(`${API_BASE_URL}/IISLib/Delete/?id=${id}`);
};
