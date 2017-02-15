import Store from 'store2';

const KEY = 'vittaTasks';

function remove() {
  Store.remove(KEY);
}

function get() {
  // const store = Store.get(KEY);
  return Store.get(KEY) || [];
}

function save(data) {
  if (!data) return;
  // const store = get() ? get() : [];
  // const newData = [...store, ...data];
  Store.set(KEY, data);
}

module.exports = {
  remove,
  get,
  save,
};
