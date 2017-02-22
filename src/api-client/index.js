import Config from 'react-native-config';

import Client from './Client';

const url = Config.FEUC_API_URL || 'http://localhost:3000';
export default new Client(url);
