const Dictionary = require('../structures/Dictionary');
const InputStream = require('../helpers/InputStream');
const List = require('../structures/List');
const logger = require('../utils/logger');
const messages = require('../views/messages');
const Stack = require('../structures/Stack');

class Command {
	constructor(){
		this._db = new Dictionary();
		this._history = new List();
		this._version = new Stack();
	}

	Set(key, value) {
		if (!key || !value) {
			logger.error(messages.validationErrors.set);
			return;
		}
		const res = this._db.Add(key, value);
		this._history.Add(`SET <${key}> <${value}> => ${key} set to ${value}`);
		this._version.Push(res.Data.dictionary);
		logger.success(messages.success.set(key, value));
	}

	Get(key) {
		if (!key) {
			logger.error(messages.validationErrors.get);
			return;
		}
		const res = this._db.Read(key);
		if(!res.Success){
			this._history.Add(`GET <${key}> => ${key} not found`);
			logger.error(messages.error.get(res.Data.key));
			return;
		}
		this._history.Add(`GET <${key}> => ${res.Data.value}`);
		logger.success(messages.success.get(key, res.Data.value));
	}

	Delete(key) {
		if (!key) {
			logger.error(messages.validationErrors.delete);
			return;
		}
		const res = this._db.Remove(key);
		if(!res.Success){
			this._history.Add(`DELETE <${key}> => ${key} not found`);
			logger.error(messages.error.delete(res.Data.key));
			return;
		}
		this._history.Add(`DELETE <${key}> => ${key} deleted`);
		this._version.Push(res.Data.dictionary);
		logger.success(messages.success.delete(key));
	}

	Count(value) {
		if (!value) {
			logger.error(messages.validationErrors.count);
			return;
		}
		const res = this._db.Count(value);
		this._history.Add(`COUNT <${value}> => ${res.Data.count}`);
		logger.success(messages.success.count(value, res.Data.count));
	}

	History() {
		const res = this._history.Get();
		if(!res.Data.list.length){
			this._history.Add(`HISTORY => no history found`);
			logger.error(messages.error.history);
			return;
		}
		this._history.Add(`HISTORY => list of history`);
		logger.success(messages.success.history);
		res.Data.list.forEach((history, index) => {
			logger.item(messages.item.history(index + 1, history));
		});
	}

	Rollback() {
		const resPop = this._version.Pop();
		const resPeek = this._version.Peek();
		if(!resPop.Success){
			this._history.Add(`ROLLBACK => no previous version found`);
			logger.error(messages.error.rollback);
			return;
		}
		else if(!resPeek.Success){
			this._db.Update({});
			this._history.Add(`ROLLBACK => original version v1.0.0`);
			logger.success(messages.success.rollbackBeginning);
			return;
		}
		this._db.Update(resPeek.Data.dictionary);
		this._history.Add(`ROLLBACK => ${resPop.Data.version} to ${resPeek.Data.version}`);
		logger.success(messages.success.rollback(resPop.Data.version, resPeek.Data.version));
	}
	
	Exit() {
		InputStream.GetInstance().Terminate(() => logger.common(messages.exit));
	}

}

module.exports = Command;