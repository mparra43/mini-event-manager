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
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    // noop
  }
}

export function getToken(): string | null {
  if (!safeLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export function removeToken() {
  if (!safeLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    // noop
  }
}

export function saveUser(user: any) {
  if (!safeLocalStorageAvailable()) return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    // noop
  }
}

export function getUser(): any | null {
  if (!safeLocalStorageAvailable()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function removeUser() {
  if (!safeLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    // noop
  }
}

export function clearAll() {
  if (!safeLocalStorageAvailable()) return;
  try {
    removeToken();
    removeUser();
  } catch (e) {
    // noop
  }
}
