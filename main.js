/**
 * DANILO RAMOS CLUDE — PORTFOLIO
 * main.js — Full interactive experience with Three.js 3D gallery
 */

'use strict';

// =====================================================================
// PROJECT DATA
// =====================================================================
const PROJECTS = [
  {
    id: 1,
    title: 'Plataforma Analytics',
    category: 'WEB APPLICATION',
    description: 'Sistema de visualização de dados com interface interativa e dashboards em tempo real. Projetado para ser intuitivo e eficiente no acesso às informações.',
    objective: 'Criar uma plataforma que transforme dados complexos em visualizações claras e acessíveis, reduzindo o tempo de tomada de decisão.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'D3.js'],
    role: 'Desenvolvimento front-end completo, desde a arquitetura de componentes até a implementação das visualizações interativas.',
    image: 'images/project_webdesign_1793200390825.jpg',
    link: '#'
  },
  {
    id: 2,
    title: 'App Financeiro',
    category: 'MOBILE DESIGN',
    description: 'Design e prototipação de aplicativo mobile para gestão financeira pessoal. Interface minimalista com foco na experiência do usuário.',
    objective: 'Simplificar o controle financeiro por meio de uma interface clara, com visualizações que ajudem na tomada de decisões.',
    technologies: ['Figma', 'UI/UX', 'Prototipação', 'Design System'],
    role: 'Design completo da interface, fluxo de navegação, sistema de componentes e entrega de protótipo interativo.',
    image: 'images/project_appdesign_1793200402967.jpg',
    link: '#'
  },
  {
    id: 3,
    title: 'Identidade Visual',
    category: 'BRAND DESIGN',
    description: 'Criação de identidade visual completa para agência digital, incluindo sistema de logotipo, tipografia, paleta cromática e guia de uso.',
    objective: 'Construir uma identidade marcante e coerente que transmitisse sofisticação e modernidade, funcionando em diferentes aplicações.',
    technologies: ['Illustrator', 'Figma', 'Brand Design'],
    role: 'Pesquisa de referências, criação do sistema visual, desenvolvimento do manual de identidade e aplicações primárias.',
    image: 'images/project_branding_1793200414386.jpg',
    link: '#'
  },
  {
    id: 4,
    title: 'Dashboard de Dados',
    category: 'WEB APPLICATION',
    description: 'Interface administrativa para monitoramento de métricas e relatórios. Dados organizados com clareza em painéis configuráveis.',
    objective: 'Centralizar informações de diferentes fontes em um painel unificado, com filtros dinâmicos e exportação de relatórios.',
    technologies: ['React', 'TypeScript', 'Recharts', 'REST API'],
    role: 'Desenvolvimento da interface completa, integração com APIs e implementação dos filtros e relatórios interativos.',
    image: 'images/project_dashboard_1793200424839.jpg',
    link: '#'
  },
  {
    id: 5,
    title: 'E-commerce',
    category: 'WEB DESIGN',
    description: 'Desenvolvimento de loja virtual com foco em conversão, experiência de compra fluida e design que valoriza os produtos.',
    objective: 'Criar uma experiência de compra online que reduza a fricção no processo e aumente a taxa de conversão.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'UI Design'],
    role: 'Design da interface, desenvolvimento front-end e otimização da jornada de compra do usuário.',
    image: 'images/project_webdesign_1793200390825.jpg',
    link: '#'
  },
  {
    id: 6,
    title: 'Projeto em Breve',
    category: 'EM DESENVOLVIMENTO',
    description: '[Este espaço está reservado para um próximo projeto. Adicione aqui a descrição do seu trabalho mais recente.]',
    objective: '[Descreva o objetivo principal deste projeto]',
    technologies: ['[Tecnologia]', '[Tecnologia]'],
    role: '[Descreva sua participação no projeto]',
    image: 'images/project_branding_1793200414386.jpg',
    link: '#'
  }
];

// =====================================================================
// STATE
// =====================================================================
let currentView = 'gallery';
let currentProjectIndex = 0;
let isAnimating = false;
let threeApp = null;

// =====================================================================
// CLOCK
// =====================================================================
function updateClock() {
  const el = document.getElementById('status-clock');
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// =====================================================================
// CUSTOM CURSOR
// =====================================================================
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

(function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  if (cursor) cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animateCursor);
})();

