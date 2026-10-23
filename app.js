/* ==========================================================================
   NEO-BRUTALIST STORYTELLING SCRIPT // CAPTAIN VIKRAM BATRA (1999)
   Pure vanilla JavaScript // Web Audio API // Scroll Tracker // LocalStorage
   ========================================================================== */

// All 15 verified archival images metadata
const ARCHIVAL_MEDIA = [
  {
    id: "IMG-01",
    file: "images/batra_candid.jpg",
    title: "Capt. Vikram Batra in Kargil Fatigues",
    caption: "Capt. Vikram Batra, 13 JAK RIF, smiling during a brief respite in the Dras sector, Summer 1999. Codename: Sher Shah.",
    tag: "PORTRAIT // COMBAT"
  },
  {
    id: "IMG-02",
    file: "images/batra_portrait.jpg",
    title: "Official Military Portrait",
    caption: "Official commission portrait of Captain Vikram Batra, PVC, 13th Battalion Jammu and Kashmir Rifles.",
    tag: "COMMISSION // 13 JAK RIF"
  },
  {
    id: "IMG-03",
    file: "images/regiment_crest.svg",
    title: "Regimental Crest - 13 JAK RIF",
    caption: "Insignia of the 13th Battalion, Jammu and Kashmir Rifles. Battle Cry: 'Durge Mata Ki Jai'.",
    tag: "REGIMENT CREST"
  },
  {
    id: "IMG-04",
    file: "images/kargil_peaks.jpg",
    title: "Dras & Tololing Mountain Ranges",
    caption: "The sheer, hostile rock faces of Tololing and Dras where the initial brutal battles took place.",
    tag: "TERRAIN // 15,200 FT"
  },
  {
    id: "IMG-05",
    file: "images/tiger_hill.jpg",
    title: "The Imposing Tiger Hill (17,414 FT)",
    caption: "Tiger Hill peak towering over the highway. The highest vantage point held by enemy forces.",
    tag: "OBJECTIVE // 17,414 FT"
  },
  {
    id: "IMG-06",
    file: "images/artillery_bofors.jpg",
    title: "155mm Bofors Howitzers in Direct Firing",
    caption: "Indian artillery firing direct sight into enemy bunkers clinging to the sheer mountain crests.",
    tag: "ARTILLERY // 250K SHELLS"
  },
  {
    id: "IMG-07",
    file: "images/kargil_war_smoke.jpg",
    title: "Smoke Shrouding the Kargil Ridges",
    caption: "Artillery bombardment creating fire and smoke across high-altitude combat zones.",
    tag: "FIELD COMBAT"
  },
  {
    id: "IMG-08",
    file: "images/patrol_ridge.jpg",
    title: "Patrol on the Razor-Sharp Knife Ridge",
    caption: "Troops advancing in sub-zero winds along razor ridges where one misstep led to a 3,000-foot abyss.",
    tag: "ASSAULT // 15,500 FT"
  },
  {
    id: "IMG-09",
    file: "images/captured_weapons.jpg",
    title: "Captured Enemy Heavy Weaponry",
    caption: "Machine guns and munitions recovered by 13 JAK RIF after recapturing the fortified Point 5140.",
    tag: "VICTORY // POINT 5140"
  },
  {
    id: "IMG-10",
    file: "images/batra_statue.jpg",
    title: "Statue at Param Yodha Sthal, New Delhi",
    caption: "Bronze memorial sculpture honoring Capt. Vikram Batra at the National War Memorial complex.",
    tag: "MEMORIAL // DELHI"
  },
  {
    id: "IMG-11",
    file: "images/pvc_award_father.jpg",
    title: "Posthumous Param Vir Chakra Presentation",
    caption: "President K. R. Narayanan presenting the Param Vir Chakra to Capt. Vikram Batra's father, Mr. G. L. Batra, on 26 Jan 2000.",
    tag: "HONOUR // PVC"
  },
  {
    id: "IMG-12",
    file: "images/param_vir_chakra.png",
    title: "The Param Vir Chakra (PVC) Medal",
    caption: "India's highest wartime gallantry decoration, forged with Indra's Vajra, symbolizing ultimate valor.",
    tag: "GALLANTRY CITATION"
  },
  {
    id: "IMG-13",
    file: "images/dras_entrance.jpg",
    title: "Vijaypath - Kargil War Memorial Entrance",
    caption: "The solemn gateway to the Dras Kargil War Memorial beneath the shadows of Tololing.",
    tag: "VIJAYPATH // DRAS"
  },
  {
    id: "IMG-14",
    file: "images/dras_jawans.jpg",
    title: "Guard of Honour at Dras War Memorial",
    caption: "Indian Army jawans standing in reverence beneath the national tricolour at Dras.",
    tag: "CEREMONIAL SALUTE"
  },
  {
    id: "IMG-15",
    file: "images/amar_jawan.jpg",
    title: "Amar Jawan Jyoti - The Eternal Flame",
    caption: "The revered inverted rifle with bayonet and helmet with the flame burning in memory of the fallen.",
    tag: "ETERNAL FLAME"
  }
];

