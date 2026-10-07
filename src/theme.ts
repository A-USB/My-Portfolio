import { store } from './util';

export function initTheme(): void {
  document.querySelectorAll<HTMLButtonElement>('.tog').forEach((btn) => {
    btn.addEventListener('click', () => {
      const root = document.documentElement;
      const wasLight = root.getAttribute('data-theme') === 'light';
      if (wasLight) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      store.set('sb_theme', wasLight ? 'dark' : 'light');
    });
  });
}
