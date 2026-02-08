import { useEffect, useState } from "react";
import { loadState } from "../lib/storage/loadState";
import { saveState } from "../lib/storage/saveState";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => loadState<T>(key, initialValue));

  useEffect(() => {
    saveState(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
