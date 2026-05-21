// ============================================================
//  OrigamiaaByNavish — main.js
//  Shared utilities: Nav, Toast, Scroll animations, Cart count
// ============================================================

// ── Nav scroll behaviour ──────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// ── Hamburger / Mobile Nav ────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Active Nav Link ───────────────────────────────────────────
(function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Page Loader ───────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
});

// ── Scroll Reveal ─────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}
initReveal();

// ── Toast System ─────────────────────────────────────────────
function showToast(msg, type = 'success', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✦', error: '✕', info: '◆' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || '✦'}</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, duration);
}

// ── Cart Helpers ──────────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem('origami_cart') || '[]'); }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem('origami_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  document.querySelectorAll('.nav__cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`"${product.name}" added to cart ✦`, 'success');
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
}

// ── Wishlist Helpers ─────────────────────────────────────────
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('origami_wishlist') || '[]'); }
  catch { return []; }
}

function toggleWishlist(product) {
  let wishlist = getWishlist();
  const idx = wishlist.findIndex(i => i.id === product.id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`, 'info');
  } else {
    wishlist.push(product);
    showToast(`Added to wishlist ♡`, 'success');
  }
  localStorage.setItem('origami_wishlist', JSON.stringify(wishlist));
  return idx === -1; // returns true if added
}

// ── Init cart count on page load ──────────────────────────────
updateCartCount();

// ── Tabs ─────────────────────────────────────────────────────
function initTabs(container) {
  if (!container) return;
  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector('#' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ── Quantity Stepper ─────────────────────────────────────────
document.querySelectorAll('.qty-stepper').forEach(stepper => {
  const input = stepper.querySelector('input');
  stepper.querySelector('.qty-plus')?.addEventListener('click', () => {
    input.value = parseInt(input.value || 1) + 1;
    input.dispatchEvent(new Event('change'));
  });
  stepper.querySelector('.qty-minus')?.addEventListener('click', () => {
    const val = parseInt(input.value || 1);
    if (val > 1) {
      input.value = val - 1;
      input.dispatchEvent(new Event('change'));
    }
  });
});

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Expose globally ───────────────────────────────────────────
window.OrigamiSite = {
  showToast, getCart, saveCart, addToCart, removeFromCart,
  getWishlist, toggleWishlist, updateCartCount, initTabs
};