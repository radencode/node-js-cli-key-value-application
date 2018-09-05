const throttle = (func, delay) => {
	//Check of errors
	if (typeof func != 'function') throw new Error('Throttle expects a function.');
	if (typeof delay != 'number') throw new Error('Throttle expects a number for delay.');

	//Set timeout to null at first
	let timeout = null;

	//Return throttling function
	return arg => {
		if (!timeout) func(arg);
		timeout = setTimeout(() => {
			timeout = null;
		}, delay);
	};
};

module.exports = { throttle };
