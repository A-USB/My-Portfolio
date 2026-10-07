/**
 * PowerPoint-style checkerboard: squares showing the empty grid page sweep in
 * (one colour of the checker first, then the other), the page is swapped
 * underneath, and the squares fade away.
 */
export function checkerboard(onCovered: () => void, onDone: () => void): void {
  const W = innerWidth, H = innerHeight;
  const C = Math.ceil(W / 64), R = Math.ceil(H / 64);
  const cw = W / C, ch = H / R;
  const grid = document.createElement('div');
  grid.className = 'ck';
  grid.style.gridTemplateColumns = `repeat(${C},1fr)`;
  grid.style.gridTemplateRows = `repeat(${R},1fr)`;

  const cells: HTMLElement[] = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const cell = document.createElement('i');
      cell.style.backgroundSize = `${W}px ${H}px,${W}px ${H}px,64px 64px,64px 64px`;
      cell.style.backgroundPosition = `${-c * cw}px ${-r * ch}px`;
      cell.style.transitionDelay = `${c * 16 + ((r + c) % 2) * 320}ms`;
      cells.push(cell);
      grid.appendChild(cell);
    }
  }
  document.body.appendChild(grid);
  void grid.offsetWidth;
  cells.forEach((cell) => cell.classList.add('on'));

  setTimeout(() => {
    onCovered();
    grid.style.transition = 'opacity .35s ease';
    grid.style.opacity = '0';
    setTimeout(() => { grid.remove(); onDone(); }, 380);
  }, C * 16 + 320 + 360 + 80);
}
