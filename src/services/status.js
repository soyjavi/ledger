import { apiCall } from './modules';

export const status = async () => await apiCall({ service: 'status' });
