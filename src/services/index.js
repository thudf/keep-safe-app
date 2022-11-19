import axios from 'axios';
import apiConfig from '../../config/api';

const api = axios.create({
  baseURL: `${apiConfig.apiUrl}`,
});

export default api;