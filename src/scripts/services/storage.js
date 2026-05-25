function read(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function write(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function remove(storage, key) {
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function getLocalItem(key) {
  return read(localStorage, key);
}

export function setLocalItem(key, value) {
  return write(localStorage, key, value);
}

export function removeLocalItem(key) {
  return remove(localStorage, key);
}

export function getLocalJSON(key) {
  const raw = getLocalItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setLocalJSON(key, value) {
  return setLocalItem(key, JSON.stringify(value));
}

export function getSessionItem(key) {
  return read(sessionStorage, key);
}

export function setSessionItem(key, value) {
  return write(sessionStorage, key, value);
}

export function removeSessionItem(key) {
  return remove(sessionStorage, key);
}
