const TOKEN_KEY = "mini_event_token";
const USER_KEY = "mini_event_user";

function safeLocalStorageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch (e) {
    return false;
  }
}

export function saveToken(token: string) {
  if (!safeLocalStorageAvailable()) return;
  try {
    console.log('[storage] saveToken', !!token);
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.log('[storage] saveToken error', e);
  }
}

export function getToken(): string | null {
  if (!safeLocalStorageAvailable()) return null;
  try {
    const t = localStorage.getItem(TOKEN_KEY);
    console.log('[storage] getToken', !!t);
    return t;
  } catch (e) {
    console.log('[storage] getToken error', e);
    return null;
  }
}

export function removeToken() {
  if (!safeLocalStorageAvailable()) return;
  try {
    console.log('[storage] removeToken');
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.log('[storage] removeToken error', e);
  }
}

export function saveUser(user: any) {
  if (!safeLocalStorageAvailable()) return;
  try {
    console.log('[storage] saveUser', !!user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('[storage] saveUser error', e);
  }
}

export function getUser(): any | null {
  if (!safeLocalStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    console.log('[storage] getUser raw', !!raw);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.log('[storage] getUser error', e);
    return null;
  }
}

export function removeUser() {
  if (!safeLocalStorageAvailable()) return;
  try {
    console.log('[storage] removeUser');
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.log('[storage] removeUser error', e);
  }
}

export function clearAll() {
  if (!safeLocalStorageAvailable()) return;
  try {
    console.log('[storage] clearAll');
    removeToken();
    removeUser();
  } catch (e) {
    console.log('[storage] clearAll error', e);
  }
}
