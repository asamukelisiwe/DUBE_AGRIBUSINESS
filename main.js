/* ============================================
   DUBE AGRIBUSINESS - Main JavaScript
   Designed by Asanda Shezi
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ======== NAVBAR SCROLL ========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ======== ACTIVE NAV LINK ========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ======== HAMBURGER / MOBILE MENU ========
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ======== COUNTER ANIMATION ========
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = parseInt(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          const duration = 1800;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            entry.target.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  // ======== FADE IN ON SCROLL ========
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // ======== PRODUCTS FILTER ========
  // Maps filter button data-filter values to card data-category values
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-full-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        productCards.forEach(card => {
          const category = card.dataset.category || '';
          const show = filter === 'all' || category === filter;

          if (show) {
            card.style.display = 'block';
            // Trigger reflow for transition
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              if (btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter) {
                card.style.display = 'none';
              }
            }, 280);
          }
        });
      });
    });

    // Apply smooth transitions to all cards on load
    productCards.forEach(card => {
      card.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
    });
  }

  // ======== CONTACT FORM ========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('formSuccess');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        btn.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
        contactForm.reset();
      }, 1200);
    });
  }

  // ======== SMOOTH SCROLL ========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && hamburger) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
        }
      }
    });
  });

  // ======== STICKY FILTER BAR SHADOW ========
  const filterBar = document.querySelector('.products-filter');
  if (filterBar) {
    window.addEventListener('scroll', () => {
      const filterBarTop = filterBar.getBoundingClientRect().top + window.scrollY - 80;
      filterBar.style.boxShadow = window.scrollY >= filterBarTop
        ? '0 4px 20px rgba(26,58,42,0.08)'
        : 'none';
    });
  }

});