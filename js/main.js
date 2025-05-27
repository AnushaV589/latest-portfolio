// Main JavaScript for Vanapalli Anusha's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // DOM Elements
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('.back-to-top');
  const progressBars = document.querySelectorAll('.progress');
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const contactForm = document.getElementById('contact-form');
  
  // Initialize typed text effect
  initTypeWriter();
  
  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
    themeToggle.classList.toggle('open');
  });
  
  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      themeToggle.classList.remove('open');
    });
  });
  
  // Theme Toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle active navigation links on scroll
  window.addEventListener('scroll', () => {
    updateActiveNavLink();
    handleHeaderScroll();
    toggleBackToTopButton();
    animateOnScroll();
  });
  
  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Call initially to set the correct state on page load
  updateActiveNavLink();
  animateOnScroll();
  
  /**
   * Function to toggle light/dark theme
   */
  function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Update the icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }
  }
  
  /**
   * Function to handle header style on scroll
   */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  /**
   * Function to show/hide back to top button
   */
  function toggleBackToTopButton() {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  
  /**
   * Function to update active navigation link based on scroll position
   */
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Check each section's position
    sections.forEach(section => {
      const sectionTop = section.offsetTop - header.offsetHeight - 10;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  /**
   * Function to animate elements when they are in viewport
   */
  function animateOnScroll() {
    // Animate progress bars
    progressBars.forEach(progress => {
      const parent = progress.closest('.skill-item');
      const top = parent.getBoundingClientRect().top;
      
      if (top < window.innerHeight - 100) {
        const width = progress.getAttribute('data-width');
        progress.style.width = `${width}%`;
      }
    });
    
    // Animate other elements
    animatedElements.forEach(element => {
      const top = element.getBoundingClientRect().top;
      
      if (top < window.innerHeight - 100) {
        element.classList.add('animated');
      }
    });
    
    // Animate timeline items
    timelineItems.forEach((item, index) => {
      const top = item.getBoundingClientRect().top;
      
      if (top < window.innerHeight - 100) {
        // Add delay based on index
        setTimeout(() => {
          item.classList.add('animated');
        }, index * 200);
      }
    });
  }
  
  /**
   * Function to handle contact form submission
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Normally would send the form data to a server
    // For demo purposes, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
    
    // Reset the form
    contactForm.reset();
  }
  
  /**
   * Function to initialize typewriter effect
   */
  function initTypeWriter() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const texts = ['Full Stack Developer', 'Java Developer', 'Backend Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        // Removing characters
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Adding characters
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal typing speed
      }
      
      // Handle complete words
      if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end of typing
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        // Pause before starting new word
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
  }
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});