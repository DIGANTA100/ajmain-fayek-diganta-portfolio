/* ═══════════════════════════════════════════════
   AJMAIN FAYEK DIGANTA — PORTFOLIO JAVASCRIPT
═══════════════════════════════════════════════ */

'use strict';

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Grow on interactive elements
  const interactables = 'a, button, .pill, .focus-card, .proj-card, .gh-card, .contact-card, .cp-chip, .interest-chip';
  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px';
      cursor.style.height = '18px';
      cursor.style.background = 'rgba(139,92,246,.5)';
      follower.style.width  = '50px';
      follower.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      cursor.style.background = '#8b5cf6';
      follower.style.width  = '32px';
      follower.style.height = '32px';
    });
  });
})();

/* ── NAVBAR SCROLL EFFECT ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ── HAMBURGER MOBILE MENU ── */
(function initMobileMenu() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('open');
      links.classList.remove('open');
    }
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          let delay = 0;
          siblings.forEach((sib, idx) => {
            if (sib === entry.target) delay = idx * 80;
          });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();

/* ── ACTIVE NAV LINK ── */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ── SMOOTH NUMBER COUNTER ── */
(function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  function countUp(el) {
    const target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.textContent.replace(/[0-9.]/g, '');
    const duration = 1800;
    const start = performance.now();
    const isFloat = String(target).includes('.');

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = eased * target;
      el.textContent = (isFloat ? current.toFixed(2) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(el => observer.observe(el));
})();

/* ── PARALLAX ORB ── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 10;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();

/* ── HERO TEXT TYPING EFFECT ── */
(function initTyping() {
  const roleEl = document.querySelector('.hero-role');
  if (!roleEl) return;

  const roles = [
    'Full-Stack Developer',
    'Competitive Programmer',
    'Backend Enthusiast',
    'Problem Solver',
    'CSE @ BUET'
  ];

  // Only animate the second tag (index 1)
  const tags = roleEl.querySelectorAll('.role-tag');
  if (tags.length < 2) return;

  const dynamicTag = tags[1];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];
    if (!deleting) {
      dynamicTag.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      dynamicTag.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 85);
  }

  setTimeout(type, 1200);
})();

/* ── PILL HOVER GLOW ── */
(function initPillGlow() {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.boxShadow = '0 0 12px rgba(139,92,246,.3)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.boxShadow = '';
    });
  });
})();

/* ── GITHUB CARD TILT ── */
(function initTilt() {
  const cards = document.querySelectorAll('.gh-card, .proj-card, .focus-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── HIGHLIGHT ACTIVE NAV LINK ON CLICK ── */
(function initNavHighlight() {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
    });
  });
})();

/* ── PAGE LOAD ENTRANCE ── */
(function initPageLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();

/* ── CONSOLE EASTER EGG ── */
console.log(
  '%c👋 Hey there, developer!',
  'font-size:1.4rem;font-weight:bold;color:#8b5cf6;'
);
console.log(
  '%cThis portfolio was built by Ajmain Fayek Diganta.\nIf you\'re reading this, you\'re probably a developer too — feel free to connect!',
  'color:#94a3b8;font-size:0.9rem;'
);

/* ═══════════════════════════════════════════════
   JOURNEY — FILTER & LIGHTBOX
═══════════════════════════════════════════════ */

/* ── JOURNEY FILTER TABS ── */
(function initJourneyFilter() {
  const btns  = document.querySelectorAll('.jf-btn');
  const items = document.querySelectorAll('.jt-item');
  if (!btns.length || !items.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active tab
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.classList.remove('filtered-out');
          // Re-trigger reveal animation
          if (!item.classList.contains('visible')) {
            item.classList.add('visible');
          }
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });
})();

/* ── LIGHTBOX ── */
let lbImages  = [];
let lbIndex   = 0;

function openLightbox(slotEl) {
  const card = slotEl.closest('.jt-card');
  const title = card ? card.querySelector('.jt-title').textContent : '';

  // Collect all valid images in the same gallery
  const gallery = slotEl.closest('.jt-gallery');
  const slots   = gallery ? [...gallery.querySelectorAll('.jt-img-slot')] : [slotEl];

  lbImages = slots
    .map(s => {
      const img = s.querySelector('img');
      return img && img.complete && img.naturalWidth > 0
        ? { src: img.src, alt: img.alt || title }
        : null;
    })
    .filter(Boolean);

  // Find clicked index
  const clickedImg = slotEl.querySelector('img');
  lbIndex = lbImages.findIndex(i => i.src === (clickedImg && clickedImg.src));
  if (lbIndex === -1) lbIndex = 0;

  if (!lbImages.length) return; // no loaded images — skip

  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLightbox() {
  const img  = document.getElementById('lbImg');
  const cap  = document.getElementById('lbCaption');
  const curr = lbImages[lbIndex];
  img.src      = curr.src;
  img.alt      = curr.alt;
  cap.textContent = curr.alt + (lbImages.length > 1 ? `  (${lbIndex + 1} / ${lbImages.length})` : '');

  // Show/hide nav arrows
  const prev = document.querySelector('.lb-prev');
  const next = document.querySelector('.lb-next');
  if (prev) prev.style.display = lbImages.length > 1 ? 'flex' : 'none';
  if (next) next.style.display = lbImages.length > 1 ? 'flex' : 'none';
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  img.style.transition = 'opacity .15s';
  setTimeout(() => {
    renderLightbox();
    img.style.opacity = '1';
  }, 150);
}

function closeLightbox(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  lbImages = [];
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'Escape')     closeLightbox();
});