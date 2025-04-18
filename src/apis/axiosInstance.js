import axios from 'axios';

import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
