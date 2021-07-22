const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'local';
console.log(`SERVER STARTED -- ${env} mode`);
dotenv.config({ silent: true, path: path.resolve(__dirname, '.env') });

require('./src/app');
require('./initSet');