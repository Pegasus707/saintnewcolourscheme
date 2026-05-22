/**
 * Navigation and Page Management
 */
function showPage(page, e) {
  if (e) e.preventDefault();

  // Reset contact form visibility state if previously submitted successfully
  if (page === 'contact') {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form && success && form.style.display === 'none') {
      form.style.display = 'block';
      success.style.display = 'none';
    }
  }

  // Update active page visibility
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + page);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Calculate accordion heights dynamically once Products page becomes visible
  if (page === 'products') {
    requestAnimationFrame(() => {
      document.querySelectorAll('.product-category.open').forEach(c => {
        const body = c.querySelector('.product-cat-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      });
    });
  }

  // Update nav links active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Mobile Menu Toggle
 */
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu) {
    const isOpen = menu.classList.toggle('open');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  if (hamburger) {
    hamburger.classList.toggle('open');
  }
}

/**
 * Product Categories Accordion
 */
function toggleCategory(el) {
  const isOpen = el.classList.contains('open');
  const body = el.querySelector('.product-cat-body');

  // Phase 1: Measure (Read) - DO NOT write to DOM yet to prevent layout thrashing
  let targetHeight = '0px';
  if (!isOpen && body) {
    targetHeight = body.scrollHeight + 'px';
  }

  // Phase 2: Mutate (Write) - Apply all DOM changes together
  document.querySelectorAll('.product-category').forEach(c => {
    if (c !== el && c.classList.contains('open')) {
      c.classList.remove('open');
      c.setAttribute('aria-expanded', 'false');
      const cBody = c.querySelector('.product-cat-body');
      if (cBody) cBody.style.maxHeight = '0px';
    }
  });

  if (!isOpen) {
    el.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
    if (body) body.style.maxHeight = targetHeight;
  } else {
    el.classList.remove('open');
    el.setAttribute('aria-expanded', 'false');
    if (body) body.style.maxHeight = '0px';
  }
}

/**
 * Service Deep Linking and Scrolling
 */
function scrollToService(n, e) {
  if (e) e.preventDefault();
  const target = document.getElementById('service-' + n);
  if (!target) return;

  const servicesPage = document.getElementById('page-services');

  if (!servicesPage.classList.contains('active')) {
    showPage('services', null);
    // Wait for page transition then scroll
    setTimeout(() => {
      const offset = 120;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }, 600);
  } else {
    const offset = 120;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
}

/**
 * Contact Form Validation & Submission
 */
function setError(id, message) {
  const input = document.getElementById(id);
  if (!input) return;
  input.classList.remove('success');
  input.classList.add('error');

  // Find or create error message element
  let errorEl = input.parentNode.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    input.parentNode.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function setSuccess(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.classList.remove('error');
  input.classList.add('success');

  const errorEl = input.parentNode.querySelector('.error-message');
  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

function shakeElement(el) {
  el.classList.remove('shake');
  // Trigger reflow to restart animation
  void el.offsetWidth;
  el.classList.add('shake');
}

function validateField(id) {
  const input = document.getElementById(id);
  if (!input) return false;
  const val = input.value.trim();

  if (!val) {
    // Clear any previous error/success state if field is empty
    input.classList.remove('error', 'success');
    const errorEl = input.parentNode.querySelector('.error-message');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
    return true; // Let browser handle 'required' validation
  }

  if (id === 'f-email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Format check
    if (!emailRegex.test(val)) {
      setError(id, 'Invalid email address format.');
      return false;
    }

    const emailParts = val.split('@');
    const emailDomain = emailParts[1].toLowerCase();
    const domainParts = emailDomain.split('.');

    if (domainParts.length < 2) {
      setError(id, 'Invalid email address.');
      return false;
    }

    const emailName = domainParts[0];
    const emailTLD = domainParts.slice(1).join('.');

    // Validate TLD generally: only letters and dots, between 2 and 12 chars
    const isValidTLDFormat = /^[a-z.]{2,12}$/.test(emailTLD);
    const invalidTLDs = ['comm', 'con', 'cmo', 'cpm', 'rom', 'co.m', 'co.in.com', 'in.com'];
    const providerTypos = ['gmai', 'gamil', 'gmal', 'yaho', 'yahooo', 'hotmal', 'hotmai', 'outlok'];

    if (!isValidTLDFormat || invalidTLDs.includes(emailTLD)) {
      setError(id, 'Please check your email address domain TLD.');
      return false;
    }

    if (providerTypos.includes(emailName)) {
      setError(id, 'Please correct the typo in your email domain name.');
      return false;
    }
  }

  if (id === 'f-whatsapp') {
    const strippedPhone = val.replace(/[\s-()]/g, '');
    const justDigits = strippedPhone.replace('+', '');

    // Authentic format check: optional '+', followed by 10 to 15 digits
    const isValidFormat = !/[a-zA-Z]/.test(val) && /^\+?\d{10,15}$/.test(strippedPhone);

    // Spam sequence prevention
    const isNotSpam = !/^(\d)\1{6,}$/.test(justDigits) && !/1234567/.test(justDigits) && !/9876543/.test(justDigits) && !justDigits.startsWith('00000');

    if (!isValidFormat) {
      setError(id, 'Phone number must contain between 10 and 15 digits.');
      return false;
    }

    if (!isNotSpam) {
      setError(id, 'Please enter a valid phone number (spam sequences are blocked).');
      return false;
    }
  }

  setSuccess(id);
  return true;
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const fields = ['f-name', 'f-company', 'f-email', 'f-whatsapp', 'f-type', 'f-message'];

  // Real-time validation
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('invalid', function () {
        shakeElement(this);
      });
      el.addEventListener('blur', () => validateField(id));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) {
          validateField(id);
        }
      });
    }
  });

  contactForm.addEventListener('submit', async function (e) {
    // Check browser's native validity first (handles the 'required' attribute)
    if (!this.checkValidity()) {
      // If native validation fails, let the browser show its own tooltips
      return;
    }

    e.preventDefault();

    let isValid = true;
    fields.forEach(id => {
      if (!validateField(id)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Shake all custom errors
      this.querySelectorAll('.error').forEach(el => {
        shakeElement(el);
      });

      // Find first error and focus
      const firstError = document.querySelector('.form-group .error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const submitBtn = this.querySelector('.form-submit');
    const originalBtnText = submitBtn.innerHTML;

    // Update UI to sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const formData = new FormData(this);

    try {
      const response = await fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        contactForm.reset();
        fields.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('success', 'error');
        });
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    } catch (error) {
      alert('Oops! There was a problem submitting your form. Please check your connection.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/**
 * Scroll Listeners removed to prevent nav background color shifting.
 */
/**
 * Scroll Reveal Animations Setup
 */
document.addEventListener('DOMContentLoaded', () => {
  // Prevent category accordion from closing when clicking inside the expanded tags/body
  document.querySelectorAll('.product-cat-body').forEach(body => {
    body.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Initialize the open category's accessibility attributes on page load
  document.querySelectorAll('.product-category').forEach(c => {
    const isOpen = c.classList.contains('open');
    c.setAttribute('role', 'button');
    c.setAttribute('tabindex', '0');
    c.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Add keydown handler for accessibility
    c.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCategory(c);
      }
    });

    // If active on load, set its height
    if (isOpen) {
      const productsPage = document.getElementById('page-products');
      if (productsPage && productsPage.classList.contains('active')) {
        const activeBody = c.querySelector('.product-cat-body');
        if (activeBody) activeBody.style.maxHeight = activeBody.scrollHeight + 'px';
      }
    }
  });

  // Debounced window resize event listener to fix accordion heights when resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      document.querySelectorAll('.product-category.open .product-cat-body').forEach(body => {
        body.style.maxHeight = 'none'; // reset to calculate naturally
        const newHeight = body.scrollHeight;
        body.style.maxHeight = newHeight + 'px';
      });
    }, 150);
  });

  // Elements to reveal
  const revealSelectors = [
    '.pillar-card',
    '.why-feature',
    '.source-card',
    '.process-step',
    '.partner-card',
    '.service-item',
    '.founder-visual',
    '.founder-content',
    '.bridge-item',
    '.stat-item',
    '.hero-content > *',
    '.contact-info > *',
    '.contact-form-container'
  ];

  // Combine selectors and select all matching elements
  const elementsToReveal = [];
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Add base reveal class
      el.classList.add('reveal-on-scroll');
      elementsToReveal.push(el);
    });
  });

  // Stagger delays setup
  const staggerGroups = [
    { parent: '.pillar-cards', children: '.pillar-card' },
    { parent: '.why-features', children: '.why-feature' },
    { parent: '.source-cards', children: '.source-card' },
    { parent: '.process-steps', children: '.process-step' },
    { parent: '.partner-cards', children: '.partner-card' },
    { parent: '.bridge-items', children: '.bridge-item' },
    { parent: '.stats-strip .container', children: '.stat-item' }
  ];

  staggerGroups.forEach(group => {
    const parent = document.querySelector(group.parent);
    if (parent) {
      const children = parent.querySelectorAll(group.children);
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.12}s`;
      });
    }
  });

  // Initialize IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Promote GPU layer just before animating
        entry.target.style.willChange = 'transform, opacity';
        // Trigger on next frame to ensure will-change is applied first
        requestAnimationFrame(() => {
          entry.target.classList.add('revealed');
        });
        // Clear will-change after animation to free GPU memory
        entry.target.addEventListener('transitionend', () => {
          entry.target.style.willChange = 'auto';
        }, { once: true });
        // Stop observing once revealed
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Start observing
  elementsToReveal.forEach(el => observer.observe(el));
});
