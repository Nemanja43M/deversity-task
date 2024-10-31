const cache = new Map<string, any>();

export function getCache(key: string): any {
  return cache.get(key);
}

export function setCache(key: string, value: any): void {
  cache.set(key, value);
}

export function hasCache(key: string): boolean {
  return cache.has(key);
}
