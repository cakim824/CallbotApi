module.exports = {
	info: (...params) => { console.log.apply(null, ['INFO'].concat(params)); },
	debug: (...params) => { if (process.env.LOGGER === 'DEBUG')console.log.apply(null, ['DEBUG'].concat(params)); },
	error: (...params) => { console.error.apply(null, ['ERROR'].concat(params)); },
};
