let io: IntersectionObserver | null = null;
const items = (): NodeListOf<HTMLElement> => document.querySelectorAll<HTMLElement>('.rv,.hang,.mask');

function observer(): IntersectionObserver {
  io ??= new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io?.unobserve(e.target); }
    }),
    { threshold: 0.15, rootMargin: '0px 0px -14% 0px' },
  );
  return io;
}

/** Each item animates on its own when it scrolls into view. */
export function armReveal(): void {
  const o = observer();
  items().forEach((e) => { e.classList.remove('in'); o.observe(e); });
}

export function disarmReveal(): void {
  items().forEach((e) => { io?.unobserve(e); e.classList.remove('in'); });
}
