module.exports = {
	welcome: 
		'################################################################\n' +
		'\nWelcome to Node.js CLI Transactional Key Value Store!\n' +
		'The following are the commands that can be ussed:\n' +
		'\n SET <key> <value> => Store the value for the given key.\n' +
		' GET <key> => Return the current value for the given key.\n' +
		' DELETE <key> => Remove the entry for the given key.\n' +
		' COUNT <value> => Return the number of keys that have the given value.\n' +
		' HISTORY => Returns history in chronological order.\n' +
		' ROLLBACK => Returns previous version. (Undoes a SET or DELETE)\n' +
		' EXIT => Quit.\n' +
		'\n################################################################',
	enter: 'Please enter a command: ',
	validationErrors: {
		set: `<key> and <value> are required for 'SET' command.`,
		get: `<key> is required for 'GET' command.`,
		delete: `<key> is required for 'DELETE' command.`,
		count: `<value> is required for 'COUNT' command.`
	},
	exit: 
		'################################################################\n' +
		'\n Application now terminating...\n' +
		'\n################################################################\n',
	commandNotFound: command => `the term '${command}' is not recognized as a valid command.`,
	success: {
		set: (key, value) => `the key '${key}' has been set to the value '${value}'.`,
		get: (key, value) => `the key '${key}' has a value of '${value}'.`,
		delete: (key) => `the key '${key}' has been deleted.`,
		count: (value, count) => `the value '${value}' has ${count} keys.`,
		history: `the following is your history in chronological order:`,
		rollback: (prevVersion, currentVersion) => `the version has been rolled back from v${prevVersion.toString().split('').join('.')} to v${currentVersion.toString().split('').join('.')}`,
		rollbackBeginning: 'you are now back to v1.0.0 (Starting point).',
	},
	error: {
		get: (key) => `the key '${key}' does not exist.`,
		delete: (key) => `the key '${key}' does not exist.`,
		history: `no history found.`,
		rollback: `no previous version found.`,
	},
	item: {
		history: (row, item) => `${row}) ${item}`,
	}
};
