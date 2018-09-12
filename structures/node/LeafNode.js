const Node = require('./Node');

class LeafNode extends Node{
  constructor(data){
    super(data);
    this._left = null;
    this._right = null;
  }

  get Left(){
    return this._left;
  }

  set Left(node){
    this._left = node;
  }

  get Right(){
    return this._right;
  }

  set Right(node){
    this._right = node;
  }
}

module.exports = LeafNode;