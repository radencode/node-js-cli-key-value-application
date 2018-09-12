const BST = require('./structures/BST'); //Binary Serach Tree holding all commands needed for the program
const CommandController = require('./controllers/Command'); //Executes the corresponding functions for given command
const handleError = require('./utils/error'); //Wraps function into try and catch block
const InputStream = require('./helpers/InputStream'); //Singleton wrapper of process.openStdin(), with a throttle function
const Parser = require('./helpers/Parser'); //Parses user data and executes controller function
const UserInterface = require('./controllers/UserInterface'); //Controlls user interface messages

//Initilizations
const commandController = new CommandController();
const commands = new BST();

//Insert all commands with the corresponding callback controller function
handleError.try(() => {
    commands.Register('SET', params => commandController.Set(...params));
    commands.Register('GET', params => commandController.Get(...params));
    commands.Register('DELETE', params => commandController.Delete(...params));
    commands.Register('COUNT', params => commandController.Count(...params));
    commands.Register('HISTORY', () => commandController.History());
    commands.Register('ROLLBACK', () => commandController.Rollback());
    commands.Register('EXIT', () => commandController.Exit());
});

//Initialize app with commands object that later will be used to
//execute the parsed user's command
const app = new UserInterface(commands);

//Initialize parser with callback function that will be executed
//after the data has been parsed with <argv> (arguments array) passed into it
const parser = new Parser((argv) => {
    app.RunCommand(argv[0], argv.slice(1, argv.length));
});

//Create input stream with a callback that will execute on user's input
//Callback: parser function that will use the commands function (previously passed into Parser)
//to execute the corresponidng command after the data has been parsed 
InputStream.GetInstance().Listen((data) => parser.ParseData(data));