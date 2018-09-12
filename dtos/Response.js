class Response{
  constructor(success, message = null, data = null){
    if(typeof success !== 'boolean'){
      throw new Error('<success> must be a boolean');
    }
    this._success = success;
    this._message = message;
    this._data = data;
  }

  get Success(){
    return this._success;
  }

  get Message(){
    return this._message;
  }

  get Data(){
    return this._data;
  }
}

module.exports = Response;