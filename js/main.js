// Portfolio JavaScript - Tushar Wasake

// Theme Management
class ThemeManager {
  constructor() {
    this.initializeElements();
    this.initializeTheme();
    this.setupEventListeners();
  }

  initializeElements() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeToggleMobile = document.getElementById("theme-toggle-mobile");
    this.sunIcon = document.getElementById("sun-icon");
    this.moonIcon = document.getElementById("moon-icon");
    this.sunIconMobile = document.getElementById("sun-icon-mobile");
    this.moonIconMobile = document.getElementById("moon-icon-mobile");
    this.root = document.getElementById("root");
  }

  initializeTheme() {
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem("theme") || "dark";
    this.root.setAttribute("data-theme", currentTheme);
    this.updateIcons(currentTheme);
  }

  updateIcons(theme) {
    if (theme === "dark") {
      this.sunIcon?.classList.add("hidden");
      this.moonIcon?.classList.remove("hidden");
      this.sunIconMobile?.classList.add("hidden");
      this.moonIconMobile?.classList.remove("hidden");
    } else {
      this.sunIcon?.classList.remove("hidden");
      this.moonIcon?.classList.add("hidden");
      this.sunIconMobile?.classList.remove("hidden");
      this.moonIconMobile?.classList.add("hidden");
    }
  }

  toggleTheme() {
    const currentTheme = this.root.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    this.root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    this.updateIcons(newTheme);
  }

  setupEventListeners() {
    this.themeToggle?.addEventListener("click", () => this.toggleTheme());
    this.themeToggleMobile?.addEventListener("click", () => this.toggleTheme());
  }
}

// Mobile Menu Management
class MobileMenuManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.hamburger = document.querySelector(".hamburger");
  }

  toggleMenu() {
    this.mobileMenu?.classList.toggle("active");
    this.hamburger?.classList.toggle("active");
  }

  closeMenu() {
    this.mobileMenu?.classList.remove("active");
    this.hamburger?.classList.remove("active");
  }

  setupEventListeners() {
    this.mobileMenuBtn?.addEventListener("click", () => this.toggleMenu());

    // Close mobile menu when clicking on nav links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.mobileMenu?.classList.contains("active")) {
        this.closeMenu();
      }
    });
  }
}