// Document Elements
const scrollProgressBar = document.getElementById('scrollProgressBar');
const altValue = document.getElementById('altValue');
const altLoc = document.getElementById('altLoc');
const audioToggleBtn = document.getElementById('audioToggleBtn');
const audioStatusText = document.getElementById('audioStatusText');
const hudSaluteCount = document.getElementById('hudSaluteCount');
const mainSaluteCounter = document.getElementById('mainSaluteCounter');
const mainSaluteBtn = document.getElementById('mainSaluteBtn');
const lightDiyaBtn = document.getElementById('lightDiyaBtn');
const saluteToast = document.getElementById('saluteToast');
const diyaFlameDisplay = document.getElementById('diyaFlameDisplay');
const galleryGrid = document.getElementById('galleryGrid');
const backToTopBtn = document.getElementById('backToTopBtn');

// Modal Elements
const imageModal = document.getElementById('imageModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalTitle = document.getElementById('modalTitle');

// ==========================================================================
// 1. SCROLL ALTITUDE TRACKER
// ==========================================================================
function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollRatio = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
  
  // Progress Bar Width
  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${(scrollRatio * 100).toFixed(1)}%`;
  }

  // Calculate Altitude: Base Dras = 10,800 FT, Summit = 17,000 FT
  const currentAlt = Math.round(10800 + scrollRatio * (17000 - 10800));
  if (altValue) {
    altValue.textContent = `${currentAlt.toLocaleString()} FT`;
  }

  // Altitude Location Labels
  if (altLoc) {
    if (scrollRatio < 0.15) {
      altLoc.textContent = "(BASE: DRAS)";
    } else if (scrollRatio < 0.35) {
      altLoc.textContent = "(APPROACH: TOLOLING)";
    } else if (scrollRatio < 0.50) {
      altLoc.textContent = "(ARTILLERY RIDGE)";
    } else if (scrollRatio < 0.70) {
      altLoc.textContent = "(ASSAULT: PT 5140)";
    } else if (scrollRatio < 0.88) {
      altLoc.textContent = "(BATRA TOP: PT 4875)";
    } else {
      altLoc.textContent = "(ETERNAL GLORY)";
    }
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ==========================================================================
// 2. SALUTE COUNTER (PERSISTENT VIA LOCALSTORAGE)
// ==========================================================================
const BASE_SALUTES = 14892;
let currentSalutes = parseInt(localStorage.getItem('kargil_salute_count') || BASE_SALUTES, 10);

function updateSaluteDisplay() {
  const formatted = currentSalutes.toLocaleString();
  if (hudSaluteCount) hudSaluteCount.textContent = formatted;
  if (mainSaluteCounter) mainSaluteCounter.textContent = formatted;
}
updateSaluteDisplay();

function triggerSalute() {
  currentSalutes += 1;
  localStorage.setItem('kargil_salute_count', currentSalutes);
  updateSaluteDisplay();
  
  // Audio feedback
  playMilitaryChirp();

  // Show Toast
  if (saluteToast) {
    saluteToast.classList.remove('hidden');
    saluteToast.style.animation = 'none';
    void saluteToast.offsetWidth; // retrigger
    saluteToast.style.animation = 'bounce-in 0.3s ease';

    setTimeout(() => {
      saluteToast.classList.add('hidden');
    }, 3500);
  }
}

if (mainSaluteBtn) {
  mainSaluteBtn.addEventListener('click', triggerSalute);
}

document.querySelectorAll('.salute-trigger-btn').forEach(btn => {
  btn.addEventListener('click', triggerSalute);
});

// Light Diya
if (lightDiyaBtn) {
  lightDiyaBtn.addEventListener('click', () => {
    playBellTone();
    if (diyaFlameDisplay) {
      diyaFlameDisplay.classList.remove('hidden');
    }
    lightDiyaBtn.disabled = true;
    lightDiyaBtn.innerHTML = '<span>🪔</span> DIYA LIT IN MEMORY';
  });
}

// Back to top
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================================================
// 3. ARCHIVAL REPOSITORY GALLERY BUILDER
// ==========================================================================
function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  ARCHIVAL_MEDIA.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-thumb-card brutal-card';
    card.innerHTML = `
      <div class="card-badge bg-black text-white" style="font-size: 0.65rem; margin-bottom: 6px;">${item.tag}</div>
      <img src="${item.file}" alt="${item.title}" class="gallery-thumb-img" loading="lazy">
      <div class="gallery-thumb-title">${item.title}</div>
      <div class="gallery-thumb-id">${item.id} // CLICK TO ZOOM</div>
    `;

    card.addEventListener('click', () => {
      openModal(item.file, item.title, item.caption);
    });

    galleryGrid.appendChild(card);
  });
}
renderGallery();

// Wire all expand buttons in story cards
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const imgSrc = btn.getAttribute('data-img');
    const title = btn.getAttribute('data-title') || "Archival Record";
    
    // Find caption from closest photo card
    const card = btn.closest('.photo-card');
    const caption = card ? card.getAttribute('data-caption') : title;
    
    openModal(imgSrc, title, caption);
  });
});

// ==========================================================================
// 4. LIGHTBOX MODAL
// ==========================================================================
function openModal(imgSrc, title, caption) {
  if (!imageModal) return;
  playMilitaryChirp();
  modalImg.src = imgSrc;
  modalTitle.textContent = `ARCHIVE // ${title.toUpperCase()}`;
  modalCaption.textContent = caption || title;
  imageModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!imageModal) return;
  imageModal.classList.add('hidden');
  modalImg.src = '';
  document.body.style.overflow = '';
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal && !imageModal.classList.contains('hidden')) {
    closeModal();
  }
});

