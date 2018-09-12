const { throttle } = require('../utils/throttle');

let instance = null;

class InputStream{
    constructor(){
      this._stdin = null;
    }

    static GetInstance(){
      if(!instance){
        instance = new InputStream();
      }
      return instance;
    }

    Listen(callback){
      if(!this._stdin){
        this._stdin = process.openStdin();
        this._stdin.addListener('data', throttle(callback, 1000));
      }      
    }

    Terminate(callback){
      if(typeof callback === 'function'){
        callback();
      }
      this._stdin = null;
      process.exit();
    }
}

module.exports = InputStream;