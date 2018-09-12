const Node = require('./Node');

class ListNode extends Node{
  constructor(data){
    super(data);
    this._next = null;
  }

  get Next(){
    return this._next;
  }

  set Next(node){
    this._next = node;
  }
}

module.exports = ListNode;