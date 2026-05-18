import { get, set, del } from 'idb-keyval';

const NS = 'nexus-13:';

export async function nsGet<T>(key: string): Promise<T | undefined> {
  return get<T>(`${NS}${key}`);
}

export async function nsSet<T>(key: string, value: T): Promise<void> {
  return set(`${NS}${key}`, value);
}

export async function nsDel(key: string): Promise<void> {
  return del(`${NS}${key}`);
}
