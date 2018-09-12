const Command = require('../models/Command');
const Node = require('./node/LeafNode');
const Response = require('../dtos/Response');

class BST{
  constructor(){
    this._root = null;
  }

  Register(name, action){
    if(!this._root){
      this._root = new Node(new Command(name, action));
      return;
    }
    this.RecursiveInsert(this._root, name, action);
  }

  RecursiveInsert(node, name, action){
    switch(node.Data.Compare(name)){
      case 0: throw new Error(`<${name}> is already registered.`);
      case 1: {
        if(!node.Right){
          node.Right = new Node(new Command(name, action));
        }
        else{
           this.RecursiveInsert(node.Right, name, action);
        }
        break;
      }
      case -1: {
        if(!node.Left){
          node.Left = new Node(new Command(name, action));
        }
        else{
          this.RecursiveInsert(node.Left, name, action);
        }
        break;
      }
    }
  }

  Execute(name, params){
    return this.RecursiveSearch(this._root, name, params);
  }

  RecursiveSearch(root, name, params){
    if(!root){
      return new Response(false, 'error', { name });
    }
    switch(root.Data.Compare(name)){
      case 0: {
        root.Data.Execute(params);
        return new Response(true, 'success', { name });
      }
      case 1: {
        return this.RecursiveSearch(root.Right, name, params);
      }
      case -1: {
        return this.RecursiveSearch(root.Left, name, params);
      }
    }
  }
}

module.exports = BST;