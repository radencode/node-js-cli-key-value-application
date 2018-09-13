const Response = require('../dtos/Response');

class Dictionary {
	constructor() {
		this._dict = new Object();
	}

	Add(key, value) {
		let exists = false;
		if (this._dict[key]) exists = true;
		this._dict[key] = value;
		return new Response(true, 'success', { dictionary: {...this._dict} });
	}

	Remove(key) {
		if (this._dict[key]) {
			delete this._dict[key];
	
			return new Response(true, 'success', { dictionary: {...this._dict} });
		} else {
			return new Response(false, 'error', { key });
		}
	}

	Read(key) {
		if (this._dict[key]) {
			return new Response(true, 'success', { value: this._dict[key] });
		} else {
			return new Response(false, 'error', { key });
		}
	}
	
	Count(value) {
		let count = 0;

		Object.keys(this._dict).forEach(key => {
			if (this._dict[key] === value) count++;
		});

		return new Response(true, 'success', { value, count });
	}
	
	Update(newDict){
		this._dict = newDict;
	}

}

module.exports = Dictionary;
