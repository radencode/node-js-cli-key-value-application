const log = require('./logger');

const error = callback => {
  try{
    callback();
  }catch(err){
    log.common(err);
  }
}

module.exports = { try: error };