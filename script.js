/**
 * ============================================================================
 * AMAN KUMAR — RETRO / VINTAGE PORTFOLIO LOGIC
 * High-Performance Vanilla JavaScript
 * - Retro Web Audio Synthesizer (Click, Chime, Terminal Blip)
 * - Hero Email Pill Copy & Dispatch Interactions
 * - Projects Category Filter & Deep-Dive Retro Modal
 * - Interactive Retro Terminal Emulator (zsh-style)
 * - Mobile Navigation & Smooth Scroll Spy
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Retro Web Audio
  const audioFX = initRetroAudio();

  // 2. Initialize Hero Email Pill
  initHeroInputPill(audioFX);

  // 3. Initialize Project Filters & Modal
  initProjectsEngine(audioFX);

  // 4. Initialize Interactive Terminal
  initRetroTerminal(audioFX);

  // 5. Initialize Navigation & Scroll Spy
  initNavigation(audioFX);

  // 6. Initialize Contact Form & Copy
  initContactInteractions(audioFX);
});

/* ============================================================================
   01 — RETRO WEB AUDIO FX (Synthesized Zero-Dependency Sound)
   ============================================================================ */

function initRetroAudio() {
  let audioCtx = null;
  let isMuted = false;
  const toggleBtn = document.getElementById('soundToggleBtn');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play light mechanical click
  function playClick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Play pleasant retro success chime
  function playSuccess() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.16);
      });
    } catch (e) {}
  }

  // Play terminal key click
  function playKeyClick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {}
  }

  // Toggle button event
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      const icon = toggleBtn.querySelector('.sound-icon');
      if (isMuted) {
        if (icon) icon.textContent = '🔕';
        toggleBtn.title = 'Sound Disabled [Muted]';
      } else {
        getAudioContext();
        if (icon) icon.textContent = '🔔';
        toggleBtn.title = 'Retro Sound Active';
        playSuccess();
      }
    });
  }

  return { playClick, playSuccess, playKeyClick };
}

/* ============================================================================
   02 — HERO EMAIL PILL (Direct 1:1 Interaction)
   ============================================================================ */

function initHeroInputPill(audioFX) {
  const getStartedBtn = document.getElementById('heroGetStartedBtn');
  const emailInput = document.getElementById('heroEmailInput');

  if (getStartedBtn && emailInput) {
    getStartedBtn.addEventListener('click', () => {
      audioFX.playSuccess();
      const email = emailInput.value.trim() || 'amankumar.tech@gmail.com';

      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        const originalText = getStartedBtn.textContent;
        getStartedBtn.textContent = '✓ Copied!';
        getStartedBtn.style.backgroundColor = '#16a34a';

        setTimeout(() => {
          getStartedBtn.textContent = originalText;
          getStartedBtn.style.backgroundColor = '';
        }, 2200);
      }).catch(() => {
        // Fallback mailto
        window.location.href = `mailto:${email}?subject=Hello%20Aman!`;
      });
    });

    // Enter key triggers button
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        getStartedBtn.click();
      }
    });
  }
}

/* ============================================================================
   03 — PROJECTS ENGINE & MODAL
   ============================================================================ */

