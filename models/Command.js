class Command{
  constructor(name, action){
    if(typeof name !== 'string' || typeof action !== 'function'){
      throw new Error('<command> <action> are both required parameters.');
    }
    this._name = name;
    this._action = action;
  }

  Compare(name){
    if(name > this._name) return 1;
    else if(name < this._name) return -1;
    else return 0;
  }

  Execute(params){
    this._action(params);
  }
}

module.exports = Command;