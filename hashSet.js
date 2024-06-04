const hashSet = function hashSet() {
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
  
    const set = function set(key) {
  
      if ((length() / capacity) > 0.75) {
        growBucket();
      }
  
      const index = hash(key) % buckets.length;
      isIndexInRange(index);
  
      const bucket = buckets[index];
      const listIndex = bucket.find(key);
  
      if (listIndex === null) {
        bucket.append(key);
      }
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
  
    const isIndexInRange = function isIndexInRange(index) {
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
    };
  
    const growBucket = function growBucket() {
      let keysCopy = keys();
      capacity = capacity * 2;
      clear();
      keysCopy.forEach((key) => {
        set(key);
      })
    };
  
    const view = () => buckets.map((bucket) => bucket.getHead());
  
    return {
      hash,
      set,
      has,
      remove,
      length,
      clear,
      keys,
      view
    };
  };
  
  /*
  const hset = hashSet();
  hset.set("apple");
  hset.set("banana");
  hset.set("lemon");
  console.log(hset.keys());

  let x = 16;
  while (x > 0) {
    hset.set("element" + x);
    x--;
  }
  */