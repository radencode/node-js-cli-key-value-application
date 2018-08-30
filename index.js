const Controller = require('./Controller');
const messages = require('./messages');
const { throttle } = require('./utils');

const stdin = process.openStdin();

const onUserCommand = data => {
	//Get args out of data buffer
	const parsedData = data
		.toString()
		.trim()
		.split(' ');

	//Remove white spaces (if any) from parsedData array
	const argv = parsedData.filter(arg => arg != '');

	//Take out command arguments array
	const command = argv[0];

	switch (command) {
		case 'SET': {
			Controller.Set(argv[1], argv[2]);
			break;
		}
		case 'GET': {
			Controller.Get(argv[1]);
			break;
		}
		case 'DELETE': {
			Controller.Delete(argv[1]);
			break;
		}
		case 'COUNT': {
			Controller.Count(argv[1]);
			break;
		}
		case 'EXIT': {
			messages.exit();
			process.exit();
		}
		default:
			messages.invalidCommand(command);
	}
	//Prompt user to enter a command
	messages.prompt();
};

//Print welcome message to user
messages.welcome();
//Prompt user to enter a command
messages.prompt();

//Throttle event listener to not accept multiline input
stdin.addListener('data', throttle(onUserCommand, 1000));
