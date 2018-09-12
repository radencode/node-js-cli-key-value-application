class Parser{
  constructor(callback){
    this._next = callback;
  }

  ParseData(data){
    const argv = data.toString().trim().split(' ').filter(arg => arg != '');
    this._next(argv);
  }
}

module.exports = Parser;