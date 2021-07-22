const useragent = require('express-useragent');
const logger = require('./logger');
const xss = require('xss');

module.exports = {
	/**
     * parseReq
     * @param req request
     */
	parseReq: (req) => {
		const method = req.method.toLowerCase();
		let filter = Object.assign({}, req[method === 'post' ? 'body' : 'query']);
		filter = JSON.parse(xss(JSON.stringify(filter)));
		return filter;
	}
};
