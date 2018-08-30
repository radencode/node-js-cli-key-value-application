const welcome = () => {
	console.log('\n################################################################\n');
	console.log('Welcome to Node.js CLI Transactional Key Value Store!');
	console.log('The following are the commands that can be ussed...\n');
	console.log('SET <key> <value> => Store the value for the given key.');
	console.log('GET <key> => Return the current value for the given key.');
	console.log('DELETE <key> => Remove the entry for the given key.');
	console.log('COUNT <value> => Return the number of keys that have the given value.');
	console.log('EXIT => Quit.');
	console.log('\n################################################################');
};

const prompt = () => process.stdout.write('\nPlease enter a command: ');

const invalidCommand = command => console.log(`\nERROR: Invalid command '${command}', commands are case sensative.`);

const exit = () => {
	console.log('\n################################################################\n');
	console.log('Application now terminating...');
	console.log('\n################################################################\n');
};

const keyOrValueNull = command => {
	console.log(`\nERROR: <key> and <value> are both required for '${command}'.`);
};

const keyNull = command => {
	console.log(`\nERROR: <key> is required for '${command}'.`);
};

const valueNull = command => {
	console.log(`\nERROR: <value> is required for '${command}'.`);
};

module.exports = {
	exit,
	invalidCommand,
	keyNull,
	keyOrValueNull,
	prompt,
	valueNull,
	welcome,
};