const PROJECTS_DATA = {
  rootsec: {
    title: 'ROOTSEC',
    category: 'SECURITY PLATFORM',
    image: 'assets/project-rootsec.jpg',
    desc: 'An enterprise-grade vulnerability intelligence and automated pentesting platform built for modern DevOps environments. ROOTSEC provides real-time vulnerability scanning, security auditing, and continuous posture evaluation for internal networks and web infrastructures.',
    tags: ['Python', 'FastAPI', 'Docker', 'Linux Kernel', 'Nmap', 'Security Audit'],
    status: 'Deployed (Production)'
  },
  blackout: {
    title: 'BLACKOUT SECTOR',
    category: 'CTF COMPETITION PLATFORM',
    image: 'assets/project-blackout.jpg',
    desc: 'Premier CTF competition engine and live attack/defense sandbox. Engineered to handle hundreds of concurrent security teams with dynamic challenge deployment, automated flag validation, real-time scoreboards, and binary exploitation containment.',
    tags: ['Next.js', 'Node.js', 'WebSockets', 'Linux Cgroups', 'Docker', 'Infosec'],
    status: 'Live & Active'
  },
  janmitra: {
    title: 'JanMitra',
    category: 'CIVIC GOVERNANCE PLATFORM',
    image: 'assets/project-janmitra.jpg',
    desc: 'A civic grievance redressal and municipal issue tracking platform connecting citizens directly with administrative officers. Features automated geolocation tagging, status progress tracking, and verified photo audit reports.',
    tags: ['React', 'Firebase', 'Geolocation API', 'Tailwind', 'PWA'],
    status: 'Public Beta'
  },
  accounts_ai: {
    title: 'Accounts.AI',
    category: 'FINTECH & VIRTUAL LAB',
    image: 'assets/project-cryptoflow.jpg',
    desc: 'An intelligent accounting virtual laboratory designed for commerce students and emerging business teams. Utilizes language model agents to parse receipts, automate ledger entries, and visualize balance sheets in real-time.',
    tags: ['Python', 'OpenAI API', 'React', 'SQLite', 'Data Visualization'],
    status: 'Live Tool'
  },
  chemlove: {
    title: 'ChemLove & PhyLove',
    category: 'EDTECH VIRTUAL SIMULATION',
    image: 'assets/project-nova.jpg',
    desc: 'A high-fidelity virtual science laboratory enabling high school and university learners to perform hazardous chemistry titrations and physics mechanics simulations directly in the browser with realistic physics.',
    tags: ['Three.js', 'HTML5 Canvas', 'JavaScript', 'Physics Engine', 'EdTech'],
    status: 'Open Source'
  },
  devorbit: {
    title: 'DevOrbit',
    category: 'DEVELOPER COLLABORATION',
    image: 'assets/project-devorbit.jpg',
    desc: 'Community platform engineered for hackathon participants, open-source maintainers, and builders to connect, form balanced teams, track project sprints, and showcase working software prototypes.',
    tags: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Supabase', 'WebSockets'],
    status: 'Community Active'
  }
};

