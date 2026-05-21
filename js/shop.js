// ============================================================
//  OrigamiaaByNavish — shop.js
//  Product data + filter / sort / render logic
// ============================================================

const PRODUCTS = [
  // ── Domestic ──────────────────────────────────────────────
  { id: 1,  name: 'Origami Cat',          category: 'domestic', price: 299,  originalPrice: null, rating: 4.7, reviews: 42, badge: null,         emoji: '🐱', type: 'single',     difficulty: 'beginner',     desc: 'A sweet folded cat with perked ears and a curled tail — perfect for any desk or shelf.' },
  { id: 2,  name: 'Paper Puppy',          category: 'domestic', price: 299,  originalPrice: null, rating: 4.6, reviews: 38, badge: null,         emoji: '🐶', type: 'single',     difficulty: 'beginner',     desc: 'Loyal and loveable — this floppy-eared puppy is crafted from a single square of washi paper.' },
  { id: 3,  name: 'Barnyard Buddies',     category: 'domestic', price: 799,  originalPrice: 999,  rating: 4.8, reviews: 19, badge: 'sale',       emoji: '🐮', type: 'collection', difficulty: 'intermediate', desc: 'A charming set of four farm animals — cow, horse, pig, and hen — folded with rustic washi.' },
  { id: 4,  name: 'Origami Rabbit',       category: 'domestic', price: 249,  originalPrice: null, rating: 4.5, reviews: 61, badge: null,         emoji: '🐰', type: 'single',     difficulty: 'beginner',     desc: 'A delicate long-eared rabbit poised mid-hop. Great beginner gift or desk companion.' },

  // ── Wild ──────────────────────────────────────────────────
  { id: 5,  name: 'Paper Tiger',          category: 'wild',     price: 549,  originalPrice: null, rating: 4.9, reviews: 77, badge: 'popular',    emoji: '🐯', type: 'single',     difficulty: 'intermediate', desc: 'Bold, fierce, and absolutely stunning — this tiger is folded from hand-painted foil paper.' },
  { id: 6,  name: 'Elephant Wisdom',      category: 'wild',     price: 649,  originalPrice: 799,  rating: 4.8, reviews: 53, badge: 'sale',       emoji: '🐘', type: 'single',     difficulty: 'advanced',     desc: 'A majestic elephant with a raised trunk for good luck, crafted from thick mulberry paper.' },
  { id: 7,  name: 'Safari Quintet',       category: 'wild',     price: 1899, originalPrice: 2299, rating: 5.0, reviews: 23, badge: 'bestseller', emoji: '🦁', type: 'collection', difficulty: 'advanced',     desc: 'Lion, giraffe, elephant, zebra & rhino — the ultimate collection for a safari lover.' },
  { id: 8,  name: 'Paper Panda',          category: 'wild',     price: 499,  originalPrice: null, rating: 4.7, reviews: 45, badge: null,         emoji: '🐼', type: 'single',     difficulty: 'intermediate', desc: 'A round, peaceful panda in classic black and white washi, sitting in a bamboo pose.' },
  { id: 9,  name: 'Origami Fox',          category: 'wild',     price: 449,  originalPrice: null, rating: 4.6, reviews: 32, badge: null,         emoji: '🦊', type: 'single',     difficulty: 'intermediate', desc: 'A clever fox with a bushy tail — folded from warm terracotta and white layered paper.' },

  // ── Mythical ──────────────────────────────────────────────
  { id: 10, name: 'Dragon of Fortune',    category: 'mythical', price: 899,  originalPrice: 1099, rating: 5.0, reviews: 88, badge: 'bestseller', emoji: '🐉', type: 'single',     difficulty: 'expert',       desc: 'Our signature piece. The Dragon of Fortune is a 300-fold masterwork in gold foil washi.' },
  { id: 11, name: 'Paper Unicorn',        category: 'mythical', price: 699,  originalPrice: null, rating: 4.8, reviews: 41, badge: null,         emoji: '🦄', type: 'single',     difficulty: 'advanced',     desc: 'A graceful unicorn with an elegant spiralled horn, folded from pearlescent white paper.' },
  { id: 12, name: 'Origami Phoenix',      category: 'mythical', price: 999,  originalPrice: 1199, rating: 4.9, reviews: 67, badge: 'popular',    emoji: '🔥', type: 'single',     difficulty: 'expert',       desc: 'Rising from its ashes — this phoenix blazes in hand-dyed crimson and gold foil.' },
  { id: 13, name: 'Celestial Trio',       category: 'mythical', price: 1599, originalPrice: 1899, rating: 4.9, reviews: 28, badge: 'sale',       emoji: '✨', type: 'collection', difficulty: 'expert',       desc: 'Dragon, Phoenix & Unicorn as a set — an extraordinary mythical trio for the collector.' },

  // ── Fish & Ocean ──────────────────────────────────────────
  { id: 14, name: 'Koi Prosperity Fish',  category: 'fish',     price: 429,  originalPrice: null, rating: 4.8, reviews: 55, badge: 'popular',    emoji: '🐟', type: 'single',     difficulty: 'intermediate', desc: 'A shimmering koi carp in red and white washi — a symbol of luck, love, and perseverance.' },
  { id: 15, name: 'Paper Whale',          category: 'fish',     price: 499,  originalPrice: null, rating: 4.7, reviews: 29, badge: null,         emoji: '🐳', type: 'single',     difficulty: 'intermediate', desc: 'A gentle blue whale folded from layered ocean-blue washi with a dramatic spouting tail.' },
  { id: 16, name: 'Origami Crab',         category: 'fish',     price: 399,  originalPrice: 499,  rating: 4.5, reviews: 18, badge: 'sale',       emoji: '🦀', type: 'single',     difficulty: 'advanced',     desc: 'A spiky, intricate crab with all eight legs folded individually from rust-coloured paper.' },
  { id: 17, name: 'Ocean Harmony Set',    category: 'fish',     price: 1099, originalPrice: 1349, rating: 4.9, reviews: 14, badge: null,         emoji: '🐠', type: 'collection', difficulty: 'advanced',     desc: 'Whale, koi, crab & tropical fish — a complete ocean world in paper form.' },

  // ── Birds ─────────────────────────────────────────────────
  { id: 18, name: 'Senbazuru Crane',      category: 'birds',    price: 249,  originalPrice: null, rating: 4.9, reviews: 104,badge: 'bestseller', emoji: '🕊️', type: 'single',     difficulty: 'beginner',     desc: 'The classic origami crane — folded from authentic washi and said to bring 1000 wishes.' },
  { id: 19, name: 'Peacock Display',      category: 'birds',    price: 849,  originalPrice: 999,  rating: 4.8, reviews: 36, badge: 'popular',    emoji: '🦚', type: 'single',     difficulty: 'expert',       desc: 'A show-stopping peacock with a full folded fan tail in iridescent emerald and teal paper.' },
  { id: 20, name: 'Flock of Five',        category: 'birds',    price: 999,  originalPrice: 1199, rating: 4.7, reviews: 22, badge: null,         emoji: '🐦', type: 'collection', difficulty: 'intermediate', desc: 'Five cranes in graduating sizes — a beautiful ensemble piece for walls or gift-giving.' },
];

