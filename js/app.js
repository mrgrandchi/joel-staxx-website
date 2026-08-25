document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

  // Persistent Joel Staxx player. Spotify supplies the actual playback controls.
  if(!document.getElementById('staxx-player')){
    const style=document.createElement('style');
    style.textContent=`.staxx-player{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9000;width:min(760px,calc(100% - 28px));background:rgba(12,15,22,.95);border:1px solid rgba(255,255,255,.14);border-radius:18px;box-shadow:0 18px 60px rgba(0,0,0,.45);backdrop-filter:blur(18px);overflow:hidden}.staxx-player-bar{display:grid;grid-template-columns:52px 1fr auto;gap:12px;align-items:center;padding:10px 12px}.player-artwork{width:52px;height:52px;border-radius:10px;object-fit:cover}.player-copy{min-width:0}.player-copy strong,.player-copy span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.player-copy strong{font-size:14px}.player-copy span{font-size:12px;opacity:.58;margin-top:3px}.player-actions{display:flex;gap:7px;align-items:center}.player-actions button,.player-actions a{height:38px;min-width:38px;padding:0 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.05);color:#fff;text-decoration:none;display:inline-grid;place-items:center;cursor:pointer;font:inherit}.player-actions .player-primary{background:#fff;color:#080b12;border-color:#fff}.player-actions button:hover,.player-actions a:hover{background:rgba(255,255,255,.12)}.player-actions .player-primary:hover{background:#eee}.staxx-player-panel{display:none;border-top:1px solid rgba(255,255,255,.1);padding:12px}.staxx-player.is-open .staxx-player-panel{display:block}.staxx-player-panel iframe{display:block;width:100%;height:152px;border:0;border-radius:12px}.player-note{font-size:11px;opacity:.55;margin:8px 2px 0}.player-close{display:none}@media(max-width:650px){.staxx-player{bottom:10px;width:calc(100% - 18px);border-radius:16px}.staxx-player-bar{grid-template-columns:44px 1fr auto;padding:8px}.player-artwork{width:44px;height:44px}.player-actions a{display:none}.player-actions button{height:36px;min-width:36px;padding:0 9px}.staxx-player-panel iframe{height:152px}.player-copy strong{font-size:13px}.player-copy span{font-size:11px}}`;
    document.head.appendChild(style);

    const player=document.createElement('div');
    player.id='staxx-player';
    player.className='staxx-player';
    player.innerHTML=`<div class="staxx-player-bar"><img id="player-artwork" class="player-artwork" src="releases/anxiety-2026.jpg" alt="ANXIETY 2026"><div class="player-copy"><strong id="player-title">ANXIETY 2026</strong><span id="player-status">Joel Staxx • Spotify</span></div><div class="player-actions"><button class="player-primary" id="player-toggle" type="button" aria-label="Open Joel Staxx player">▶</button><a href="https://open.spotify.com/artist/5meq6ehyXMOa6jqWGXtvGN" target="_blank" rel="noopener">Spotify</a><button id="player-close" type="button" aria-label="Close player">×</button></div></div><div class="staxx-player-panel"><iframe src="https://open.spotify.com/embed/artist/5meq6ehyXMOa6jqWGXtvGN?utm_source=generator&theme=0" title="Joel Staxx Spotify player" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><div class="player-note">Spotify provides the playback controls. Choose a release above to update the artwork and title.</div></div>`;
    document.body.appendChild(player);

    const toggle=document.getElementById('player-toggle');
    const close=document.getElementById('player-close');
    toggle.addEventListener('click',()=>player.classList.toggle('is-open'));
    close.addEventListener('click',()=>player.remove());

    const artworkMap={'ANXIETY 2026':'releases/anxiety-2026.jpg','KNOWING ME':'releases/knowing-me.jpg','SLIPPING':'releases/slipping.jpg','MIGHT BE FREESTYLE':'releases/might-be-freestyle.jpg','UPLIFT':'releases/uplift.jpg'};
    document.querySelectorAll('.release-card').forEach(card=>{
      const select=()=>{
        const name=card.dataset.title||'Joel Staxx';
        document.getElementById('player-title').textContent=name;
        document.getElementById('player-status').textContent=card.dataset.meta||'Joel Staxx • Spotify';
        if(artworkMap[name]) document.getElementById('player-artwork').src=artworkMap[name];
        player.classList.add('is-open');
      };
      card.addEventListener('click',select);
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}});
    });
  }
});