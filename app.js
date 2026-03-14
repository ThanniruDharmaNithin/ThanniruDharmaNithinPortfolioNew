const typingRoles = [
  "CSE (AI & ML) Graduate",
  "Aspiring Data Scientist",
  "Machine Learning Engineer",
  "AI & ML Developer",
  "Data Analytics Enthusiast",
  "Gen AI Enthusiast"
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 95;

const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const typingText = document.getElementById("typing-text");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollProgress = document.getElementById("scroll-progress");
const loader = document.getElementById("site-loader");

document.addEventListener("DOMContentLoaded", () => {
  initializeTypingEffect();
  initializeNavigation();
  initializeMobileMenu();
  initializeSmoothScroll();
  initializeRevealAnimations();
  initializeScrollTop();
  initializeScrollProgress();
  initializeParallax();
  initializeContactForm();
});

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 700);
});

function initializeTypingEffect() {
  if (!typingText) return;

  function typeRole() {
    const currentRole = typingRoles[currentRoleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 45;
    } else {
      typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && currentCharIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1400;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % typingRoles.length;
      typingSpeed = 450;
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();
}

function initializeNavigation() {
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    updateActiveNav();
  }

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  updateActiveNav();
}

function initializeMobileMenu() {
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}

function initializeSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const offsetTop = targetElement.offsetTop - 78;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
}

function initializeRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 6) * 0.06}s`;
    observer.observe(element);
  });
}

function initializeScrollTop() {
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function initializeScrollProgress() {
  if (!scrollProgress) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  });
}

function initializeParallax() {
  const heroDots = document.querySelector(".hero-dots");
  const heroGradients = document.querySelectorAll(".hero-gradient");
  const floatingTags = document.querySelectorAll(".floating-data");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (heroDots) {
      heroDots.style.transform = `translateY(${y * 0.12}px)`;
    }

    heroGradients.forEach((item, index) => {
      const speed = 0.05 + index * 0.03;
      item.style.transform = `translateY(${y * speed}px)`;
    });

    floatingTags.forEach((tag, index) => {
      const speed = 0.02 + (index % 3) * 0.015;
      tag.style.transform = `translateY(${y * speed}px)`;
    });
  });
}

function initializeContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !subject || !message) {
      showFormMessage("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const mailtoLink = `mailto:thannirudharmanithin2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `From: ${name} (${email})\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      showFormMessage("Opening your email client...", "success");
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 500);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  if (!formMessage) return;
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

console.log(`
╔══════════════════════════════════════════════╗
║      THANNIRU DHARMA NITHIN PORTFOLIO        ║
║      AI • ML • DATA • GEN AI                 ║
╚══════════════════════════════════════════════╝
`);
