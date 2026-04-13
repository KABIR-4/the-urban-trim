const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const yearEl = document.getElementById('year');
const retentionValue = document.getElementById('retentionValue');
const retentionCircle = document.querySelector('.circle-progress');

// Set your real retention number here when you have actual data.
const RETENTION_PERCENT = 0;

yearEl.textContent = new Date().getFullYear();

menuBtn?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounter(target, end, duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (end - start) * progress);
    target.textContent = `${value}%`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (retentionCircle) {
  const end = Number(retentionCircle.dataset.percent || RETENTION_PERCENT || 0);
  retentionCircle.style.setProperty('--p', end);
  animateCounter(retentionValue, end, 1300);
}