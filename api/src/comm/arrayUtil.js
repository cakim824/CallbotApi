/**
 * each
 * 반복문을 돌면서 iter function 으로 list의 원소 하나 하나 인자로 전달
 * @param list {Array}
 * @param iter {Function}
 * @returns {*}
 */
 const each = (list, iter) => {
	for (let i = 0, len = list.length; i < len; i += 1) {
		if (typeof iter !== 'function') {
			throw new Error(`TypeError: ${iter} is not a function`);
		} else iter(list[i]);
	}
	return list;
};

/**
 * filter
 * list의 원하는 값을 뽑아 낸 배열 반환
 * @param list {Array} Array, 유사 배열 처리 가능
 * @param predicate {Function} 원하는 값을 뽑는 조건문을 위한 funcntion
 * @returns {String|Number|Array} default return 값은 원하는 원소만 모인 배열 | custom 가능
 */
const filter = (list, predicate) => {
	const newArr = [];
	each(list, (val) => {
		if (typeof predicate !== 'function') {
			throw new Error(`TypeError: ${predicate} is not a function`);
		} else if (predicate(val)) newArr.push(val);
	});
	return newArr;
};


module.exports = {
	each,
	filter,
};
