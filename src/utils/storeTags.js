import Store from 'store2';

const KEY = 'vittaTags';

function matchInArray(array, value) {
  let i;
  for (i = 0; i < array.length; i += 1) {
    if (array[i].match(value)) {
      return i;
    }
  }
  return -1;
}

function remove() {
  Store.remove(KEY);
}

function get() {
  return Store.get(KEY) || [];
}

function save(data) {
  if (!data) return [];
  const tags = get() ? get() : [];

  if (matchInArray(tags, new RegExp(data, 'i')) < 0) {
    tags.push(data);
    Store.set(KEY, tags);
  }
  return tags;
}

module.exports = {
  remove,
  get,
  save,
};
