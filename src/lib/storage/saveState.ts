export function saveState(key: string, value: unknown) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}
