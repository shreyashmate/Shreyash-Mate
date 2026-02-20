/**
 * Three.js 3D Floating Shapes
 */
(function() {
  const container = document.getElementById('three-canvas');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const shapes = [];
  const colors = [0x149ddd, 0x0a7fb3, 0x37b3ed];

  for (let i = 0; i < 15; i++) {
    const geometry = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.2, 0);
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      transparent: true,
      opacity: 0.6,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = (Math.random() - 0.5) * 20;
    mesh.position.y = (Math.random() - 0.5) * 20;
    mesh.position.z = (Math.random() - 0.5) * 20 - 5;
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    
    shapes.push({
      mesh: mesh,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      floatSpeed: Math.random() * 0.005 + 0.002,
      floatOffset: Math.random() * Math.PI * 2
    });
    scene.add(mesh);
  }

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    shapes.forEach(shape => {
      shape.mesh.rotation.x += shape.rotationSpeed;
      shape.mesh.rotation.y += shape.rotationSpeed;
      shape.mesh.position.y += Math.sin(time * shape.floatSpeed * 100 + shape.floatOffset) * 0.01;
    });
    renderer.render(scene, camera);
  }

  animate();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/**
 * AI Chatbot
 */
(function() {
  const toggle = document.getElementById('chatbot-toggle');
  const container = document.getElementById('chatbot-container');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messages = document.getElementById('chatbot-messages');

  if (!toggle || !container) return;

  const responses = {
    'hello': 'Hi there! How can I help you?',
    'hi': 'Hello! What would you like to know?',
    'Hey': 'Hey! Feel free to ask me anything about Shreyash Mate.',
    'who': "I'm Shreyash Mate's AI assistant. He's a passionate web developer!",
    'skills': 'He knows: HTML, CSS, JavaScript, Python, MySQL, Bootstrap, C, Java',
    'contact': 'Email: shreyashmate242@gmail.com | Phone: +91 99216 28303',
    'projects': 'He has worked on various projects including an Amazon clone, hotel booking site, restaurant website, and salon website.',
    'default': "Sorry, I don't know about That. \n Please contact Shreyash for more information \n Thank You."
  };

  function getResponse(message) {
    message = message.toLowerCase();
    for (let key in responses) {
      if (message.includes(key)) return responses[key];
    }
    return responses['default'];
  }

  function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = 'chatbot-message ' + (isUser ? 'user' : 'bot');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  toggle.addEventListener('click', () => container.classList.toggle('active'));
  closeBtn?.addEventListener('click', () => container.classList.remove('active'));

  function handleMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    setTimeout(() => addMessage(getResponse(text), false), 500);
    input.value = '';
  }

  sendBtn?.addEventListener('click', handleMessage);
  input?.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleMessage(); });
})();

/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// Dark/Light Mode Toggle
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  }
  
  function updateIcon(theme) {
    if (theme === 'dark') {
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    } else {
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
    }
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });
  }
})();

/**
 * Skills Charts with Chart.js
 */
function initSkillsCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#a8a9b4' : '#272829';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Radar Chart
  const radarCtx = document.getElementById('skillsRadarChart');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'C Programming', 'Java'],
        datasets: [{
          label: 'Skill Level',
          data: [100, 90, 75, 80, 70, 55],
          backgroundColor: 'rgba(20, 157, 221, 0.3)',
          borderColor: '#149ddd',
          borderWidth: 2,
          pointBackgroundColor: '#149ddd',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#149ddd'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: gridColor },
            grid: { color: gridColor },
            pointLabels: { color: textColor, font: { size: 12 } },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Bar Chart
  const barCtx = document.getElementById('skillsBarChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'C Programming', 'Java'],
        datasets: [{
          label: 'Skill Level (%)',
          data: [100, 90, 75, 80, 70, 55],
          backgroundColor: [
            'rgba(231, 76, 60, 0.8)',
            'rgba(52, 152, 219, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(155, 89, 182, 0.8)',
            'rgba(46, 204, 113, 0.8)',
            'rgba(230, 126, 34, 0.8)'
          ],
          borderColor: [
            'rgba(231, 76, 60, 1)',
            'rgba(52, 152, 219, 1)',
            'rgba(241, 196, 15, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(230, 126, 34, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

// Initialize charts on load
window.addEventListener('load', () => {
  initSkillsCharts();
});

/**
 * Project Detail Modal
 */
const projects = [
  {
    id: 1,
    title: 'Amazon Clone Website',
    images: [
      'Project_Imgs/amazon1.png',
      'Project_Imgs/amazon2.png',
      'Project_Imgs/amazon3.png',
      'Project_Imgs/amazon4.png',
      'Project_Imgs/amazon5.png',
      'Project_Imgs/amazon6.png',
      'Project_Imgs/amazon7.png',
      'Project_Imgs/amazon8.png',
      'Project_Imgs/amazon9.png',
      'Project_Imgs/amazon10.png'
    ],
    description: 'A responsive Amazon-inspired frontend with product sections, category navigation, and clean e-commerce layout components.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: '#'
  },
  {
    id: 2,
    title: 'Hotel Booking Website',
    images: [
      'Project_Imgs/hotel1.png',
      'Project_Imgs/hotel2.png',
      'Project_Imgs/hotel3.png',
      'Project_Imgs/hotel4.png',
      'Project_Imgs/hotel5.png',
      'Project_Imgs/hotel6.png',
      'Project_Imgs/hotel7.png',
      'Project_Imgs/hotel8.png',
      'Project_Imgs/hotel9.png'
    ],
    description: 'A modern hotel website UI showcasing rooms, amenities, and booking-focused page sections with responsive behavior.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
  {
    id: 3,
    title: 'Restaurant Website',
    images: [
      'Project_Imgs/resto1.png',
      'Project_Imgs/resto2.png',
      'Project_Imgs/resto3.png',
      'Project_Imgs/resto4.png',
      'Project_Imgs/resto5.png',
      'Project_Imgs/resto6.png',
      'Project_Imgs/resto7.png',
      'Project_Imgs/resto8.png',
      'Project_Imgs/resto9.png'
    ],
    description: 'A restaurant landing experience with food highlights, menu-focused content blocks, and contact-ready sections.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
  {
    id: 4,
    title: 'FuZion Salon Website',
    images: [
      'Project_Imgs/salon1.png',
      'Project_Imgs/salon2.png',
      'Project_Imgs/salon3.png',
      'Project_Imgs/salon4.png',
      'Project_Imgs/salon5.png',
      'Project_Imgs/salon6.png',
      'Project_Imgs/salon7.png'
    ],
    description: 'A stylish salon website concept focused on brand visuals, service presentation, and customer engagement.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  }
];

let projectSlideshowInterval = null;
let currentModalImages = [];
let currentModalIndex = 0;
const imageSwitchTimers = new WeakMap();
const MODAL_SLIDE_INTERVAL_MS = 5000;
const CARD_SLIDE_INTERVAL_MS = 5000;

function clearProjectSlideshow() {
  if (projectSlideshowInterval) {
    clearInterval(projectSlideshowInterval);
    projectSlideshowInterval = null;
  }
}

function startProjectSlideshow() {
  clearProjectSlideshow();
  if (currentModalImages.length <= 1) return;
  projectSlideshowInterval = setInterval(() => {
    setModalImageByIndex(currentModalIndex + 1);
  }, MODAL_SLIDE_INTERVAL_MS);
}

function switchImageSmoothly(imageEl, nextSrc) {
  if (!imageEl || !nextSrc) return;
  if (imageEl.getAttribute('src') === nextSrc) return;

  const existingTimer = imageSwitchTimers.get(imageEl);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  imageEl.classList.add('image-fade-out');
  const timerId = setTimeout(() => {
    imageEl.src = nextSrc;
    requestAnimationFrame(() => {
      imageEl.classList.remove('image-fade-out');
    });
    imageSwitchTimers.delete(imageEl);
  }, 180);

  imageSwitchTimers.set(imageEl, timerId);
}

function setModalImageByIndex(index) {
  const modalImage = document.getElementById('projectModalImage');
  const thumbsContainer = document.getElementById('projectModalThumbs');
  if (!modalImage || !thumbsContainer || !currentModalImages.length) return;

  const normalizedIndex = (index + currentModalImages.length) % currentModalImages.length;
  currentModalIndex = normalizedIndex;
  switchImageSmoothly(modalImage, currentModalImages[currentModalIndex]);

  thumbsContainer.querySelectorAll('.project-modal-thumb').forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === currentModalIndex);
  });
}

function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  const images = (project.images && project.images.length) ? project.images : (project.image ? [project.image] : []);
  if (!images.length) return;
  clearProjectSlideshow();
  currentModalImages = images;
  currentModalIndex = 0;

  document.getElementById('projectModalTitle').textContent = project.title;
  const modalImage = document.getElementById('projectModalImage');
  const thumbsContainer = document.getElementById('projectModalThumbs');
  modalImage.classList.add('smooth-switch-image');
  modalImage.alt = project.title;
  document.getElementById('projectModalDescription').textContent = project.description;
  document.getElementById('projectModalLink').href = project.link;

  thumbsContainer.innerHTML = images.map((src, index) => `
    <img
      src="${src}"
      alt="${project.title} screenshot ${index + 1}"
      class="project-modal-thumb ${index === 0 ? 'active' : ''}"
      data-image-src="${src}"
    >
  `).join('');

  thumbsContainer.querySelectorAll('.project-modal-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const selectedSrc = thumb.getAttribute('data-image-src');
      const selectedIndex = images.findIndex((src) => src === selectedSrc);
      if (selectedIndex >= 0) {
        setModalImageByIndex(selectedIndex);
        startProjectSlideshow();
      }
    });
  });

  setModalImageByIndex(0);
  startProjectSlideshow();

  const techContainer = document.getElementById('projectModalTech');
  techContainer.innerHTML = project.technologies
    .map(tech => `<span class="badge bg-primary me-1">${tech}</span>`)
    .join(' ');

  const modal = new bootstrap.Modal(document.getElementById('projectModal'));
  modal.show();
}

// Add click handlers to portfolio detail links
document.querySelectorAll('.portfolio-details-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const projectId = Number(link.getAttribute('data-project-id'));
    openProjectModal(projectId);
  });
});

