const works = [10,11,13,16,17,19,20,21,23,24,25,27,28,29,30,31,33,34,36,37,38,39,40,42,43,45,46,48,49,51,52,54,55];
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
works.forEach(n => {
  const file = `assets/images/p${String(n).padStart(2,'0')}.jpg`;
  const button = document.createElement('button');
  const img = document.createElement('img');
  img.src = file;
  img.loading = 'lazy';
  img.alt = `Portfolio image ${n}`;
  button.appendChild(img);
  button.addEventListener('click', () => {
    lightboxImg.src = file;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
  gallery.appendChild(button);
});
function closeLightbox(){lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); lightboxImg.src='';}
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
