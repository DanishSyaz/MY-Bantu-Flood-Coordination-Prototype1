/**
 * Storage utilities for MY Bantu application.
 * Provides safe LocalStorage access with SSR-safe checks and JSON parsing error handling.
 */

export const STORAGE_KEYS = {
  AID_REQUESTS: 'my_bantu_aid_requests',
  SHELTERS: 'my_bantu_shelters',
  VOLUNTEERS: 'my_bantu_volunteers',
  THEME: 'my_bantu_theme',
  LANG: 'my_bantu_lang',
  LOW_DATA: 'my_bantu_low_data',
  ALERTS: 'my_bantu_alerts',
} as const

const isClient = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (!isClient) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch (err) {
    console.warn(`[MY Bantu] Failed to load key "${key}" from localStorage:`, err)
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (!isClient) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn(`[MY Bantu] Failed to save key "${key}" to localStorage:`, err)
  }
}

export function removeFromStorage(key: string): void {
  if (!isClient) return
  try {
    window.localStorage.removeItem(key)
  } catch (err) {
    console.warn(`[MY Bantu] Failed to remove key "${key}" from localStorage:`, err)
  }
}

export function clearAllAppData(): void {
  if (!isClient) return
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      window.localStorage.removeItem(key)
    })
  } catch (err) {
    console.warn('[MY Bantu] Failed to clear app data from localStorage:', err)
  }
}
