// Treat a browser refresh as a new visit to the landing page.
(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type !== 'reload') return;

  history.scrollRestoration = 'manual';
  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search);
  }

  const startAtTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  startAtTop();
  window.addEventListener('pageshow', () => requestAnimationFrame(startAtTop), { once: true });
})();
