
document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     NAV — scroll shadow + active link + mobile
  ────────────────────────────────────────── */
  const nav        = document.querySelector('.nav');
  const navLinks   = document.querySelectorAll('.nav__links a');
  const hamburger  = document.querySelector('.nav__hamburger');
  const drawer     = document.querySelector('.nav__drawer');
  const sections   = document.querySelectorAll('section[id], header[id]');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active nav link via IntersectionObserver
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));

  // Mobile hamburger
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }


  /* ──────────────────────────────────────────
     TYPEWRITER — hero subtitle
  ────────────────────────────────────────── */
  const tw = document.querySelector('[data-typewriter]');
  if (tw) {
    const phrases    = JSON.parse(tw.dataset.typewriter);
    let phraseIdx    = 0;
    let charIdx      = 0;
    let deleting     = false;
    const TYPE_SPEED = 65;
    const DEL_SPEED  = 35;
    const PAUSE_END  = 1800;
    const PAUSE_NEW  = 400;

    function tick() {
      const current = phrases[phraseIdx];
      if (!deleting) {
        tw.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          return setTimeout(tick, PAUSE_END);
        }
      } else {
        tw.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          return setTimeout(tick, PAUSE_NEW);
        }
      }
      setTimeout(tick, deleting ? DEL_SPEED : TYPE_SPEED);
    }
    tick();
  }


  /* ──────────────────────────────────────────
     SCROLL REVEAL
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-group');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObserver.observe(el));

});