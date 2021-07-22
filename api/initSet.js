// const { connect } = require('http2');
const Redis = require('ioredis');
const mysql = require('mysql');

let redis;
const redisOptions = {
    connectTimeout: 5000,
    keepAlive: 5000
};

redis = new Redis(Object.assign(redisOptions, {
    host: process.env.REIDS_IP,
    port: process.env.REIDS_PORT,
    password: process.env.REIDS_PW || undefined
}));

redis.on('error', (err) => {
    console.error('Fail create redis', err);
}).on('ready', () => {
    console.info('Ready redis');
}).on('connect', () => {
    console.info('Success Connect redis');
});

global.redis = redis;