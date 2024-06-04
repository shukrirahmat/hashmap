const hashMap = function hashMap() {
  let capacity = 16;
  let buckets = [...new Array(capacity)].map(() => createLinkedList());
  const LOAD_FACTOR = 0.75;

  const hash = function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  const set = function set(key, value) {
    const index = hash(key) % buckets.length;

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
    const listIndex = linkedList.find(key);

    if (listIndex !== null) {
      linkedList.at(listIndex).value = value;
    } else {
      linkedList.append(key);
      linkedList.getTail().value = value;
    }
  };

  const get = function get(key) {
    const index = hash(key) % buckets.length;

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const linkedList = buckets[index];
    const listIndex = linkedList.find(key);

    if (listIndex !== null) {
      return linkedList.at(listIndex).value;
    }

    return null;
  };

  const view = () => buckets.map((list) => list.getHead());

  return {
    hash,
    set,
    get,
    view,
  };
};
