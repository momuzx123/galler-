// Basic image slider with stack effect and autoplay for b.html

const slider = document.getElementById('slider');
const slides = Array.from(slider.getElementsByClassName('slide'));
const dotsContainer = document.getElementById('slider-dots');
let active = 0;
let autoplayInterval = null;
const AUTOPLAY_DELAY = 3000; // 3 seconds

function updateSlider() {
  slides.forEach((slide, i) => {
    slide.className = 'slide';
    if (i === active) slide.classList.add('active');
    else if (i === (active - 1 + slides.length) % slides.length) slide.classList.add('prev');
    else if (i === (active + 1) % slides.length) slide.classList.add('next');
    else if (i === (active - 2 + slides.length) % slides.length) slide.classList.add('prev2');
    else if (i === (active + 2) % slides.length) slide.classList.add('next2');
  });

  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.className = 'dot' + (i === active ? ' active' : '');
  });
}

function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === active ? ' active' : '');
    d.addEventListener('click', (e) => {
      e.stopPropagation();
      active = i;
      updateSlider();
      resetAutoplay();
    });
    dotsContainer.appendChild(d);
  });
}

slider.addEventListener('click', (e) => {
  // Click left/right sides to go prev/next
  const rect = slider.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width * 0.45) {
    active = (active - 1 + slides.length) % slides.length;
  } else {
    active = (active + 1) % slides.length;
  }
  updateSlider();
  resetAutoplay();
});

function autoplay() {
  autoplayInterval = setInterval(() => {
    active = (active + 1) % slides.length;
    updateSlider();
  }, AUTOPLAY_DELAY);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  autoplay();
}

createDots();
updateSlider();
autoplay();

window.addEventListener('resize', updateSlider);