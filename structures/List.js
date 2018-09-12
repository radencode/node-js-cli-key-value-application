const Node = require('./node/ListNode');
const Response = require('../dtos/Response');

class List{
  constructor(){
    this._head = null;
  }

  Add(commandLine){
    if(!this._head){
      this._head = new Node(commandLine);
      return new Response(true, 'success', { commandLine });
    }
    let tempHead = this._head;
    let newNode = new Node(commandLine);
    this._head = newNode;
    newNode.Next = tempHead;
    return;
  }

  Get(){
    let list = [];
    return new Response(true, 'success', { list: this.RecursiveGet(this._head, list) });
  }

  RecursiveGet(node, list){
    if(!node){
      return list;
    }
    list = this.RecursiveGet(node.Next, list);
    list.push(node.Data);
    return list;
  }
}

module.exports = List;