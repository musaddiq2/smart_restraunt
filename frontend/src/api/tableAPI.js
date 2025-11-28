import axios from './axiosClient';


export const addTable = (data) => axios.post('/api/v1/tables', data);
export const getTablesByRestaurant = (restaurantId) => axios.get(`/api/v1/tables/restaurant/${restaurantId}`);
export const getTable = (id) => axios.get(`/api/v1/tables/${id}`);
export const deleteTable = (id) => axios.delete(`/api/v1/tables/${id}`);