// Scroll Management
class ScrollManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.scrollToTopBtn = document.getElementById("scroll-to-top");
    this.navbar = document.querySelector("header");
    this.lastScrollTop = 0;
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide scroll to top button
    if (scrollTop > 300) {
      this.scrollToTopBtn?.classList.add("show");
    } else {
      this.scrollToTopBtn?.classList.remove("show");
    }

    // Add/remove scrolled class to navbar
    if (scrollTop > 50) {
      this.navbar?.classList.add("navbar-scrolled");
    } else {
      this.navbar?.classList.remove("navbar-scrolled");
    }

    this.lastScrollTop = scrollTop;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  setupEventListeners() {
    window.addEventListener("scroll", () => this.handleScroll());
    this.scrollToTopBtn?.addEventListener("click", () => this.scrollToTop());

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Contact Form Management
class ContactFormManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.contactForm = {
      form: document.getElementById("contact-form"),
      name: document.getElementById("contact-name"),
      email: document.getElementById("contact-email"),
      subject: document.getElementById("contact-subject"),
      message: document.getElementById("contact-message"),
      btn: document.getElementById("contact-btn"),
      formMessage: document.getElementById("form-message"),
    };
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showError(field, message) {
    field.classList.add("input-error");
    const errorElement = document.getElementById(
      `${field.id.replace("contact-", "")}-error`
    );
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearError(field) {
    field.classList.remove("input-error");
    const errorElement = document.getElementById(
      `${field.id.replace("contact-", "")}-error`
    );
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  validateForm() {
    let isValid = true;

    // Clear previous errors
    Object.values(this.contactForm).forEach((field) => {
      if (field && field.classList) {
        this.clearError(field);
      }
    });

    // Validate name
    if (!this.contactForm.name.value.trim()) {
      this.showError(this.contactForm.name, "Name is required");
      isValid = false;
    }

    // Validate email
    if (!this.contactForm.email.value.trim()) {
      this.showError(this.contactForm.email, "Email is required");
      isValid = false;
    } else if (!this.validateEmail(this.contactForm.email.value)) {
      this.showError(this.contactForm.email, "Please enter a valid email");
      isValid = false;
    }

    // Validate message
    if (!this.contactForm.message.value.trim()) {
      this.showError(this.contactForm.message, "Message is required");
      isValid = false;
    }

    return isValid;
  }

  showLoadingState() {
    const originalText = this.contactForm.btn.innerHTML;
    this.contactForm.btn.innerHTML = `
      <span class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Message...
      </span>
    `;
    this.contactForm.btn.disabled = true;
    return originalText;
  }

  resetButtonState(originalText) {
    this.contactForm.btn.innerHTML = originalText;
    this.contactForm.btn.disabled = false;
  }

  showSuccessMessage() {
    this.contactForm.formMessage.innerHTML = `
      <div class="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Message Sent Successfully! ✨</p>
            <p class="text-sm mt-1">Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <p class="text-sm mt-2 font-medium">Expected response time: Within 24 hours</p>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.contactForm.formMessage.innerHTML = "";
    }, 8000);
  }

  showMailtoMessage() {
    this.contactForm.formMessage.innerHTML = `
      <div class="success-message bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mt-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Email Client Opened! 📧</p>
            <p class="text-sm mt-1">Your email client should have opened with your message pre-filled. Please send it from there.</p>
            <p class="text-sm mt-2">If it didn't open, you can email me directly at: <a href="mailto:tusharwasake@gmail.com" class="underline font-medium">tusharwasake@gmail.com</a></p>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.contactForm.formMessage.innerHTML = "";
    }, 8000);
  }

  showErrorMessage() {
    this.contactForm.formMessage.innerHTML = `
      <div class="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold">Oops! Something went wrong</p>
            <p class="text-sm mt-1">There was an issue sending your message. Please contact me directly:</p>
            <div class="mt-2 space-y-1">
              <p class="text-sm">📧 <a href="mailto:tusharwasake@gmail.com" class="text-blue-600 hover:underline font-semibold">tusharwasake@gmail.com</a></p>
              <p class="text-sm">📱 <a href="tel:+918830126724" class="text-blue-600 hover:underline font-semibold">+91 8830126724</a></p>
              <p class="text-sm">💼 <a href="https://www.linkedin.com/in/tusharwasake/" target="_blank" class="text-blue-600 hover:underline font-semibold">LinkedIn</a></p>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.contactForm.formMessage.innerHTML = "";
    }, 8000);
  }

  async handleFormSubmission(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const originalText = this.showLoadingState();
    const formData = new FormData(this.contactForm.form);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject") || "Contact Form Message";
    const message = formData.get("message");

    try {
      // Method 1: Try Netlify Forms (if deployed on Netlify)
      if (window.location.hostname.includes("netlify")) {
        try {
          const netlifyResponse = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
          });

          if (netlifyResponse.ok) {
            this.showSuccessMessage();
            this.contactForm.form.reset();
            return;
          }
        } catch (netlifyError) {
          console.log("Netlify Forms not available, trying other methods...");
        }
      }

      // Method 2: Try FormSubmit
      try {
        const formSubmitResponse = await fetch(
          "https://formsubmit.co/ajax/tusharwasake@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              subject: subject,
              message: message,
              _captcha: false,
              _template: "table",
            }),
          }
        );

        if (formSubmitResponse.ok) {
          const result = await formSubmitResponse.json();
          if (result.success) {
            this.showSuccessMessage();
            this.contactForm.form.reset();
            return;
          }
        }
      } catch (formSubmitError) {
        console.log("FormSubmit failed, using mailto fallback...");
      }

      // Method 3: Fallback to mailto (always works)
      const mailtoBody = `
Hi Tushar,

${message}

Best regards,
${name}
Email: ${email}

---
Sent from your portfolio contact form
      `.trim();

      const mailtoLink = `mailto:tusharwasake@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(mailtoBody)}`;

      window.location.href = mailtoLink;
      this.showMailtoMessage();
      this.contactForm.form.reset();
    } catch (error) {
      console.error("All submission methods failed:", error);
      this.showErrorMessage();
    } finally {
      this.resetButtonState(originalText);
    }
  }

  setupEventListeners() {
    this.contactForm.form?.addEventListener("submit", (e) =>
      this.handleFormSubmission(e)
    );
  }
}

// Main Application
class PortfolioApp {
  constructor() {
    this.initializeManagers();
    this.setupGlobalEventListeners();
  }

  initializeManagers() {
    this.themeManager = new ThemeManager();
    this.mobileMenuManager = new MobileMenuManager();
    this.scrollManager = new ScrollManager();
    this.contactFormManager = new ContactFormManager();
  }

  setupGlobalEventListeners() {
    // Add loading animation on page load
    window.addEventListener("load", () => {
      const fadeInElement = document.querySelector(".animate-fade-in");
      if (fadeInElement) {
        fadeInElement.style.opacity = "1";
      }
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