// ── State ─────────────────────────────────────────────────────
let activeFilters = { category: [], type: [], difficulty: [] };
let maxPrice = 3000;
let sortBy = 'popular';
let searchQuery = '';

// ── Filter & Sort ─────────────────────────────────────────────
function getFilteredProducts() {
  let result = [...PRODUCTS];

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }

  // Category
  if (activeFilters.category.length) {
    result = result.filter(p => activeFilters.category.includes(p.category));
  }

  // Type
  if (activeFilters.type.length) {
    result = result.filter(p => activeFilters.type.includes(p.type));
  }

  // Difficulty
  if (activeFilters.difficulty.length) {
    result = result.filter(p => activeFilters.difficulty.includes(p.difficulty));
  }

  // Price
  result = result.filter(p => p.price <= maxPrice);

  // Sort
  if (sortBy === 'price-asc')  result.sort((a,b) => a.price - b.price);
  if (sortBy === 'price-desc') result.sort((a,b) => b.price - a.price);
  if (sortBy === 'rating')     result.sort((a,b) => b.rating - a.rating);
  if (sortBy === 'newest')     result.sort((a,b) => b.id - a.id);
  if (sortBy === 'popular')    result.sort((a,b) => b.reviews - a.reviews);

  return result;
}

// ── Render Grid ────────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('product-grid');
  const count = document.getElementById('result-count');
  if (!grid) return;

  const products = getFilteredProducts();
  if (count) count.textContent = products.length;

  if (!products.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">🔍</div>
        <h3>No pieces found</h3>
        <p>Try adjusting your filters or search term.</p>
        <button class="btn btn--outline" onclick="clearAllFilters()">Clear Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card reveal">
      <div class="product-card__image">
        <a href="product.html?id=${p.id}">
          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5.5rem;background:var(--cream-dark)">${p.emoji}</div>
        </a>
        ${p.badge ? `<div class="product-card__badge">${p.badge}</div>` : ''}
        <div class="product-card__actions">
          <a href="product.html?id=${p.id}" class="product-card__action-btn" title="View">👁</a>
          <button class="product-card__action-btn" title="Wishlist" onclick="window.OrigamiSite.toggleWishlist(PRODUCTS.find(x=>x.id==${p.id}))">♡</button>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__category">${p.category} · ${p.type}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__price">
          <span class="product-card__price-main">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span class="product-card__price-orig">₹${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="product-card__rating">
          <span style="color:var(--gold)">★★★★${p.rating >= 4.8 ? '★' : '☆'}</span>
          <span>(${p.reviews})</span>
        </div>
      </div>
      <div class="product-card__footer">
        <button class="product-card__add-btn" onclick="window.OrigamiSite.addToCart(PRODUCTS.find(x=>x.id==${p.id}))">+ Add to Cart</button>
      </div>
    </div>
  `).join('');

  // Re-init reveal animations
  if (typeof initReveal === 'function') initReveal();
}

// ── Clear Filters ─────────────────────────────────────────────
function clearAllFilters() {
  activeFilters = { category: [], type: [], difficulty: [] };
  maxPrice = 3000;
  searchQuery = '';
  sortBy = 'popular';

  document.querySelectorAll('[data-filter]').forEach(cb => cb.checked = false);
  const priceRange = document.getElementById('price-range');
  if (priceRange) { priceRange.value = 3000; updatePriceDisplay(3000); }
  const search = document.getElementById('search-input');
  if (search) search.value = '';
  const sort = document.getElementById('sort-select');
  if (sort) sort.value = 'popular';

  renderProducts();
}

// ── Price Display ─────────────────────────────────────────────
function updatePriceDisplay(val) {
  const el = document.getElementById('price-display');
  if (el) el.textContent = `₹0 — ₹${parseInt(val).toLocaleString()}`;

  // Update range slider gradient
  const range = document.getElementById('price-range');
  if (range) {
    const pct = ((val - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, var(--rust) 0%, var(--rust) ${pct}%, #ddd ${pct}%)`;
  }
}

