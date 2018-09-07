const messages = require('./messages');
const Dictionary = require('./Dictionary');

class Controller {
	static Set(key, value) {
		if (!key || !value) {
			messages.keyOrValueNull('SET');
			return;
		}
		const result = Dictionary.getInstance().add(key, value);
		console.log(result);
	}

	static Get(key) {
		if (!key) {
			messages.keyNull('GET');
			return;
		}
		const result = Dictionary.getInstance().read(key);
		console.log(result);
	}

	static Delete(key) {
		if (!key) {
			messages.keyNull('DELETE');
			return;
		}
		const result = Dictionary.getInstance().remove(key);
		console.log(result);
	}

	static Count(value) {
		if (!value) {
			messages.valueNull('COUNT');
			return;
		}
		const result = Dictionary.getInstance().count(value);
		console.log(result);
	}
}

module.exports = Controller;