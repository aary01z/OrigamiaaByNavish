// ============================================================
//  ORIGAMI BY OrigamiaaByNavish — cart.js
//  Cart rendering, quantity updates, coupon, order summary
// ============================================================

const SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 79;

// ── Coupon codes ──────────────────────────────────────────────
const COUPONS = {
  'ORIGAMI10': { type: 'percent', value: 10, label: '10% off' },
  'FOLD20':    { type: 'percent', value: 20, label: '20% off' },
  'FIRST50':   { type: 'flat',    value: 50, label: '₹50 off' },
  'CRANE100':  { type: 'flat',    value: 100, label: '₹100 off' },
};

let appliedCoupon = null;

// ── Render Cart ───────────────────────────────────────────────
function renderCart() {
  const cart = window.OrigamiSite.getCart();
  const cartItems = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const cartFull = document.getElementById('cart-full');

  if (!cart.length) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartFull)   cartFull.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartFull)   cartFull.style.display = 'grid';

  if (!cartItems) return;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item__image">
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--cream-dark)">${item.emoji || '📦'}</div>
      </div>
      <div>
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__meta">${item.category} · ${item.type}</div>
        <div class="qty-stepper" style="width:fit-content">
          <button class="qty-minus" onclick="changeQty(${item.id}, -1)">−</button>
          <input type="number" value="${item.qty || 1}" min="1" max="20"
            onchange="setQty(${item.id}, this.value)" readonly>
          <button class="qty-plus" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <span class="cart-item__remove" onclick="removeItem(${item.id})">✕ Remove</span>
      </div>
      <div class="cart-item__price">₹${((item.price) * (item.qty || 1)).toLocaleString()}</div>
    </div>
  `).join('');

  updateSummary(cart);
}

function changeQty(id, delta) {
  let cart = window.OrigamiSite.getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  window.OrigamiSite.saveCart(cart);
  renderCart();
}

function setQty(id, val) {
  let cart = window.OrigamiSite.getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, parseInt(val) || 1);
  window.OrigamiSite.saveCart(cart);
  renderCart();
}

function removeItem(id) {
  window.OrigamiSite.removeFromCart(id);
  renderCart();
  window.OrigamiSite.showToast('Item removed from cart', 'info');
}

// ── Order Summary ─────────────────────────────────────────────
function updateSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = Math.round(subtotal * appliedCoupon.value / 100);
    } else {
      discount = appliedCoupon.value;
    }
  }

  const total = subtotal + shipping - discount;

  setText('summary-subtotal', `₹${subtotal.toLocaleString()}`);
  setText('summary-shipping', shipping === 0 ? 'Free ✦' : `₹${shipping}`);
  setText('summary-discount', discount > 0 ? `−₹${discount.toLocaleString()}` : '—');
  setText('summary-total', `₹${total.toLocaleString()}`);

  const freeShipEl = document.getElementById('free-ship-msg');
  if (freeShipEl) {
    if (shipping > 0) {
      const remaining = SHIPPING_THRESHOLD - subtotal;
      freeShipEl.textContent = `Add ₹${remaining} more for free shipping!`;
      freeShipEl.style.display = 'block';
    } else {
      freeShipEl.textContent = '✦ You have free shipping!';
      freeShipEl.style.display = 'block';
    }
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Coupon ────────────────────────────────────────────────────
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  const msg   = document.getElementById('coupon-msg');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const coupon = COUPONS[code];

  if (!coupon) {
    if (msg) { msg.textContent = 'Invalid coupon code.'; msg.style.color = 'var(--rust)'; }
    return;
  }

  appliedCoupon = coupon;
  if (msg) { msg.textContent = `✦ Coupon applied: ${coupon.label}`; msg.style.color = 'var(--sage)'; }
  window.OrigamiSite.showToast(`Coupon "${code}" applied!`, 'success');
  renderCart();
}

// ── Recommendations ───────────────────────────────────────────
function renderRecommendations() {
  const cart = window.OrigamiSite.getCart();
  const cartIds = cart.map(i => i.id);
  const cartCats = [...new Set(cart.map(i => i.category))];

  if (typeof PRODUCTS === 'undefined') return;

  let recs = PRODUCTS.filter(p => !cartIds.includes(p.id));
  // Prioritise same category
  recs.sort((a,b) => {
    const aMatch = cartCats.includes(a.category) ? 1 : 0;
    const bMatch = cartCats.includes(b.category) ? 1 : 0;
    return bMatch - aMatch || b.rating - a.rating;
  });
  recs = recs.slice(0, 4);

  const container = document.getElementById('recommendations');
  if (!container || !recs.length) return;

  container.innerHTML = `
    <div class="section-header" style="margin-bottom:2rem">
      <p class="eyebrow">You may also like</p>
      <h3>Complete your collection</h3>
    </div>
    <div class="grid-4">
      ${recs.map(p => `
        <div class="product-card">
          <div class="product-card__image">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;background:var(--cream-dark)">${p.emoji}</div>
          </div>
          <div class="product-card__body">
            <div class="product-card__category">${p.category}</div>
            <div class="product-card__name">${p.name}</div>
            <div class="product-card__price">
              <span class="product-card__price-main">₹${p.price.toLocaleString()}</span>
            </div>
          </div>
          <div class="product-card__footer">
            <button class="product-card__add-btn" onclick="window.OrigamiSite.addToCart(PRODUCTS.find(x=>x.id==${p.id}));renderCart();renderRecommendations()">+ Add</button>
          </div>
        </div>`).join('')}
    </div>`;
}

// ── Checkout Button ───────────────────────────────────────────
document.getElementById('checkout-btn')?.addEventListener('click', () => {
  const cart = window.OrigamiSite.getCart();
  if (!cart.length) {
    window.OrigamiSite.showToast('Your cart is empty!', 'error');
    return;
  }
  window.location.href = 'checkout.html';
});

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  // Load products for recommendations
  const script = document.createElement('script');
  script.src = 'js/shop.js';
  script.onload = renderRecommendations;
  document.head.appendChild(script);
});

// Expose for inline handlers
window.changeQty = changeQty;
window.setQty = setQty;
window.removeItem = removeItem;
window.applyCoupon = applyCoupon;