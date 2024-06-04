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

    if ((length() / capacity) > 0.75) {
      growBucket();
    }

    const index = hash(key) % buckets.length;
    isIndexInRange(index);

    const bucket = buckets[index];
    const listIndex = bucket.find(key);

    if (listIndex !== null) {
      bucket.at(listIndex).value = value;
    } else {
      bucket.append(key);
      bucket.getTail().value = value;
    }
  };

  const get = function get(key) {
    const index = hash(key) % buckets.length;
    isIndexInRange(index);

    const bucket = buckets[index];
    const listIndex = bucket.find(key);

    if (listIndex !== null) {
      return bucket.at(listIndex).value;
    }

    return null;
  };

  const has = function has(key) {
    const index = hash(key) % buckets.length;
    isIndexInRange(index);

    const bucket = buckets[index];
    return bucket.contains(key);
  };

  const remove = function remove(key) {
    const index = hash(key) % buckets.length;
    isIndexInRange(index);

    const bucket = buckets[index];
    const listIndex = bucket.find(key);
    if (listIndex !== null) {
      bucket.removeAt(listIndex);
      return true;
    }

    return false;
  };

  const length = function length() {
    let total = 0;
    buckets.forEach((bucket) => {
      total += bucket.size();
    });

    return total;
  };

  const clear = function clear() {
    buckets = [...new Array(capacity)].map(() => createLinkedList());
  };

  const keys = function keys() {
    let list = [];
    buckets.forEach((bucket) => {
      let count = 0;
      while (count < bucket.size()) {
        list.push(bucket.at(count).key);
        count++;
      }
    });

    return list;
  };

  const values = function values() {
    let list = [];
    buckets.forEach((bucket) => {
      let count = 0;
      while (count < bucket.size()) {
        list.push(bucket.at(count).value);
        count++;
      }
    });

    return list;
  };

  const entries = function entries() {
    let list = [];
    buckets.forEach((bucket) => {
      let count = 0;
      while (count < bucket.size()) {
        list.push([bucket.at(count).key, bucket.at(count).value]);
        count++;
      }
    });

    return list;
  };

  const isIndexInRange = function isIndexInRange(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  };

  const growBucket = function growBucket() {
    let entriesCopy = entries();
    capacity = capacity * 2;
    clear();
    entriesCopy.forEach((entry) => {
      set(entry[0], entry[1]);
    })
  };

  const view = () => buckets.map((bucket) => bucket.getHead());

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    view
  };
};

const map = hashMap();
map.set("john", "doe");
map.set("A", "almond");
map.set("Q", "queen");
console.log(map.entries());
