export function saveState<T>(key: string, value: T) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}
