class Dictionary {
	constructor() {
		this._db = new Object();
	}

	static instance = null;

	static GetInstance() {
		if (!instance) {
			instance = new Dictionary();
		}
		Object.freeze(instance);
		return instance;
	}

	Add(key, value) {
		let exists = false;
		if (this._db[key]) exists = true;
		this._db[key] = value;
		return `The value '${value}' has been ${exists ? 'updated' : 'added'} for the key '${key}'.`;
	}

	Remove(key) {
		if (this._db[key]) {
			delete this._db[key];
			return `The key '${key}' has been deleted.`;
		} else {
			return `The key '${key}' is not set.`;
		}
	}

	Read(key) {
		if (this._db[key]) {
			return `The key '${key}' has a value of '${this._db[key]}'.`;
		} else {
			return `The key '${key}' is not set.`;
		}
	}

	Count(value) {
		let count = 0;

		Object.keys(this._db).forEach(key => {
			if (this._db[key] === value) count++;
		});

		return `The value '${value}' has ${count} keys.`;
	}
}

module.exports = Dictionary;