// Open project modal by clicking the whole project card
document.querySelectorAll('.portfolio-item[data-project-id]').forEach((item) => {
  item.addEventListener('click', () => {
    const projectId = Number(item.getAttribute('data-project-id'));
    openProjectModal(projectId);
  });
});

// Modal image navigation arrows
document.getElementById('projectPrevBtn')?.addEventListener('click', () => {
  if (!currentModalImages.length) return;
  setModalImageByIndex(currentModalIndex - 1);
  startProjectSlideshow();
});

document.getElementById('projectNextBtn')?.addEventListener('click', () => {
  if (!currentModalImages.length) return;
  setModalImageByIndex(currentModalIndex + 1);
  startProjectSlideshow();
});

// Stop slideshow when modal closes
document.getElementById('projectModal')?.addEventListener('hidden.bs.modal', () => {
  clearProjectSlideshow();
  currentModalImages = [];
  currentModalIndex = 0;
});

// Auto-change project preview image on cards in Work section
document.querySelectorAll('.portfolio-item[data-project-id]').forEach((item, itemIndex) => {
  const projectId = Number(item.getAttribute('data-project-id'));
  const project = projects.find((p) => p.id === projectId);
  const previewImage = item.querySelector('.portfolio-wrap img');
  const prevBtn = item.querySelector('.portfolio-preview-arrow.left');
  const nextBtn = item.querySelector('.portfolio-preview-arrow.right');
  if (!project || !previewImage) return;

  const previewImages = (project.images && project.images.length) ? project.images : (project.image ? [project.image] : []);
  if (previewImages.length <= 1) return;
  previewImage.classList.add('smooth-switch-image');

  let previewIndex = 0;
  const setPreviewImageByIndex = (index) => {
    const normalizedIndex = (index + previewImages.length) % previewImages.length;
    previewIndex = normalizedIndex;
    switchImageSmoothly(previewImage, previewImages[previewIndex]);
  };

  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewImageByIndex(previewIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewImageByIndex(previewIndex + 1);
  });

  setInterval(() => {
    setPreviewImageByIndex(previewIndex + 1);
  }, CARD_SLIDE_INTERVAL_MS + (itemIndex * 150));
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

/**
 * Custom Cursor
 */
(function() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

/**
 * Particle Background
 */
(function() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const numParticles = Math.floor(canvas.width / 10);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,157,221,0.3)';

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,157,221,0.1)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  resize();
  createParticles();
  animateParticles();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

/**
 * Timeline Animation
 */
(function() {
  const timelineItems = document.querySelectorAll('.resume-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    item.classList.add('timeline-item');
    observer.observe(item);
  });
})();

/**
 * Glassmorphism Effect
 */
(function() {
  const cards = document.querySelectorAll('.portfolio-item, .resume-item, .info');
  cards.forEach(card => {
    card.classList.add('glass-card');
  });
})();

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
