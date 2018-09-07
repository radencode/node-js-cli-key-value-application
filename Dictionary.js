class Dictionary {
	constructor() {
		this.db = new Object();
		this.instance = null;
	}

	static getInstance() {
		if (!this.instance) this.instance = new Dictionary();
		return this.instance;
	}

	add(key, value) {
		let exists = false;
		if (this.db[key]) exists = true;
		this.db[key] = value;
		return `The value '${value}' has been ${exists ? 'updated' : 'added'} for the key '${key}'.`;
	}

	remove(key) {
		if (this.db[key]) {
			delete this.db[key];
			return `The key '${key}' has been deleted.`;
		} else {
			return `The key '${key}' is not set.`;
		}
	}

	read(key) {
		if (this.db[key]) {
			return `The key '${key}' has a value of '${this.db[key]}'.`;
		} else {
			return `The key '${key}' is not set.`;
		}
	}

	count(value) {
		let count = 0;

		Object.keys(this.db).forEach(key => {
			if (this.db[key] === value) count++;
		});

		return `The value '${value}' has ${count} keys.`;
	}
}

module.exports = Dictionary;
