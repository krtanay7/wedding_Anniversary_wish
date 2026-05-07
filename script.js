const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const names = 'Nalin ❤ Jyoti';
const message = 'Dear Nalin and Jyoti, your journey from 2002 to 2026 is a beautiful story of trust, care, laughter, and forever love. May every coming year bring more smiles, blessings, and golden memories.';
const galleryImages = [
  'images/1.JPG',
  'images/2.JPG',
  'images/3.png',
  'images/10.jpg',
  'images/11.JPG'
];

const gridImages = [
  'images/1.JPG',
  'images/2.JPG',
  'images/3.png',
  'images/4.jpg',
  'images/5.jpg',
  'images/6.jpg',
  'images/7.jpg',
  'images/8.jpg',
  'images/9.jpg',
  'images/10.jpg',
  'images/11.JPG'
];
const memoryCaptions = [
  'A Beautiful Beginning',
  'Moments of Joy',
  'Together Always',
  'Our Little World',
  'Smiles Forever',
  'Golden Memories',
  'Family Love',
  'Blessed Moments',
  'Hand in Hand',
  'Pure Happiness',
  'Forever Together'
];

function typeText(el, text, speed = 80) {
  if (!el) return;
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i);
    i += 1;
    if (i <= text.length) setTimeout(tick, speed);
  };
  tick();
}

function setupCursor() {
  const cursor = $('#cursor');
  const trail = $('#cursorTrail');
  if (!cursor || !trail) return;

  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    trail.style.left = `${event.clientX}px`;
    trail.style.top = `${event.clientY}px`;
  });
}

function createStars() {
  const layer = $('#starsLayer');
  if (!layer) return;
  for (let i = 0; i < 90; i += 1) {
    const star = document.createElement('span');
    const size = Math.random() * 2.5 + 1;
    star.className = 'star';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--dur', `${Math.random() * 3 + 2}s`);
    layer.appendChild(star);
  }
}

function createPetals() {
  const layer = $('#rosePetals');
  if (!layer) return;
  for (let i = 0; i < 32; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = ['❤', '❦', '♥'][i % 3];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.color = i % 2 ? '#f4a0b0' : '#c9966f';
    petal.style.setProperty('--dur', `${Math.random() * 7 + 7}s`);
    petal.style.setProperty('--delay', `${Math.random() * 8}s`);
    layer.appendChild(petal);
  }
}

function setupTilt() {
  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.2 });
  $$('.scroll-reveal').forEach((el) => observer.observe(el));
}

function renderGallery() {
  const carousel = $('#carousel');
  const photoGrid = $('#photoGrid');

  if (carousel) {
    carousel.innerHTML = galleryImages.map((src, index) => `
      <div class="carousel-slide${index === 0 ? ' active' : ''}">
        <div class="polaroid">
          <img src="${src}" alt="Memory ${index + 1}" onerror="this.src='https://placehold.co/400x500/3d1a24/f4c2c2?text=Photo+${index + 1}'"/>
          <p>${memoryCaptions[index] || 'Beautiful Memory'}</p>
        </div>
      </div>
    `).join('');
  }

  if (photoGrid) {
    photoGrid.innerHTML = gridImages.map((src, index) => {
      return `
        <div class="photo-item" data-index="${index}">
          <img src="${src}" alt="Photo ${index + 1}" onerror="this.src='https://placehold.co/500x500/3d1a24/f4c2c2?text=Photo+${index + 1}'"/>
          <div class="photo-overlay"><span>View</span></div>
        </div>
      `;
    }).join('');
  }
}

