/* ═══════════════════════════════════════════════════
   GRIDSETUP – JavaScript
   ═══════════════════════════════════════════════════ */

// ── NAVBAR SCROLL ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER MENU ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ── HERO PARTICLES ────────────────────────────────
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── IMAGE SWITCHER ────────────────────────────────
function switchImg(productId, src, thumbEl) {
  const mainImg = document.getElementById(`main-img-${productId}`);
  if (!mainImg) return;

  // Fade out
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 200);

  // Update active thumb
  const allThumbs = thumbEl.closest('.product-thumbs').querySelectorAll('.thumb');
  allThumbs.forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

// ── FLOATING BUY BUTTON ───────────────────────────
const floatingBuy = document.getElementById('floating-buy');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    floatingBuy.classList.add('visible');
  } else {
    floatingBuy.classList.remove('visible');
  }
});

// ── SCROLL REVEAL ANIMATIONS ──────────────────────
function initReveal() {
  const elements = document.querySelectorAll(
    '.product-card, .benefit-card, .review-card, .section-header, .hero-stats, .products-cta, .benefits-cta, .reviews-summary'
  );

  elements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Staggered delay for grid items
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
initReveal();

// ── SMOOTH SCROLL FOR NAV LINKS ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────
const sections = document.querySelectorAll('section[id], div[id="contact"]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = '#fff';
          link.style.background = 'rgba(59,130,246,0.12)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ── PRODUCT IMAGE LAZY LOAD FALLBACK ─────────────
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // If image fails, show a placeholder gradient
    this.style.background = 'linear-gradient(135deg, #0d1526, #111827)';
    this.style.opacity = '0.5';
  });
});

// ── LAZADA BUTTON CLICK TRACKING (UX feedback) ───
document.querySelectorAll('a[href*="lazada"]').forEach(btn => {
  btn.addEventListener('click', function() {
    // Visual ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.15);
      border-radius: inherit;
      animation: ripple-fade 0.4s ease-out forwards;
      pointer-events: none;
    `;
    if (this.style.position !== 'absolute') {
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
    }
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-fade {
    from { opacity: 1; transform: scale(0.8); }
    to { opacity: 0; transform: scale(1.2); }
  }
`;
document.head.appendChild(style);

console.log('%c🚀 GridSetup – Loaded!', 'color:#3b82f6;font-size:16px;font-weight:bold;');
// ── FAQ ACCORDION ─────────────────────────────────
function toggleFaq(id) {
  const item = document.getElementById(id);
  if (!item) return;

  const isOpen = item.classList.contains('open');

  // Close all other open items
  document.querySelectorAll('.faq-item.open').forEach(el => {
    if (el !== item) {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle current item
  item.classList.toggle('open', !isOpen);
  item.querySelector('.faq-question').setAttribute('aria-expanded', String(!isOpen));
}