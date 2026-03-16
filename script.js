// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  if (cursorGlow && window.innerWidth > 768) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

// ===== Scroll-triggered Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ===== Counter Animation =====
const animateCounter = (el, target, duration = 2000) => {
  const start = 0;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(update);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberEl = entry.target.querySelector('.stat-number');
      const target = parseInt(numberEl?.dataset.count || 0, 10);
      if (numberEl && target) {
        animateCounter(numberEl, target);
        statsObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => statsObserver.observe(stat));

// ===== Magnetic Button Effect =====
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * 0.2;
    const moveY = y * 0.2;

    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// ===== Hero Title Letter Animation =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const lines = heroTitle.querySelectorAll('.title-line');
  lines.forEach((line, lineIndex) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.overflow = 'visible';

    text.split('').forEach((char, charIndex) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      span.style.animationDelay = `${(lineIndex * 0.1 + charIndex * 0.03)}s`;
      line.appendChild(span);
    });
  });
}

// Add char animation to CSS dynamically or ensure it exists
const style = document.createElement('style');
style.textContent = `
  .title-line .char {
    display: inline-block;
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }
`;
document.head.appendChild(style);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('.burger')?.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// ===== Mobile Menu =====
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  burger.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// ===== Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Section title reveal animation =====
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.3 });

sectionTitles.forEach(t => titleObserver.observe(t));

// ===== Parallax scroll effect (subtle) =====
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scrolled = window.scrollY;
    document.querySelectorAll('section').forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const speed = 0.02 * (i % 2 === 0 ? 1 : -1);
      const offset = Math.min(20, Math.max(-20, (window.innerHeight / 2 - rect.top) * speed));
      section.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  });
});

// ===== Button subtle pulse =====
const primaryBtns = document.querySelectorAll('.btn-primary');
primaryBtns.forEach(btn => {
  btn.style.animation = 'btnPulse 3s ease-in-out infinite';
});

