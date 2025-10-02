// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Back to top button show/hide
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    if (!toTop) return;
    toTop.style.display = window.scrollY > 400 ? 'inline-flex' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const primaryNav = document.getElementById('primaryNav');
  if (menuBtn && primaryNav) {
    menuBtn.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---------------------------------------
  // Scroll Reveal using IntersectionObserver
  // ---------------------------------------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    });

    // For each section, reveal title + grid children (with stagger)
    document.querySelectorAll('section').forEach((section) => {
      const title = section.querySelector('.section-title');
      if (title) {
        title.classList.add('reveal');
        observer.observe(title);
      }

      const items = section.querySelectorAll('.grid > *');
      items.forEach((el, i) => {
        el.classList.add('reveal');
        // directional variety
        if (i % 3 === 0) el.classList.add('left');
        if (i % 3 === 2) el.classList.add('right');
        el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
        observer.observe(el);
      });

      // Any cards directly under section (fallback)
      const looseCards = section.querySelectorAll(':scope > .card, :scope > .project');
      looseCards.forEach((el, i) => {
        el.classList.add('reveal', 'zoom');
        el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
        observer.observe(el);
      });
    });

    // Reveal hero content immediately
    const heroContainer = document.querySelector('.hero > .container');
    if (heroContainer) {
      heroContainer.classList.add('reveal');
      heroContainer.style.transitionDelay = '80ms';
      requestAnimationFrame(() => heroContainer.classList.add('is-visible'));
    }

    // Footer reveal
    const footer = document.querySelector('footer');
    if (footer) {
      footer.classList.add('reveal');
      observer.observe(footer);
    }
  }
});
