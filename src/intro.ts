import { checkerboard } from './checkerboard';
import { introLines } from './data';
import { disarmReveal, armReveal } from './reveal';
import { fillSite, resetSite, typeSite } from './typewriter';
import { byId, reduceMotion, sleep, store } from './util';

const KEY = 'sb_intro_v2';
let run = 0;
const body = document.body;

export const hasSeenIntro = (): boolean => store.get(KEY) === '1';
export const isIntro = (): boolean => body.dataset.state === 'intro';

export function showSite(): void {
  body.dataset.state = 'site';
  scrollTo(0, 0);
  armReveal();
}

export function showSiteInstantly(): void {
  fillSite();
  showSite();
}

export function finishIntro(): void {
  run++;
  store.set(KEY, '1');
  if (reduceMotion()) { resetSite(); showSite(); fillSite(); return; }
  checkerboard(() => { resetSite(); showSite(); }, () => { void typeSite(); });
}

export async function playIntro(): Promise<void> {
  const me = ++run;
  const t = byId('t');
  disarmReveal();
  body.dataset.state = 'intro';
  t.textContent = '';
  await sleep(500);
  for (let i = 0; i < introLines.length; i++) {
    const s = introLines[i];
    for (let c = 1; c <= s.length; c++) {
      if (me !== run) return;
      t.textContent = s.slice(0, c);
      await sleep(38 + Math.random() * 36);
    }
    if (i === introLines.length - 1) break;
    await sleep(700);
    for (let d = s.length - 1; d >= 0; d--) {
      if (me !== run) return;
      t.textContent = s.slice(0, d);
      await sleep(18);
    }
    await sleep(200);
  }
  await sleep(900);
  if (me === run) finishIntro();
}