function setupCarousel() {
  const slides = $$('.carousel-slide');
  const dotsWrap = $('#carouselDots');
  if (!slides.length || !dotsWrap) return;

  let current = 0;
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Show memory ${index + 1}`);
    dot.addEventListener('click', () => show(index));
    dotsWrap.appendChild(dot);
  });

  const dots = $$('.dot', dotsWrap);
  function show(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  $('#prevBtn')?.addEventListener('click', () => show(current - 1));
  $('#nextBtn')?.addEventListener('click', () => show(current + 1));
  setInterval(() => show(current + 1), 4500);
}

function setupLightbox() {
  const lightbox = $('#lightbox');
  const image = $('#lightboxImg');
  if (!lightbox || !image) return;
  let current = 0;

  function open(index) {
    current = index;
    image.src = gridImages[current];
    lightbox.classList.add('open');
  }

  function close() {
    lightbox.classList.remove('open');
  }

  function move(step) {
    current = (current + step + gridImages.length) % gridImages.length;
    image.src = gridImages[current];
  }

  $$('.photo-item').forEach((item, index) => item.addEventListener('click', () => open(index)));
  $('#lightboxClose')?.addEventListener('click', close);
  $('#lightboxPrev')?.addEventListener('click', () => move(-1));
  $('#lightboxNext')?.addEventListener('click', () => move(1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
}

function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = 'true';
      const target = Number(entry.target.dataset.count || 0);
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        entry.target.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))).toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  }, { threshold: 0.45 });
  $$('.stat-num').forEach((el) => observer.observe(el));
}

function setupCountdown() {
  const anniversaryMonth = 10;
  const anniversaryDay = 21;
  const parts = {
    days: $('#tDays'),
    hours: $('#tHours'),
    mins: $('#tMins'),
    secs: $('#tSecs')
  };
  if (!parts.days) return;

  const update = () => {
    const now = new Date();
    let target = new Date(now.getFullYear(), anniversaryMonth, anniversaryDay, 0, 0, 0);
    if (target <= now) target = new Date(now.getFullYear() + 1, anniversaryMonth, anniversaryDay, 0, 0, 0);
    const diff = Math.max(target - now, 0);
    parts.days.textContent = Math.floor(diff / 86400000);
    parts.hours.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
    parts.mins.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
    parts.secs.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
  };
  update();
  setInterval(update, 1000);
}

function setupQuotes() {
  const slides = $$('.quote-slide');
  if (!slides.length) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5500);
}

function setupHeartBurst() {
  const button = $('#explodeBtn');
  const wrap = $('#explodeHearts');
  if (!button || !wrap) return;

  button.addEventListener('click', () => {
    const rect = button.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2 + window.scrollY;

    for (let i = 0; i < 28; i += 1) {
      const heart = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 28;
      const distance = 90 + Math.random() * 170;
      heart.className = 'burst-heart';
      heart.textContent = ['❤', '♥', '💖'][i % 3];
      heart.style.left = `${originX}px`;
      heart.style.top = `${originY}px`;
      heart.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      heart.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
      heart.style.setProperty('--dur', `${1.1 + Math.random() * 0.8}s`);
      wrap.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  });
}

function playMusic() {
  const music = $('#bgMusic');
  const button = $('#musicBtn');
  if (!music) return;
  music.volume = 0.55;
  music.play()
    .then(() => button?.classList.add('playing'))
    .catch(() => {});
}

function setupMusicButton() {
  const music = $('#bgMusic');
  const button = $('#musicBtn');
  if (!music || !button) return;

  button.addEventListener('click', () => {
    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      button.classList.remove('playing');
    }
  });
}

function launchConfetti(duration = 2200) {
  const canvas = $('#confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = ['#d4af37', '#f5e6a3', '#f4a0b0', '#c0392b', '#ffffff'];
  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -30 - Math.random() * window.innerHeight * 0.45,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 4 + 2.4,
    drift: Math.random() * 3 - 1.5,
    rotation: Math.random() * Math.PI,
    spin: Math.random() * 0.22 - 0.11,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  const start = performance.now();

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.rotation += piece.spin;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.globalAlpha = Math.max(1 - elapsed / duration, 0);
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.55);
      ctx.restore();
    });
    if (elapsed < duration) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  resize();
  requestAnimationFrame(draw);
}

function launchFireworks(duration = 2300) {
  const canvas = $('#fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#d4af37', '#f5e6a3', '#f4a0b0', '#ffffff'];
  const start = performance.now();

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function burst(x, y) {
    for (let i = 0; i < 46; i += 1) {
      const angle = (Math.PI * 2 * i) / 46;
      const speed = Math.random() * 3.3 + 1.6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: Math.random() * 34 + 34,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.035;
      particle.life -= 1;
      ctx.beginPath();
      ctx.globalAlpha = Math.max(particle.life / 68, 0);
      ctx.fillStyle = particle.color;
      ctx.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    if (elapsed < duration || particles.length) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  resize();
  burst(window.innerWidth * 0.28, window.innerHeight * 0.3);
  setTimeout(() => burst(window.innerWidth * 0.72, window.innerHeight * 0.28), 320);
  setTimeout(() => burst(window.innerWidth * 0.5, window.innerHeight * 0.2), 650);
  requestAnimationFrame(draw);
}

function setupIntro() {
  const intro = $('#introScreen');
  const button = $('#openSurpriseBtn');
  if (!intro || !button) return;

  document.body.classList.add('intro-active');
  button.addEventListener('click', () => {
    intro.classList.add('hiding');
    document.body.classList.remove('intro-active');
    document.body.classList.add('home-revealed');
    playMusic();
    setTimeout(() => {
      launchConfetti();
      launchFireworks();
    }, 260);
    setTimeout(() => intro.remove(), 1050);
  }, { once: true });
}

function setupCanvasHearts() {
  const canvas = $('#heartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hearts = [];

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function addHeart() {
    hearts.push({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 30,
      size: Math.random() * 16 + 10,
      speed: Math.random() * 0.8 + 0.4,
      drift: Math.random() * 1.2 - 0.6,
      alpha: Math.random() * 0.35 + 0.2
    });
    if (hearts.length > 70) hearts.shift();
  }

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(-28, -10, -8, -28, 0, -12);
    ctx.bezierCurveTo(8, -28, 28, -10, 0, 10);
    ctx.fillStyle = `rgba(244,160,176,${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    hearts.forEach((heart) => {
      heart.y -= heart.speed;
      heart.x += heart.drift;
      drawHeart(heart.x, heart.y, heart.size, heart.alpha);
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(addHeart, 260);
  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  setupIntro();
  setupCursor();
  createStars();
  createPetals();
  setupTilt();
  setupReveal();
  setupCarousel();
  setupLightbox();
  setupCounters();
  setupCountdown();
  setupQuotes();
  setupHeartBurst();
  setupMusicButton();
  setupCanvasHearts();
  typeText($('#typedNames'), names, 95);
  setTimeout(() => typeText($('#messageText'), message, 34), 900);
});
