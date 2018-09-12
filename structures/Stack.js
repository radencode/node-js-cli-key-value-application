const Node = require('./node/ListNode');
const Response = require('../dtos/Response');

class Stack{
  constructor(){
    this._head = null;
    this._version = 100;
  }

  Push(dictionary){
    let version = this._version;
    this._version++;

    if(!this._head){
      this._head = new Node({dictionary, version});
    }
    else{
      let tempStack = this._head;
      let newNode = new Node({dictionary, version});
      newNode.Next = tempStack;
      this._head = newNode;
    }

    return new Response(true, 'success', { version });
  }

  Pop(){
    if(!this._head){
      return new Response(false, 'error');
    }

    let version = this._version;
    this._version--;

    if(!this._head.Next){
      this._head = null;
      return new Response(true, 'success', { dictionary: {}, version });
    }

    let dictionary = this._head.Data.dictionary;
    this._head = this._head.Next;
    
    return new Response(true, 'success', { dictionary, version });
  }

  Peek(){
    if(!this._head){
      return new Response(false, 'error');
    }
    return new Response(true, 'success', { dictionary: this._head.Data.dictionary, version: this._version});
  }
}

module.exports = Stack;