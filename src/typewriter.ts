import { byId, sleep } from './util';

let run = 0;
const live = (el: HTMLElement): HTMLElement => el.querySelector<HTMLElement>('.live') as HTMLElement;
const all = (): NodeListOf<HTMLElement> => document.querySelectorAll<HTMLElement>('.tw');

/** Each .tw holds an invisible copy of its text (to reserve space) and a live layer that gets typed. */
export function initTypewriters(): void {
  all().forEach((el) => {
    const text = el.dataset.text ?? '';
    el.setAttribute('aria-label', text);
    el.innerHTML = '<span class="ghost" aria-hidden="true"></span><span class="live" aria-hidden="true"></span>';
    (el.firstElementChild as HTMLElement).textContent = text;
  });
}

async function typeInto(el: HTMLElement, base: number, jitter: number, me: number): Promise<boolean> {
  const text = el.dataset.text ?? '';
  const l = live(el);
  l.classList.add('typing');
  for (let i = 1; i <= text.length; i++) {
    if (me !== run) return false;
    l.textContent = text.slice(0, i);
    await sleep(base + Math.random() * jitter);
  }
  l.classList.remove('typing');
  return true;
}

export function resetSite(): void {
  run++;
  byId('navLogo').classList.remove('on');
  byId('acts').classList.remove('on');
  all().forEach((el) => { live(el).textContent = ''; live(el).classList.remove('typing'); });
}

export function fillSite(): void {
  run++;
  byId('navLogo').classList.add('on');
  byId('acts').classList.add('on');
  all().forEach((el) => { live(el).textContent = el.dataset.text ?? ''; live(el).classList.remove('typing'); });
}

/** Logo fades in, the name types, the buttons appear, then the paragraph types. */
export async function typeSite(): Promise<void> {
  const me = ++run;
  await sleep(150);
  byId('navLogo').classList.add('on');
  await sleep(400);
  if (!(await typeInto(byId('navTxt'), 55, 40, me))) return;
  byId('acts').classList.add('on');
  await sleep(300);
  await typeInto(byId('heroTxt'), 26, 24, me);
}
