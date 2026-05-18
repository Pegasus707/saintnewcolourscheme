/**
 * Navigation and Page Management
 */
function showPage(page, e) {
  if (e) e.preventDefault();
  
  // Update active page visibility
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + page);
  if (targetPage) {
    targetPage.classList.add('active');
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
  if (menu) {
    menu.classList.toggle('open');
  }
}

/**
 * Product Categories Accordion
 */
function toggleCategory(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.product-category').forEach(c => c.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

/**
 * Service Deep Linking and Scrolling
 */
function scrollToService(n, e) {
  if (e) e.preventDefault();
  const target = document.getElementById('service-' + n);
  if (!target) {
    console.warn('Service ' + n + ' not found');
    return;
  }
  
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
  
  let errorDiv = document.getElementById('err-' + id.split('-')[1]);
  if (!errorDiv) {
    // Dynamically create error message div if it doesn't exist in HTML
    errorDiv = document.createElement('div');
    errorDiv.id = 'err-' + id.split('-')[1];
    errorDiv.className = 'error-msg';
    input.parentNode.appendChild(errorDiv);
  }
  
  input.classList.remove('success');
  input.classList.add('error');
  errorDiv.innerText = message;
  errorDiv.classList.add('show');
}

function setSuccess(id) {
  const input = document.getElementById(id);
  if (!input) return;
  
  const errorDiv = document.getElementById('err-' + id.split('-')[1]);
  input.classList.remove('error');
  input.classList.add('success');
  
  if (errorDiv) {
    errorDiv.innerText = '';
    errorDiv.classList.remove('show');
  }
}

function validateField(id) {
  const input = document.getElementById(id);
  if (!input) return false;
  const val = input.value.trim();
  
  if (!val) {
    // Clear any previous error/success state if field is empty
    input.classList.remove('error', 'success');
    const errorDiv = document.getElementById('err-' + id.split('-')[1]);
    if (errorDiv) {
      errorDiv.innerText = '';
      errorDiv.classList.remove('show');
    }
    return true; // Let browser handle 'required' validation
  }

  if (id === 'f-email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Format check
    if (!emailRegex.test(val)) {
      setError(id, 'Invalid email address.');
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

    // Domain and TLD authentication
    const authenticTLDs = ['com', 'in', 'co.in', 'org', 'net', 'edu', 'gov', 'io', 'co', 'biz', 'info'];
    const isValidTLD = authenticTLDs.some(tld => emailTLD === tld || emailTLD.endsWith('.' + tld));
    const invalidTLDs = ['comm', 'con', 'cmo', 'cpm', 'rom', 'co.m', 'co.in.com', 'in.com'];
    const providerTypos = ['gmai', 'gamil', 'gmal', 'yaho', 'yahooo', 'hotmal', 'hotmai', 'outlok'];

    if (!isValidTLD || invalidTLDs.includes(emailTLD) || providerTypos.includes(emailName)) {
      setError(id, 'Invalid email address.');
      return false;
    }
  }

  if (id === 'f-whatsapp') {
    const strippedPhone = val.replace(/[\s-()]/g, ''); 
    const justDigits = strippedPhone.replace('+', '');
    
    // Authentic format check
    const isValidFormat = val.startsWith('+') && !/[a-zA-Z]/.test(val) && /^\+\d{10,15}$/.test(strippedPhone);
    
    // Spam sequence prevention
    const isNotSpam = !/^(\d)\1{6,}$/.test(justDigits) && !/1234567/.test(justDigits) && !/9876543/.test(justDigits) && !justDigits.startsWith('00000');

    if (!isValidFormat || !isNotSpam) {
      setError(id, 'Invalid phone number.');
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
      el.addEventListener('blur', () => validateField(id));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) {
          validateField(id);
        }
      });
    }
  });

  contactForm.addEventListener('submit', async function(e) {
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
