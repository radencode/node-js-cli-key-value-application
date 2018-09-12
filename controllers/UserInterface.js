const logger = require('../utils/logger');
const messages = require('../views/messages');

class UserInterface{
    constructor(commands){
        this._commands = commands;
        logger.common(messages.welcome);
        logger.prompt(messages.enter);
    }

    RunCommand(command, params){
       const res = this._commands.Execute(command, params);
       if(!res.Success){
           logger.error(messages.commandNotFound(res.Data.name));
       }
       logger.prompt(messages.enter);
    }
}

module.exports = UserInterface;