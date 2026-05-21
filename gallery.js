// ============================================================
//  OrigamiaaByNavish — gallery.js
//  Gallery filter, masonry, lightbox
// ============================================================

const GALLERY_ITEMS = [
  { id: 1,  emoji: '🐉', title: 'Dragon of Fortune',   category: 'mythical', featured: true },
  { id: 2,  emoji: '🦚', title: 'Peacock Display',      category: 'birds',    featured: true },
  { id: 3,  emoji: '🐟', title: 'Koi Prosperity Fish',  category: 'fish',     featured: false },
  { id: 4,  emoji: '🐯', title: 'Paper Tiger',          category: 'wild',     featured: true },
  { id: 5,  emoji: '🕊️', title: 'Senbazuru Crane',      category: 'birds',    featured: false },
  { id: 6,  emoji: '🦄', title: 'Paper Unicorn',        category: 'mythical', featured: false },
  { id: 7,  emoji: '🐘', title: 'Elephant Wisdom',      category: 'wild',     featured: false },
  { id: 8,  emoji: '🐳', title: 'Paper Whale',          category: 'fish',     featured: false },
  { id: 9,  emoji: '🐼', title: 'Paper Panda',          category: 'wild',     featured: true },
  { id: 10, emoji: '🔥', title: 'Origami Phoenix',      category: 'mythical', featured: true },
  { id: 11, emoji: '🐱', title: 'Origami Cat',          category: 'domestic', featured: false },
  { id: 12, emoji: '🦁', title: 'Safari Lion',          category: 'wild',     featured: false },
  { id: 13, emoji: '🦀', title: 'Origami Crab',         category: 'fish',     featured: false },
  { id: 14, emoji: '🦊', title: 'Origami Fox',          category: 'wild',     featured: false },
  { id: 15, emoji: '🐰', title: 'Origami Rabbit',       category: 'domestic', featured: false },
  { id: 16, emoji: '✨', title: 'Celestial Trio',        category: 'mythical', featured: true },
];

// Random emoji backgrounds for visual variety
const BG_COLORS = [
  '#f0ebe0', '#e8f0e8', '#f0e8e0', '#e8eaf0', '#f5f0e8',
  '#ede8f5', '#f0f5e8', '#f5ebe8'
];

let currentFilter = 'all';
let lightboxIndex = 0;
let filtered = [...GALLERY_ITEMS];

// ── Render ────────────────────────────────────────────────────
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  filtered = currentFilter === 'all'
    ? [...GALLERY_ITEMS]
    : GALLERY_ITEMS.filter(i => i.category === currentFilter);

  container.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-item reveal" data-delay="${idx * 60}"
         onclick="openLightbox(${idx})"
         style="${item.featured ? 'grid-row: span 2;' : ''}">
      <div style="
        width:100%;
        aspect-ratio:${item.featured ? '3/4' : '1'};
        background:${BG_COLORS[idx % BG_COLORS.length]};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${item.featured ? '7rem' : '5rem'};
      ">${item.emoji}</div>
      <div class="gallery-item__overlay">
        <div style="text-align:center;padding:1rem">
          <div style="font-size:1.8rem;margin-bottom:0.5rem">${item.emoji}</div>
          <div style="font-family:var(--font-display);font-size:1.1rem">${item.title}</div>
          <div style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;margin-top:0.3rem;opacity:0.7">${item.category}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Reinit scroll reveal
  if (typeof initReveal === 'function') initReveal();
}

// ── Filter Tabs ───────────────────────────────────────────────
function initGalleryFilters() {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery();
    });
  });
}

// ── Lightbox ─────────────────────────────────────────────────
function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  updateLightboxContent();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = filtered[lightboxIndex];
  if (!item) return;
  const content = document.getElementById('lightbox-content');
  if (!content) return;
  content.innerHTML = `
    <div style="
      width: min(480px, 85vw);
      aspect-ratio: 1;
      background: var(--cream-dark);
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: min(10rem, 25vw);
    ">${item.emoji}</div>
    <div style="margin-top:1.5rem;text-align:center;color:white">
      <div style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.3rem">${item.title}</div>
      <div style="font-size:0.78rem;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6">${item.category}</div>
      <a href="shop.html?category=${item.category}" style="display:inline-block;margin-top:1rem;padding:0.6rem 1.5rem;background:var(--rust);color:white;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;border-radius:2px">
        Shop ${item.category}
      </a>
    </div>
  `;
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % filtered.length;
  updateLightboxContent();
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + filtered.length) % filtered.length;
  updateLightboxContent();
}

// ── Keyboard Nav ──────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowLeft') lightboxPrev();
});

// Expose for inline handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lightboxNext = lightboxNext;
window.lightboxPrev = lightboxPrev;

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  initGalleryFilters();
});