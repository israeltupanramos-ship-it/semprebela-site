document.querySelectorAll('.section-heading, .cards article, .gallery-grid figure, .final-cta > *').forEach((el) => {
  el.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('.js-whatsapp').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof fbq === 'function') {
      fbq('trackCustom', 'CliqueGrupoWhatsApp');
      fbq('track', 'Lead');
    }
  });
});

const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dots = Array.from(document.querySelectorAll('.carousel-dots button'));
const previousButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const carousel = document.querySelector('.carousel-shell');

let currentSlide = 0;
let autoplayTimer;
let touchStartX = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = window.setInterval(nextSlide, 3800);
}

function stopAutoplay() {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer);
  }
}

previousButton?.addEventListener('click', () => {
  previousSlide();
  startAutoplay();
});

nextButton?.addEventListener('click', () => {
  nextSlide();
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    startAutoplay();
  });
});

carousel?.addEventListener('mouseenter', stopAutoplay);
carousel?.addEventListener('mouseleave', startAutoplay);

carousel?.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
  stopAutoplay();
}, { passive: true });

carousel?.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) > 45) {
    distance > 0 ? previousSlide() : nextSlide();
  }

  startAutoplay();
}, { passive: true });

showSlide(0);
startAutoplay();