function initProjectsEngine(audioFX) {
  // Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      audioFX.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      projectCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Toggle between Retro Art and Live Screenshot
  const togglePills = document.querySelectorAll('.view-toggle-pill');
  togglePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      audioFX.playClick();
      const targetKey = pill.dataset.target;
      const artBox = document.getElementById(`art-${targetKey}`);
      const photoBox = document.getElementById(`photo-${targetKey}`);
      const textSpan = pill.querySelector('.toggle-text');
      const iconSpan = pill.querySelector('.toggle-icon');

      if (artBox && photoBox) {
        if (artBox.classList.contains('active')) {
          // Switch to Live Photo
          artBox.classList.remove('active');
          photoBox.classList.add('active');
          if (textSpan) textSpan.textContent = 'Live UI';
          if (iconSpan) iconSpan.textContent = '🖥️';
        } else {
          // Switch back to Retro Art
          photoBox.classList.remove('active');
          artBox.classList.add('active');
          if (textSpan) textSpan.textContent = 'Art';
          if (iconSpan) iconSpan.textContent = '🎨';
        }
      }
    });
  });

  // Modal Handlers
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const viewBtns = document.querySelectorAll('.view-details-btn');

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechStack = document.getElementById('modalTechStack');

  function openProjectModal(key) {
    const data = PROJECTS_DATA[key];
    if (!data || !modal) return;

    audioFX.playClick();

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalDesc.textContent = data.desc;

    // Populate tech pills
    modalTechStack.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tag;
      modalTechStack.appendChild(span);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    audioFX.playClick();
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.dataset.project;
      openProjectModal(projKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeProjectModal);

  // Close on overlay backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* ============================================================================
   04 — INTERACTIVE RETRO TERMINAL EMULATOR
   ============================================================================ */

function initRetroTerminal(audioFX) {
  const terminalInput = document.getElementById('terminalInput');
  const terminalScreen = document.getElementById('terminalScreen');

  if (!terminalInput || !terminalScreen) return;

  const COMMANDS = {
    help: () => `
Available terminal commands:
  • help        : Display available commands
  • skills      : List cybersecurity, AI & web arsenals
  • projects    : Review shipped platforms (RootSec, Blackout, JanMitra...)
  • experience  : View timeline (CodexSec, Microsoft Ambassador...)
  • whoami      : Display operator credentials
  • contact     : Get email, linkedin and github links
  • clear       : Clear terminal window
  • date        : Print current system time
`,
    skills: () => `
[+] Cyber Security    : Burp Suite, Nmap, Wireshark, Metasploit, CTFs
[+] Web Systems       : React, Next.js, Node.js, FastAPI, WebSockets
[+] Infrastructure    : Docker, Linux Kernel, AWS, Azure, Nginx
[+] Practical AI      : Python, LangChain, LLM APIs, Automation Pipelines
[+] Community & Ops   : Hackathon Organization ($10k pool), Mentorship
`,
    projects: () => `
[1] ROOTSEC         : Enterprise vulnerability intelligence platform
[2] BLACKOUT SECTOR : Attack/Defense CTF competition engine
[3] JanMitra        : Civic grievance reporting & municipal router
[4] Accounts.AI     : Autonomous bookkeeping & AI virtual lab
[5] ChemLove        : Interactive virtual chemistry simulations
[6] DevOrbit        : Hackathon creator collaboration network
`,
    experience: () => `
[2026] Operations Lead @ CodexSec
[2026] Microsoft Student Ambassador
[2025] Google Student Ambassador (Previous)
[2025] IEDC Intern @ Chandigarh University
[2025] HackWithUttarPradesh 2025 Organizer ($10k Prize Pool)
`,
    whoami: () => `
OPERATOR : Aman Kumar
FOCUS    : Cyber Security • Builder • Community
MISSION  : Building a safer, more open, and resilient internet.
STATUS   : Ready for collaborations and new opportunities.
`,
    contact: () => `
Email     : amankumar.tech@gmail.com
LinkedIn  : linkedin.com/in/aman-kumar
GitHub    : github.com/aman-kumar
`,
    date: () => new Date().toUTCString(),
    clear: () => {
      terminalScreen.innerHTML = '';
      return null;
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    audioFX.playKeyClick();

    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      terminalInput.value = '';

      if (!rawCmd) return;

      // Echo command
      const echoDiv = document.createElement('div');
      echoDiv.className = 'term-line';
      echoDiv.innerHTML = `<span class="prompt-text">aman@portfolio:~$</span> ${escapeHTML(rawCmd)}`;
      terminalScreen.insertBefore(echoDiv, terminalInput.parentElement);

      if (cmd === 'clear') {
        COMMANDS.clear();
      } else if (COMMANDS[cmd]) {
        const resDiv = document.createElement('div');
        resDiv.className = 'term-line info-block';
        resDiv.innerHTML = COMMANDS[cmd]().replace(/\n/g, '<br>');
        terminalScreen.insertBefore(resDiv, terminalInput.parentElement);
        audioFX.playSuccess();
      } else {
        const errDiv = document.createElement('div');
        errDiv.className = 'term-line';
        errDiv.style.color = '#ff7f8a';
        errDiv.textContent = `zsh: command not found: ${rawCmd}. Type 'help' for instructions.`;
        terminalScreen.insertBefore(errDiv, terminalInput.parentElement);
      }

      // Scroll to bottom
      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

/* ============================================================================
   05 — NAVIGATION & SCROLL SPY
   ============================================================================ */

function initNavigation(audioFX) {
  const navbar = document.getElementById('topNavbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Mobile menu toggle
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      audioFX.playClick();
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Scroll Spy & Sticky navbar state
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      audioFX.playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ============================================================================
   06 — CONTACT INTERACTIONS & FORM
   ============================================================================ */

function initContactInteractions(audioFX) {
  const contactCopyBtn = document.getElementById('contactCopyBtn');
  const aboutCopyEmailBtn = document.getElementById('aboutCopyEmailBtn');
  const copyToast = document.getElementById('copyToast');

  function copyAmanEmail() {
    audioFX.playSuccess();
    const email = 'amankumar.tech@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (copyToast) {
        copyToast.style.display = 'block';
        setTimeout(() => {
          copyToast.style.display = 'none';
        }, 3000);
      }
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  }

  if (contactCopyBtn) contactCopyBtn.addEventListener('click', copyAmanEmail);
  if (aboutCopyEmailBtn) aboutCopyEmailBtn.addEventListener('click', copyAmanEmail);

  // Contact Form Submission (Mock Handler with Sound & Banner)
  window.handleFormSubmit = function() {
    audioFX.playSuccess();
    const submitBtn = document.getElementById('formSubmitBtn');
    const successMsg = document.getElementById('formSuccessMsg');
    const form = document.getElementById('contactForm');

    if (submitBtn) {
      submitBtn.textContent = 'Dispatching...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (successMsg) successMsg.style.display = 'block';
      if (submitBtn) {
        submitBtn.textContent = '✓ Dispatched!';
        submitBtn.style.backgroundColor = '#16a34a';
      }
      if (form) form.reset();

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Dispatch Message 🚀';
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }
      }, 4000);
    }, 800);
  };
}
