import axios from 'axios';

import Config from 'react-native-config';

console.log('API_BASE_URL:', Config.API_BASE_URL);

const instance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
