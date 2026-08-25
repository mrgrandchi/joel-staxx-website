document.addEventListener('DOMContentLoaded',()=>{
  const videos=document.querySelector('.videos');
  if(!videos) return;

  const latest=[
    {id:'bvxM8v4VSFs',title:'HOT SUMMER DAYS',meta:'Latest Video • 2 days ago'},
    {id:'xXHqD1m8qFs',title:'EYES CLOSED',meta:'Video • 4 weeks ago'},
    {id:'KL9dg37TlAM',title:'KEEP IT G',meta:'Video • 1 month ago'}
  ];

  videos.innerHTML=latest.map(video=>`
    <a class="video video-card latest-youtube-card" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener" aria-label="Watch ${video.title} on YouTube">
      <img src="https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title} — Joel Staxx" loading="lazy">
      <div class="video-play"><span>▶</span></div>
      <div class="label"><strong>${video.title}</strong><small>${video.meta}</small></div>
    </a>
  `).join('');
});