// ── Init Shop Page ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  if (!grid) return; // not on shop page

  // Check URL params for category pre-filter
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    activeFilters.category = [cat];
    const cb = document.querySelector(`[data-filter="category"][value="${cat}"]`);
    if (cb) cb.checked = true;
  }

  // Checkboxes
  document.querySelectorAll('[data-filter]').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.dataset.filter;
      if (cb.checked) {
        activeFilters[key].push(cb.value);
      } else {
        activeFilters[key] = activeFilters[key].filter(v => v !== cb.value);
      }
      renderProducts();
    });
  });

  // Price range
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    updatePriceDisplay(priceRange.value);
    priceRange.addEventListener('input', () => {
      maxPrice = parseInt(priceRange.value);
      updatePriceDisplay(maxPrice);
      renderProducts();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortBy = sortSelect.value;
      renderProducts();
    });
  }

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = searchInput.value.trim();
        renderProducts();
      }, 300);
    });
  }

  // Clear filters
  document.getElementById('clear-filters')?.addEventListener('click', clearAllFilters);

  // View toggle (grid / list)
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.view === 'list') {
        grid.style.gridTemplateColumns = '1fr';
      } else {
        grid.style.gridTemplateColumns = '';
      }
    });
  });

  renderProducts();
});

// Expose for cart.js recommendations
window.clearAllFilters = clearAllFilters;