import { dataService } from './data.service';

export const getProfile = () => dataService.get('/api/profile').then(successHandler);
export const saveProfile = values => dataService.put('/api/profile', values).then(successHandler);

const successHandler = res => res.data;
