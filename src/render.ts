import { chips, models, projects, site, socials } from './data';
import { byId } from './util';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

export function renderContent(): void {
  byId('navTxt').dataset.text = site.name;
  byId('heroTxt').dataset.text = site.hero;

  byId('chips').append(...chips.map((c) => {
    const e = el('span', `chip ${c.cls} hang`, c.label);
    e.style.setProperty('--r', c.tilt);
    return e;
  }));

  byId('projects').append(...projects.map((p) => {
    const section = el('section', 'sec');
    section.style.paddingTop = '0';
    const card = el('article', `proj ${p.cls} rv`);
    const row = el('div', 'row');
    row.append(el('p', '', p.blurb), el('span', 'tag', p.status));
    card.append(el('h3', '', p.title), row);
    section.append(card);
    return section;
  }));

  byId('models').append(...models.map((m) => el('div', 'tile rv', m)));

  byId('socials').append(...socials.map((s) => {
    const a = el('a', `soc ${s.cls} hang`);
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.setProperty('--r', s.tilt);
    a.innerHTML = `<span class="ic"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="${s.icon}"/></svg></span>`;
    a.append(s.name);
    return a;
  }));
}
