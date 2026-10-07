import { byId } from './util';

/** The navbar shrinks into a pill after a little scrolling. */
export function initNav(onReplay: () => void): void {
  const nav = byId('nav');
  const update = (): void => { nav.classList.toggle('pill', scrollY > 40); };
  addEventListener('scroll', update, { passive: true });
  update();
  byId('rep').addEventListener('click', () => { scrollTo(0, 0); onReplay(); });
}