// ==========================================================================
// 5. PURE WEB AUDIO API SYNTHESIZER (RADIO AMBIENCE & CHIRP)
// ==========================================================================
let audioCtx = null;
let ambientGainNode = null;
let isAudioPlaying = false;
let noiseSource = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function startAmbientRadio() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Create White Noise buffer for radio static / mountain wind
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  // Filter for deep atmospheric wind & distant military wireless buzz
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, ctx.currentTime);

  ambientGainNode = ctx.createGain();
  ambientGainNode.gain.setValueAtTime(0.04, ctx.currentTime);

  noiseSource.connect(filter);
  filter.connect(ambientGainNode);
  ambientGainNode.connect(ctx.destination);

  noiseSource.start(0);
  isAudioPlaying = true;
  updateAudioButton();
}

function stopAmbientRadio() {
  if (ambientGainNode && audioCtx) {
    ambientGainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      if (noiseSource) {
        try { noiseSource.stop(); } catch(e){}
      }
      isAudioPlaying = false;
      updateAudioButton();
    }, 500);
  } else {
    isAudioPlaying = false;
    updateAudioButton();
  }
}

function updateAudioButton() {
  if (!audioStatusText) return;
  if (isAudioPlaying) {
    audioStatusText.textContent = "RADIO: LIVE (ON)";
    if (audioToggleBtn) audioToggleBtn.style.background = "#00FF66";
  } else {
    audioStatusText.textContent = "RADIO: OFF";
    if (audioToggleBtn) audioToggleBtn.style.background = "#ffffff";
  }
}

if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => {
    if (!isAudioPlaying) {
      startAmbientRadio();
    } else {
      stopAmbientRadio();
    }
  });
}

// Military Beep / Radio Chirp for buttons
function playMilitaryChirp() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.05); // D6

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch(e) {
    // Audio context not allowed until user interaction
  }
}

// Diya Bell Tone
function playBellTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch(e) {}
}