function addHoverListeners() {
  document.querySelectorAll('button, a, .index-item, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));
addHoverListeners();

// =====================================================================
// ENTRY BOOT SEQUENCE
// =====================================================================
function runBootSequence() {
  const lines = document.querySelectorAll('.boot-line');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), 200 + i * 280);
  });

  setTimeout(() => {
    const content = document.getElementById('entry-content');
    if (content) content.classList.add('visible');

    document.querySelectorAll('.title-word').forEach((w, i) => {
      setTimeout(() => w.classList.add('revealed'), i * 150);
    });

    setTimeout(() => {
      const byline = document.getElementById('entry-byline');
      if (byline) byline.classList.add('revealed');
    }, 450);

    setTimeout(() => {
      const btn = document.getElementById('entry-btn');
      if (btn) btn.classList.add('revealed');
    }, 700);
  }, 1800);
}

runBootSequence();

document.getElementById('entry-btn').addEventListener('click', enterPortfolio);

function enterPortfolio() {
  if (isAnimating) return;
  isAnimating = true;

  const entryScreen = document.getElementById('entry-screen');
  const portfolio = document.getElementById('portfolio');
  const overlay = document.getElementById('transition-overlay');

  overlay.classList.add('active');

  setTimeout(() => {
    entryScreen.classList.add('leaving');
    portfolio.classList.remove('hidden');
    initPortfolio();

    setTimeout(() => {
      entryScreen.style.display = 'none';
      overlay.classList.remove('active');
      isAnimating = false;
    }, 900);
  }, 320);
}

// =====================================================================
// PORTFOLIO INIT
// =====================================================================
function initPortfolio() {
  buildProjectIndex();
  initThreeJS();
  initNavigation();
  initGalleryControls();
  addHoverListeners();
}

// =====================================================================
// THREE.JS 3D GALLERY
// =====================================================================
function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') {
    initFallbackGallery();
    return;
  }

  const W = canvas.offsetWidth || window.innerWidth;
  const H = canvas.offsetHeight || window.innerHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 20, 50);

  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 2.0, 9);
  camera.lookAt(0, 0.8, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.outputEncoding = 3001; // sRGBEncoding fallback number

  // Grid floor
  const grid = new THREE.GridHelper(100, 70, 0x1c1c1c, 0x111111);
  grid.position.y = -1.8;
  scene.add(grid);

  // Subtle ground plane (reflection feel)
  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    roughness: 1,
    metalness: 0.05
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.8;
  scene.add(ground);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.15));
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(0, 6, 4);
  scene.add(key);
  const fill = new THREE.PointLight(0x8080ff, 0.3, 30);
  fill.position.set(-8, 3, 0);
  scene.add(fill);

  // Panel setup
  const PW = 3.8, PH = 2.38;
  const N = PROJECTS.length;
  const ARC_R = 13;
  const SPREAD_ANGLE = Math.PI * 0.55;
  const panels = [];
  const textureLoader = new THREE.TextureLoader();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  PROJECTS.forEach((proj, i) => {
    const t = N > 1 ? i / (N - 1) : 0.5;
    const angle = -SPREAD_ANGLE / 2 + t * SPREAD_ANGLE;

    const x = Math.sin(angle) * ARC_R;
    const z = -Math.cos(angle) * ARC_R + ARC_R - 5;

    // Panel mesh
    const geo = new THREE.PlaneGeometry(PW, PH);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.8,
      metalness: 0.05,
      transparent: true,
      opacity: 0.95
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.8, z);
    mesh.lookAt(0, 0.8, 9);
    scene.add(mesh);

    // Edge frame
    const edgeGeo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(PW + 0.05, PH + 0.05));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x252525, transparent: true, opacity: 0.8 });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.position.copy(mesh.position);
    edges.quaternion.copy(mesh.quaternion);
    scene.add(edges);

    panels.push({ mesh, edges, mat, edgeMat, proj, baseAngle: angle, baseX: x, baseZ: z });

    // Load texture
    textureLoader.load(
      proj.image,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        mat.map = tex;
        mat.color.set(0xffffff);
        mat.needsUpdate = true;
      },
      undefined,
      () => { mat.color.setHSL(i / N, 0.06, 0.14); }
    );
  });

  // State
  let targetIdx = 0;
  let rotOffset = 0, targetRotOffset = 0;
  let hoveredPanel = null;

  function goToPanel(idx) {
    idx = ((idx % N) + N) % N;
    currentProjectIndex = idx;
    targetIdx = idx;
    // Rotate so panel idx comes to center
    const t = N > 1 ? idx / (N - 1) : 0.5;
    const centerAngle = -SPREAD_ANGLE / 2 + t * SPREAD_ANGLE;
    targetRotOffset = centerAngle;
    updateHUD(idx);
  }

  function updateHUD(idx) {
    const p = PROJECTS[idx];
    document.getElementById('current-project').textContent = String(idx + 1).padStart(2, '0');
    document.getElementById('pto-number').textContent = String(idx + 1).padStart(2, '0');
    document.getElementById('pto-name').textContent = p.title;
    document.getElementById('pto-category').textContent = p.category;
  }
  updateHUD(0);

  // Mouse hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(panels.map(p => p.mesh));
    const hit = hits.length > 0 ? panels.find(p => p.mesh === hits[0].object) : null;

    if (hit !== hoveredPanel) {
      if (hoveredPanel) {
        hoveredPanel.edgeMat.color.set(0x252525);
        hoveredPanel.edgeMat.opacity = 0.8;
        document.body.classList.remove('cursor-hover');
      }
      hoveredPanel = hit;
      if (hit) {
        hit.edgeMat.color.set(0xaaaaaa);
        hit.edgeMat.opacity = 1;
        document.body.classList.add('cursor-hover');
      }
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (hoveredPanel) {
      hoveredPanel.edgeMat.color.set(0x252525);
      hoveredPanel.edgeMat.opacity = 0.8;
      hoveredPanel = null;
      document.body.classList.remove('cursor-hover');
    }
  });

  canvas.addEventListener('click', () => {
    if (!hoveredPanel) return;
    openProjectDetail(hoveredPanel.proj);
  });

  // Expose controls
  threeApp = { goToPanel };

  // Animation
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    rotOffset += (targetRotOffset - rotOffset) * 0.072;

    panels.forEach((panel, i) => {
      // Recalculate position based on arc and rotation offset
      const adjustedAngle = panel.baseAngle - rotOffset;
      const nx = Math.sin(adjustedAngle) * ARC_R;
      const nz = -Math.cos(adjustedAngle) * ARC_R + ARC_R - 5;

      panel.mesh.position.x += (nx - panel.mesh.position.x) * 0.09;
      panel.mesh.position.z += (nz - panel.mesh.position.z) * 0.09;

      // Float & active scale
      const isActive = i === targetIdx;
      const floatY = 0.8 + Math.sin(t * 0.55 + i * 1.3) * 0.018;
      const activeBoost = isActive ? 0.12 : 0;
      panel.mesh.position.y += (floatY + activeBoost - panel.mesh.position.y) * 0.07;

      // Always face camera
      panel.mesh.lookAt(camera.position.x, panel.mesh.position.y, camera.position.z + 0.01);

      // Scale
      const ts = isActive ? 1.06 : 0.94;
      panel.mesh.scale.x += (ts - panel.mesh.scale.x) * 0.07;
      panel.mesh.scale.y += (ts - panel.mesh.scale.y) * 0.07;

      // Sync edges
      panel.edges.position.copy(panel.mesh.position);
      panel.edges.quaternion.copy(panel.mesh.quaternion);
      panel.edges.scale.copy(panel.mesh.scale);

      // Opacity based on distance from center
      const dist = Math.abs(adjustedAngle);
      const op = Math.max(0.25, 1 - dist * 1.5);
      panel.mat.opacity = op;
    });

    // Subtle camera breathing
    camera.position.y = 2.0 + Math.sin(t * 0.28) * 0.04;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  new ResizeObserver(() => {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w > 0 && h > 0) {
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }).observe(canvas);
}

