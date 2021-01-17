export function setLocalStorageItem(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
