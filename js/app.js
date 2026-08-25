document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

  const releasePages={
    'SUMMER TIME':'releases/summer-time.html',
    'NO VACANCIES':'releases/no-vacancies.html',
    'KEEP IT REAL 2':'releases/keep-it-real-2.html',
    'DISAPPEAR':'releases/disappear.html',
    'ZOOM':'releases/zoom.html',
    'NIGHT CIRCUS':'releases/night-circus.html'
  };

  document.querySelectorAll('.release-card').forEach(card=>{
    const name=(card.dataset.title||'').toUpperCase();
    if(releasePages[name]){
      card.setAttribute('role','link');
      const go=()=>{window.location.href=releasePages[name]};
      card.addEventListener('click',go,{capture:true});
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
    }
  });

  document.querySelectorAll('.release-card').forEach(card=>{
    const cover=card.querySelector('.cover');
    const img=cover?.querySelector('img');
    const title=card.dataset.title||'Joel Staxx';
    if(cover&&img){img.style.display='none';cover.classList.add('verified-release-cover');cover.innerHTML=`<div class="verified-release-title">${title}</div><div class="verified-release-label">OFFICIAL RELEASE</div><div class="play-overlay"><span class="play-circle">→</span></div>`}
  });

  const latestVideos=[
    {id:'bvxM8v4VSFs',title:'HOT SUMMER DAYS',meta:'Latest Video • 2 days ago'},
    {id:'xXHqD1m8qFs',title:'EYES CLOSED',meta:'Video • 4 weeks ago'},
    {id:'KL9dg37TlAM',title:'KEEP IT G',meta:'Video • 1 month ago'}
  ];
  const videoGrid=document.querySelector('.videos');
  if(videoGrid){
    videoGrid.innerHTML=latestVideos.map(video=>`<a class="video video-card latest-youtube-card" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener" aria-label="Watch ${video.title} on YouTube"><img src="https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title} — Joel Staxx" loading="lazy"><div class="video-play"><span>▶</span></div><div class="label"><strong>${video.title}</strong><small>${video.meta}</small></div></a>`).join('');
  }

  if(!document.getElementById('staxx-player')){
    const style=document.createElement('style');
    style.textContent=`.verified-release-cover{aspect-ratio:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px;background:radial-gradient(circle at 70% 25%,#2460ff55,transparent 36%),linear-gradient(145deg,#101a31,#05070c);position:relative;overflow:hidden}.verified-release-title{font-size:clamp(22px,3vw,34px);font-weight:950;font-style:italic;text-transform:uppercase;line-height:.9;letter-spacing:-1px}.verified-release-label{font-size:8px;letter-spacing:2px;color:#8191aa;margin-top:12px}.latest-youtube-card .label strong,.latest-youtube-card .label small{display:block}.latest-youtube-card .label small{margin-top:5px;font-size:10px;opacity:.72}.staxx-player{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9000;width:min(760px,calc(100% - 28px));background:rgba(12,15,22,.95);border:1px solid rgba(255,255,255,.14);border-radius:18px;box-shadow:0 18px 60px rgba(0,0,0,.45);backdrop-filter:blur(18px);overflow:hidden}.staxx-player-bar{display:grid;grid-template-columns:52px 1fr auto;gap:12px;align-items:center;padding:10px 12px}.player-artwork{width:52px;height:52px;border-radius:10px;object-fit:cover}.player-copy{min-width:0}.player-copy strong,.player-copy span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.player-copy strong{font-size:14px}.player-copy span{font-size:12px;opacity:.58;margin-top:3px}.player-actions{display:flex;gap:7px;align-items:center}.player-actions button,.player-actions a{height:38px;min-width:38px;padding:0 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.05);color:#fff;text-decoration:none;display:inline-grid;place-items:center;cursor:pointer;font:inherit}.player-actions .player-primary{background:#fff;color:#080b12;border-color:#fff}.player-actions button:hover,.player-actions a:hover{background:rgba(255,255,255,.12)}.staxx-player-panel{display:none;border-top:1px solid rgba(255,255,255,.1);padding:12px}.staxx-player.is-open .staxx-player-panel{display:block}.staxx-player-panel iframe{display:block;width:100%;height:152px;border:0;border-radius:12px}.player-note{font-size:11px;opacity:.55;margin:8px 2px 0}@media(max-width:650px){.staxx-player{bottom:10px;width:calc(100% - 18px);border-radius:16px}.staxx-player-bar{grid-template-columns:44px 1fr auto;padding:8px}.player-artwork{width:44px;height:44px}.player-actions a{display:none}.player-actions button{height:36px;min-width:36px;padding:0 9px}.staxx-player-panel iframe{height:152px}}`;
    document.head.appendChild(style);
    const player=document.createElement('div');
    player.id='staxx-player';
    player.className='staxx-player';
    player.innerHTML=`<div class="staxx-player-bar"><img id="player-artwork" class="player-artwork" src="artist/joel-profile.jpg" alt="Joel Staxx"><div class="player-copy"><strong id="player-title">Joel Staxx</strong><span id="player-status">Official Spotify catalog</span></div><div class="player-actions"><button class="player-primary" id="player-toggle" type="button" aria-label="Open Joel Staxx player">▶</button><a href="https://open.spotify.com/artist/5meq6ehyXMOa6jqWGXtvGN" target="_blank" rel="noopener">Spotify</a><button id="player-close" type="button" aria-label="Close player">×</button></div></div><div class="staxx-player-panel"><iframe src="https://open.spotify.com/embed/artist/5meq6ehyXMOa6jqWGXtvGN?utm_source=generator&theme=0" title="Joel Staxx Spotify player" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><div class="player-note">Spotify provides the playback controls. Individual release pages link to the official catalog.</div></div>`;
    document.body.appendChild(player);
    document.getElementById('player-toggle').addEventListener('click',()=>player.classList.toggle('is-open'));
    document.getElementById('player-close').addEventListener('click',()=>player.remove());
  }

  const cinematicCss=document.createElement('link');cinematicCss.rel='stylesheet';cinematicCss.href='css/cinematic-video.css';document.head.appendChild(cinematicCss);
  const cinematicScript=document.createElement('script');cinematicScript.src='js/cinematic-video.js';document.body.appendChild(cinematicScript);
});