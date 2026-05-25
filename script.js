function pageImg(page){return `assets/images/p${String(page).padStart(2,'0')}.jpg`}
function textToHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
const statement=document.getElementById('statementText');
statement.innerHTML=textToHtml(PORTFOLIO_DATA.statement);
const grid=document.getElementById('projectGrid');
const detail=document.getElementById('projectDetail');
PORTFOLIO_DATA.projects.forEach((project,idx)=>{
  const btn=document.createElement('button');
  btn.className='project-card';
  btn.type='button';
  btn.innerHTML=`<img src="${pageImg(project.cover)}" alt="${project.title}"><div class="project-card-body"><h3>${project.title}</h3><p>${project.years} · ${project.pages.length} pages</p></div>`;
  btn.addEventListener('click',()=>openProject(project));
  grid.appendChild(btn);
});
function openProject(project){
  const textBlocks=project.pages.map(pg=>project.texts[String(pg)] ? `<div class="project-text">${textToHtml(project.texts[String(pg)])}</div>` : '').join('');
  const gallery=project.pages.map(pg=>`<figure><button type="button" data-img="${pageImg(pg)}"><img src="${pageImg(pg)}" alt="${project.title}, page ${pg}"></button><figcaption class="caption">Page ${pg}</figcaption></figure>`).join('');
  detail.innerHTML=`<div class="detail-shell"><div class="detail-head"><div class="detail-title"><p class="eyebrow">Project</p><h2>${project.title}</h2><p class="meta">${project.years}</p></div><div class="text-stack">${textBlocks}</div></div><div class="gallery">${gallery}</div></div>`;
  detail.querySelectorAll('[data-img]').forEach(b=>b.addEventListener('click',()=>openLightbox(b.dataset.img)));
  detail.scrollIntoView({behavior:'smooth',block:'start'});
  history.replaceState(null,'',`#${project.id}`);
}
const lightbox=document.getElementById('lightbox');
const lightboxImg=lightbox.querySelector('img');
function openLightbox(src){lightboxImg.src=src;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src=''}
lightbox.querySelector('.close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
const initial=location.hash.replace('#','');
if(initial){const p=PORTFOLIO_DATA.projects.find(x=>x.id===initial);if(p) setTimeout(()=>openProject(p),150)}
