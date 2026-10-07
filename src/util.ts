export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
export const reduceMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const byId = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

export const store = {
  get(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
  },
};
