const createLinkedList = function createLinkedList() {
  let head = null;

  const append = function append(key) {
    if (head === null) {
      head = createNode(key);
    } else {
      let currentNode = head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = createNode(key);
    }
  };

  const prepend = function prepend(key) {
    const newhead = createNode(key, head);
    head = newhead;
  };

  const size = function size() {
    if (head === null) return 0;
    else {
      let count = 1;
      let currentNode = head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
        count++;
      }
      return count;
    }
  };

  const getHead = function getHead() {
    return head;
  };

  const getTail = function getTail() {
    if (head === null) return head;
    else {
      let currentNode = head;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    }
  };

  const at = function at(index) {
    if (head !== null && index < size() && !(index < 0)) {
      let currentNode = head;
      while (index > 0) {
        currentNode = currentNode.nextNode;
        index--;
      }
      return currentNode;
    }
  };

  const pop = function pop() {
    if (head !== null) {
      if (head.nextNode === null) head = null;
      else {
        let previousNode;
        let currentNode = head;
        while (currentNode.nextNode !== null) {
          previousNode = currentNode;
          currentNode = currentNode.nextNode;
        }
        previousNode.nextNode = null;
      }
    }
  };

  const contains = function contains(key) {
    if (head !== null) {
      let currentNode = head;
      while (currentNode !== null) {
        if (currentNode.key == key) return true;
        currentNode = currentNode.nextNode;
      }
    }
    return false;
  };

  const find = function find(key) {
    if (head !== null) {
      let count = 0;
      let currentNode = head;
      while (currentNode !== null) {
        if (currentNode.key == key) return count;
        currentNode = currentNode.nextNode;
        count++;
      }
    }
    return null;
  };

  const toString = function toString() {
    if (head === null) return "null";
    else {
      let currentNode = head;
      let string = currentNode.key + " -> ";
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
        string = string + currentNode.key + " -> ";
      }
      return string + "null";
    }
  };

  const insertAt = function insertAt(key, index) {
    if (index < size() && !(index < 0)) {
      if (index === 0) prepend(key);
      else {
        let previous = head;
        let next = head.nextNode;
        let count = 1;
        while (count !== index) {
          previous = next;
          next = next.nextNode;
          count++;
        }
        previous.nextNode = createNode(key, next);
      }
    }
  };

  const removeAt = function removeAt(index) {
    if (index < size() && !(index < 0)) {
      if (index === 0) head = head.nextNode;
      else {
        let previous = head;
        let next = head.nextNode;
        let count = 1;
        while (count !== index) {
          previous = next;
          next = next.nextNode;
          count++;
        }
        previous.nextNode = next.nextNode;
      }
    }
  };

  return {
    append,
    prepend,
    toString,
    size,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    insertAt,
    removeAt,
  };
};
