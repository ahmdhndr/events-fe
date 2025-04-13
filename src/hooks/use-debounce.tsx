import { useCallback, useRef } from "react";

export function useDebounce() {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((func: () => void, delay: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      func();
      debounceTimeout.current = null;
    }, delay);
  }, []);
  return debounce;
}
