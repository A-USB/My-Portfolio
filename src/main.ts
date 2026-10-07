import './styles.css';
import { finishIntro, hasSeenIntro, isIntro, playIntro, showSiteInstantly } from './intro';
import { initNav } from './nav';
import { renderContent } from './render';
import { initTheme } from './theme';
import { initTypewriters, resetSite } from './typewriter';
import { reduceMotion } from './util';

const replay = (): void => { resetSite(); void playIntro(); };

renderContent();
initTypewriters();
initTheme();
initNav(replay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isIntro()) finishIntro();
  const plain = !e.metaKey && !e.ctrlKey && !e.altKey;
  if ((e.key === 'r' || e.key === 'R') && plain && !isIntro()) { scrollTo(0, 0); replay(); }
});

// Returning visitors skip the intro. Add #intro to the URL to force it.
const force = /intro/.test(location.hash + location.search);
if ((hasSeenIntro() && !force) || reduceMotion()) showSiteInstantly(); else void playIntro();