// =====================================================================
// FALLBACK GALLERY (no WebGL)
// =====================================================================
function initFallbackGallery() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;
  canvas.style.display = 'none';

  const wrapper = canvas.parentElement;
  const fg = document.createElement('div');
  fg.style.cssText = 'position:absolute;inset:0;top:64px;display:flex;align-items:center;gap:24px;padding:0 40px;overflow-x:auto;scrollbar-width:none;';

  PROJECTS.forEach((proj, i) => {
    const card = document.createElement('div');
    card.style.cssText = 'flex-shrink:0;width:380px;height:240px;background:#111;border:1px solid #2a2a2a;cursor:pointer;position:relative;overflow:hidden;transition:transform 0.3s;';
    card.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" style="width:100%;height:100%;object-fit:cover;opacity:0.7;" />
      <div style="position:absolute;inset:0;padding:20px;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent 60%);">
        <div style="font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.2em;color:#888;margin-bottom:6px">${String(i+1).padStart(2,'0')} / ${proj.category}</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:700;color:#f5f5f5;letter-spacing:-0.01em">${proj.title}</div>
      </div>
    `;
    card.addEventListener('mouseenter', () => { card.style.transform = 'scale(1.02)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('click', () => openProjectDetail(proj));
    fg.appendChild(card);
  });
  wrapper.appendChild(fg);
}

// =====================================================================
// GALLERY CONTROLS
// =====================================================================
function initGalleryControls() {
  document.getElementById('gallery-prev').addEventListener('click', () => {
    const next = ((currentProjectIndex - 1) + PROJECTS.length) % PROJECTS.length;
    if (threeApp) threeApp.goToPanel(next);
    else currentProjectIndex = next;
  });
  document.getElementById('gallery-next').addEventListener('click', () => {
    const next = (currentProjectIndex + 1) % PROJECTS.length;
    if (threeApp) threeApp.goToPanel(next);
    else currentProjectIndex = next;
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (currentView === 'detail') closeProjectDetail();
      return;
    }
    if (currentView !== 'gallery') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = (currentProjectIndex + 1) % PROJECTS.length;
      if (threeApp) threeApp.goToPanel(next);
      else currentProjectIndex = next;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const next = ((currentProjectIndex - 1) + PROJECTS.length) % PROJECTS.length;
      if (threeApp) threeApp.goToPanel(next);
      else currentProjectIndex = next;
    }
  });

  // Scroll
  let scrollAccum = 0;
  window.addEventListener('wheel', (e) => {
    if (currentView !== 'gallery') return;
    scrollAccum += e.deltaY;
    if (Math.abs(scrollAccum) > 60) {
      const dir = scrollAccum > 0 ? 1 : -1;
      const next = ((currentProjectIndex + dir) + PROJECTS.length) % PROJECTS.length;
      if (threeApp) threeApp.goToPanel(next);
      else currentProjectIndex = next;
      scrollAccum = 0;
    }
  }, { passive: true });

  // Touch
  let touchStartX = 0;
  const canvas = document.getElementById('three-canvas');
  if (canvas) {
    canvas.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    canvas.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        const dir = dx < 0 ? 1 : -1;
        const next = ((currentProjectIndex + dir) + PROJECTS.length) % PROJECTS.length;
        if (threeApp) threeApp.goToPanel(next);
        else currentProjectIndex = next;
      }
    }, { passive: true });
  }
}

// =====================================================================
// PROJECT DETAIL
// =====================================================================
function openProjectDetail(project) {
  const idx = PROJECTS.indexOf(project);
  document.getElementById('detail-number').textContent = String(idx + 1).padStart(2, '0');
  document.getElementById('detail-category').textContent = project.category;
  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-desc').textContent = project.description;
  document.getElementById('detail-objective').textContent = project.objective;
  document.getElementById('detail-role').textContent = project.role;

  document.getElementById('detail-techs').innerHTML =
    project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

  const img = document.getElementById('detail-img');
  img.src = project.image;
  img.alt = project.title;

  const link = document.getElementById('detail-link');
  link.style.display = (project.link && project.link !== '#') ? 'inline-flex' : 'none';
  if (project.link && project.link !== '#') link.href = project.link;

  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active-view');
    v.setAttribute('aria-hidden', 'true');
  });
  const detail = document.getElementById('project-detail');
  detail.classList.add('active-view');
  detail.removeAttribute('aria-hidden');
  detail.scrollTop = 0;
  currentView = 'detail';

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
}

function closeProjectDetail() {
  navigateTo('gallery');
}

document.getElementById('close-detail').addEventListener('click', closeProjectDetail);

// =====================================================================
// NAVIGATION
// =====================================================================
function initNavigation() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.target));
  });
  document.getElementById('nav-home').addEventListener('click', () => navigateTo('gallery'));

  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mobile-nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.target);
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function navigateTo(target) {
  currentView = target;

  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active-view');
    v.setAttribute('aria-hidden', 'true');
  });

  const el = document.getElementById(target);
  if (el) {
    el.classList.add('active-view');
    el.removeAttribute('aria-hidden');
    if (target !== 'gallery') el.scrollTop = 0;
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.target === target);
  });
}

// =====================================================================
// PROJECT INDEX
// =====================================================================
function buildProjectIndex() {
  const list = document.getElementById('project-index-list');
  const countEl = document.getElementById('index-count');
  if (countEl) countEl.textContent = String(PROJECTS.length).padStart(2, '0');
  if (!list) return;

  list.innerHTML = PROJECTS.map((proj, i) => `
    <li class="index-item" tabindex="0" data-index="${i}" aria-label="Abrir projeto: ${proj.title}">
      <div class="index-item-left">
        <span class="index-item-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="index-item-name">${proj.title}</span>
      </div>
      <span class="index-item-cat">${proj.category}</span>
      <span class="index-item-arrow">&#8594;</span>
    </li>
  `).join('');

  list.querySelectorAll('.index-item').forEach(item => {
    const open = () => openProjectDetail(PROJECTS[+item.dataset.index]);
    item.addEventListener('click', open);
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') open(); });
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}