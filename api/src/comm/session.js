const moment = require('moment');
const _ = require('lodash');
const resultMsg = require('./resultMsg');
require('date-utils');

const getSessData = (key) => new Promise((resolve, reject) => {
	global.redis.get(`userKey:${key}`, (err, getRst) => {
		if (err) reject(err);
		else resolve(JSON.parse(getRst));
	});
});

const saveSessData = async (key, data, init) => {
	const dt = new Date().toFormat('YYYYMMDDHH24MISS');
	const execSet = (sess) => {
		Object.assign(sess, { accessTime: dt });
		Object.assign(sess, data);
		return new Promise((resolve, reject) => {
			global.redis.set(`userKey:${key}`, JSON.stringify(sess), (err, setRst) => {
				if (err) reject(err);
				else resolve(setRst);
			});
		});
	};

	if (init) {
		Object.assign(data, { createTime: dt });
		return execSet(data);
	}
	const getSessDataRst = await getSessData(key);
	return execSet(getSessDataRst);
};

const delSessData = (key) => new Promise((resolve, reject) => {
	global.redis.del(`userKey:${key}`, (error, dataDelRst) => {
		if (error) return reject({ ...resultMsg['AP.9101'], error: error.toString() });
		return resolve(dataDelRst);
	});
});
/**
 * --------------------- 신규 session 20.06.01 -------------------
 */
const getSession = (key) => new Promise((resolve, reject) => {
	global.redis.get(key, (error, getRst) => {
		if (error) return reject({ ...resultMsg['AP.9101'], error: error.toString() });
		return resolve(JSON.parse(getRst));
	});
});

const executeSave = (key, data) => new Promise((resolve, reject) => {
	global.redis.set(key, JSON.stringify(data), (error, saveRst) => {
		if (error) return reject({ ...resultMsg['AP.9101'], error: error.toString() });
		const loginTimeout = process.env.LOGIN_TIMEOUT ? parseInt(process.env.LOGIN_TIMEOUT, 10) / 1000 : 60;
		global.redis.expire(key, loginTimeout);
		return resolve(saveRst);
	});
});

const saveSession = async (key, data, init) => {
	try {
		const date = moment().format('YYYYMMDDHHmmss');
		const tmpData = { ..._.merge(data, { accessTime: date }) };
		if (init) return await executeSave(key, _.merge(tmpData, { createTime: date }));
		return await executeSave(key, { ..._.merge(await getSession(key), tmpData) });
	} catch (error) {
		return error;
	}
};

const deleteSession = (key) => new Promise((resolve, reject) => {
	global.redis.del(key, (error, dataDelRst) => {
		if (error) return reject({ ...resultMsg['AP.9101'], error: error.toString() });
		return resolve(dataDelRst);
	});
});

module.exports = {
	saveSessData,
	getSessData,
	delSessData,
	saveSession,
	getSession,
	deleteSession,
};
