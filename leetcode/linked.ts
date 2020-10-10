class Node1 {
  next: any;
  val: any;
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  head: Node1;
  constructor() {
    this.head = new Node1("head");
  }
  // 查找当前节点 - 根据val值
  // 适用于链表中无重复节点
  findNodeByVal(val) {
    let curr = this.head;
    while (curr != null && curr.val != val) {
      curr = curr.next;
    }
    return curr ? curr : -1;
  }
  // 查找当前节点 - 根据索引/index
  // 适用于链表中有重复节点
  findNodeByIndex(index) {
    let curr = this.head;
    let pos = 1;
    while (curr != null && pos !== index) {
      curr = curr.next;
      pos++;
    }
    return curr != null ? curr : -1;
  }
  // 插入
  insert(newVal, val) {
    let curr = this.findNodeByVal(val);
    if (curr == -1) return false;
    let newNode = new Node1(newVal);
    newNode.next = curr.next;
    curr.next = newNode;
  }
  // 查找当前节点的前一个节点 - 根据val值
  // 适用于链表中无重复节点
  findNodePreByVal(nodeVal) {
    let curr = this.head;
    while (curr.next != null && curr.next.val != nodeVal) {
      curr = curr.next;
    }
    return curr != null ? curr : -1;
  }
  // 查找当前节点的前一个节点 - 根据索引/index
  // 适用于链表中无重复节点
  // 同 findNodeByIndex，只要index传的是前一个节点的索引就对了

  // 删除节点
  remove(nodeVal) {
    let needRemoveNode = this.findNodeByVal(nodeVal);
    if (needRemoveNode == -1) return false;
    let prevNode = this.findNodePre(nodeVal);
    prevNode.next = needRemoveNode.next;
  }
  findNodePre(nodeVal: any) {
    throw new Error("Method not implemented.");
  }
  // 遍历节点
  display() {
    let res = [];
    let curr = this.head;
    while (curr != null) {
      res.push(curr.val);
      curr = curr.next;
    }
    return res;
  }
}
