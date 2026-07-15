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
    // Evento preparado para Meta Pixel:
    // fbq('trackCustom', 'CliqueGrupoWhatsApp');
    console.log('Clique no Grupo VIP');
  });
});
