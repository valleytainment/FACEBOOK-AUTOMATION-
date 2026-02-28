/**
 * ============================================================================
 * 💾 LOCAL STORAGE HOOK
 * ============================================================================
 * Description: Custom React hook for syncing state with browser localStorage.
 * Features: Type-safe, SSR-compatible, automatic JSON serialization.
 * ============================================================================
 */

import { useState, useEffect } from "react";

/**
 * 🔄 useLocalStorage
 * ----------------------------------------------------------------------------
 * Persists state across browser sessions.
 * 
 * @param key - The unique localStorage key.
 * @param initialValue - The default value if nothing is stored.
 * @returns [state, setState] tuple identical to useState.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // 🎛️ STATE: Initialize with stored value or default
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 💾 SYNC: Update localStorage whenever state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
