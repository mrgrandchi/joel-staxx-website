document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('staxx-player');
  const toggle = document.querySelector('[data-player-toggle]');
  const close = document.querySelector('[data-player-close]');
  const artwork = document.getElementById('player-artwork');
  const title = document.getElementById('player-title');
  const status = document.getElementById('player-status');
  const expand = document.querySelector('[data-player-expand]');

  if (!player) return;

  const releases = {
    'ANXIETY 2026': 'releases/anxiety-2026.jpg',
    'KNOWING ME': 'releases/knowing-me.jpg',
    'SLIPPING': 'releases/slipping.jpg',
    'MIGHT BE FREESTYLE': 'releases/might-be-freestyle.jpg',
    'UPLIFT': 'releases/uplift.jpg'
  };

  const setRelease = (name, meta) => {
    title.textContent = name || 'Joel Staxx';
    status.textContent = meta || 'Joel Staxx';
    if (releases[name]) artwork.src = releases[name];
    player.classList.add('has-selection');
  };

  document.querySelectorAll('.release-card').forEach(card => {
    card.addEventListener('click', () => setRelease(card.dataset.title, card.dataset.meta));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') setRelease(card.dataset.title, card.dataset.meta);
    });
  });

  toggle?.addEventListener('click', () => player.classList.toggle('is-open'));
  expand?.addEventListener('click', () => player.classList.toggle('is-open'));
  close?.addEventListener('click', () => player.classList.remove('is-open'));

  // The actual audio controls are provided by Spotify's official embedded player.
  // This bar remains a persistent visual controller and opens the full Spotify player.
});
