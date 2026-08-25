document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.release-card');
  const modal = document.getElementById('release-modal');
  const modalArtwork = document.getElementById('modal-artwork');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalSpotify = document.getElementById('modal-spotify');
  const modalApple = document.getElementById('modal-apple');
  const modalYoutube = document.getElementById('modal-youtube');
  const modalClose = document.querySelector('[data-close-release]');

  if (!modal) return;

  const open = (card) => {
    modalArtwork.src = card.dataset.artwork || '';
    modalArtwork.alt = card.dataset.title || 'Joel Staxx release';
    modalTitle.textContent = card.dataset.title || 'Joel Staxx';
    modalMeta.textContent = card.dataset.meta || 'Joel Staxx';
    modalSpotify.href = card.dataset.spotify || 'https://open.spotify.com/artist/5meq6ehyXMOa6jqWGXtvGN';
    modalApple.href = card.dataset.apple || 'https://music.apple.com/ca/artist/joel-staxx/1765344364';
    modalYoutube.href = card.dataset.youtube || 'https://www.youtube.com/channel/UC7xxKC8Fi8Tq3w-wMoqsXxQ';
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  cards.forEach(card => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });

  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  };

  modalClose?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});
