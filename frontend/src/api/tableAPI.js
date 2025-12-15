import axios from './axiosClient';

// All routes use /api/v1/tables base path (from axiosClient)
export const addTable = (data) => axios.post('/tables', data);
export const getTablesByRestaurant = (restaurantId) => axios.get(`/tables?restaurantId=${restaurantId}`);
export const getTable = (id) => axios.get(`/tables/${id}`);
export const updateTable = (id, data) => axios.put(`/tables/${id}`, data);
export const deleteTable = (id) => axios.delete(`/tables/${id}`);