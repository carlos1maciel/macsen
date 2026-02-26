/* ============================================================
   SPARO — MODERN INTERACTIVE SCRIPTS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ── 1. HEADER SCROLL & VIDEO PARALLAX ──
  const header = document.getElementById("header");
  const heroVideo = document.getElementById("heroVideo");

  const onScroll = () => {
    // Header
    header.classList.toggle("scrolled", window.scrollY > 60);

    // Video Parallax
    if (heroVideo) {
      const scrollY = window.scrollY;
      const speed = 0.4; // Speed of parallax
      heroVideo.style.transform = `translateY(${scrollY * speed}px)`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── 2. ACTIVE NAV HIGHLIGHTING ──
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const highlightNav = () => {
    const scrollY = window.scrollY + 250;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollY >= top && scrollY < top + h) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  // ── 3. MOBILE MENU ──
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open")
      ? "hidden"
      : "";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // ── 4. SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const href = a.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ── 5. INTERSECTION OBSERVER — REVEAL ──
  const reveals = document.querySelectorAll(".reveal-up");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach((el) => revealObs.observe(el));

  // ── 6. COUNTER ANIMATION ──
  const statNums = document.querySelectorAll(".st-n");
  let statsDone = false;

  const animateStats = () => {
    if (statsDone) return;
    const band = document.querySelector(".stats-band");
    if (!band) return;
    const rect = band.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      statsDone = true;
      statNums.forEach((el, i) => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        setTimeout(() => {
          const tick = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current);
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          };
          requestAnimationFrame(tick);
        }, i * 150);
      });
    }
  };
  window.addEventListener("scroll", animateStats, { passive: true });

  // ── 7. PROGRESS BARS ANIMATION ──
  const progBars = document.querySelectorAll(".prog-bar");
  const progObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.w + "%";
          progObs.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 },
  );

  progBars.forEach((bar) => progObs.observe(bar));

  // ── 8. SATISFACTION RING ANIMATION ──
  const ringFill = document.querySelector(".ring-fill");
  let ringDone = false;

  const animateRing = () => {
    if (ringDone || !ringFill) return;
    const rect = ringFill.closest(".dash-card").getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      ringDone = true;
      const circumference = 2 * Math.PI * 50; // r=50
      const percent = 96;
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDashoffset = offset;
    }
  };
  window.addEventListener("scroll", animateRing, { passive: true });

  // ── 9. FAQ ACCORDION ──
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");

      // Close all
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("open"));

      // Toggle clicked
      if (!isOpen) item.classList.add("open");
    });
  });

  // ── 10. PARALLAX ORB MOVEMENT ──
  const orbs = document.querySelectorAll(".hero-orb");
  const corners = document.querySelectorAll(".hud-corner");
  if (window.innerWidth > 768) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        orbs.forEach((orb, i) => {
          const factor = (i + 1) * 20;
          orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });

        corners.forEach((c, i) => {
          const factor = (i + 1) * 10;
          c.style.transform = `translate(${-x * factor}px, ${-y * factor}px)`;
        });
      },
      { passive: true },
    );
  }

  // ── 10b. TELEMETRY TYPEWRITER ──
  const telemetry = document.querySelectorAll(".telemetry");
  telemetry.forEach((t) => {
    const original = t.textContent;
    t.textContent = "";
    let i = 0;
    const type = () => {
      if (i < original.length) {
        t.textContent += original[i];
        i++;
        setTimeout(type, Math.random() * 50 + 20);
      }
    };
    setTimeout(type, 1000);
  });

  // ── 11. TILT ON CARDS ──
  const tiltCards = document.querySelectorAll(
    ".scard, .rcard, .tl-card, .testi-card, .ci-card",
  );
  if (window.innerWidth > 768) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / 15; // More aggressive tilt
        const ry = (cx - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // ── 11b. RANDOM GLITCH FLICKER ──
  const glitchItems = document.querySelectorAll(".glitch-hover");
  setInterval(() => {
    if (Math.random() > 0.95) {
      const item = glitchItems[Math.floor(Math.random() * glitchItems.length)];
      item.style.animation = "glitch 0.2s infinite";
      setTimeout(() => (item.style.animation = ""), 200);
    }
  }, 1000);

  // ── 12. FORM SUBMISSION ──
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Enviado com Sucesso!
            `;
      btn.style.background = "#22c55e";
      btn.style.boxShadow = "0 8px 32px rgba(34,197,94,.3)";

      form.reset();

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        btn.style.boxShadow = "";
      }, 3500);
    });
  }

  // ── 13. CURSOR TRAIL FUN ──
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  document.body.appendChild(trail);

  let mouseX = 0,
    mouseY = 0;
  let trailX = 0,
    trailY = 0;

  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Chance de criar faíscas (sparkles)
      if (Math.random() > 0.9) {
        createSparkle(e.clientX, e.clientY);
      }
    },
    { passive: true },
  );

  function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    document.body.appendChild(sparkle);

    const size = Math.random() * 4 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.boxShadow = `0 0 10px var(--accent)`;

    const animDuration = Math.random() * 0.8 + 0.4;
    sparkle.style.animation = `sparkleAnim ${animDuration}s ease forwards`;

    setTimeout(() => sparkle.remove(), animDuration * 1000);
  }

  const animateTrail = () => {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`;
    requestAnimationFrame(animateTrail);
  };
  animateTrail();

  // ── 14. INTERACTIVE TITLE SHADOW ──
  const heroTitle = document.querySelector("#hero h1");
  if (heroTitle && window.innerWidth > 768) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const rect = heroTitle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const diffX = (e.clientX - centerX) / 40;
        const diffY = (e.clientY - centerY) / 40;

        heroTitle.style.textShadow = `${-diffX}px ${-diffY}px 30px rgba(0, 243, 255, 0.4)`;
      },
      { passive: true },
    );
  }
});
