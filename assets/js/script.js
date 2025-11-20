/**
 * ===================================
 * AZITALIA RESTAURANT TEMPLATE - JAVASCRIPT
 * Cleaned and Organized JavaScript for Easy Customization
 * ===================================
 */

/**
 * ===================================
 * LOADER & ANIMATION SYSTEM
 * ===================================
 */

/**
 * LOADER ANIMATION - Smart Page Load System
 * Waits for full page load instead of fixed timeout for better UX
 */
(function() {
    'use strict';

    // Configuration - Customize timing values here
    const LOADER_CONFIG = {
        MINIMUM_LOADER_TIME: 1500,    // Minimum 1.5s for good UX
        MAXIMUM_LOADER_TIME: 8000,    // Maximum 8s timeout for safety
        FADE_DURATION: 500,           // 0.5s fade out
        AOS_DELAY: 100                // Delay before AOS init
    };

    // State management
    let loaderElement = null;
    let startTime = null;
    let pageLoaded = false;

    // Initialize loader control
    function initLoaderControl() {
        loaderElement = document.querySelector('.loader');

        if (!loaderElement) {
            // No loader found, initialize AOS and exit
            initializeAOS();
            return;
        }

        // Record start time
        startTime = Date.now();

        // Disable scrolling while loader is visible
        disableScrolling();

        // Wait for full page load (images, fonts, scripts, etc.)
        window.addEventListener('load', onPageLoad);

        // Safety net: maximum timeout for extremely slow connections
        setTimeout(() => {
            if (!pageLoaded) {
                onPageLoad();
            }
        }, LOADER_CONFIG.MAXIMUM_LOADER_TIME);
    }

    // Called when page is fully loaded
    function onPageLoad() {
        pageLoaded = true;
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, LOADER_CONFIG.MINIMUM_LOADER_TIME - elapsedTime);

        // Ensure minimum loader time for good UX
        setTimeout(() => {
            fadeOutLoader();
        }, remainingTime);
    }

    // Disable scrolling during loader
    function disableScrolling() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }

    // Enable scrolling after loader
    function enableScrolling() {
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflow = '';
        document.documentElement.style.overflowY = 'auto';

        // Force browser layout recalculation
        document.body.offsetHeight;
    }

    // Fade out loader smoothly
    function fadeOutLoader() {
        loaderElement.style.transition = `opacity ${LOADER_CONFIG.FADE_DURATION}ms ease-out`;
        loaderElement.style.opacity = '0';

        setTimeout(() => {
            removeLoader();
        }, LOADER_CONFIG.FADE_DURATION);
    }

    // Remove loader and restore scrolling
    function removeLoader() {
        loaderElement.remove();
        loaderElement = null;

        // Restore scrolling
        enableScrolling();

        // Initialize AOS after scroll is restored
        setTimeout(() => {
            initializeAOS();
        }, LOADER_CONFIG.AOS_DELAY);
    }

    // Handle window resize events
    function handleResize() {
        if (pageLoaded && loaderElement === null) {
            // Only recalculate if loader is already removed
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoaderControl);
    } else {
        initLoaderControl();
    }

    // Handle resize events
    window.addEventListener('resize', handleResize);
})();

/**
 * AOS (Animate On Scroll) - Initialization
 * Customizable animation settings for scroll effects
 */
function initializeAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      offset: 140,        // Distance from trigger point
      once: true,         // Animation happens only once
      duration: 800       // Animation duration in ms
    });

    // Refresh AOS after a short delay to ensure proper calculations
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
}

/**
 * ===================================
 * COMPONENT LOADING SYSTEM
 * ===================================
 */

/**
 * Dynamic Component Loader
 * Loads HTML components via data-include attribute for modular development
 */
document.addEventListener("DOMContentLoaded", function() {
  // Load all components with data-include attribute
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(include => {
    const file = include.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(content => {
        include.innerHTML = content;
        // Reinitialize navigation functionality for dynamically loaded components
        if (file.includes('nav-desktop') || file.includes('nav-mobile')) {
          initializeMobileMenu();
        }
      })
      .catch(error => {
        console.error('Error loading component:', file, error);
        include.innerHTML = `<div class="alert alert-warning">Component not found: ${file}</div>`;
      });
  });
});

/**
 * ===================================
 * MOBILE NAVIGATION SYSTEM
 * ===================================
 */

/**
 * Mobile Menu Controller
 * Handles hamburger menu functionality with proper state management
 */

// Global mobile menu elements (declared once for reuse)
let hamburgerIcon = null;
let hamburgerCrossIcon = null;
let mobileMenu = null;

// Initialize mobile menu functionality
function initializeMobileMenu() {
  hamburgerIcon = document.getElementById("hamburger");
  hamburgerCrossIcon = document.getElementById("hamburger-cross");
  mobileMenu = document.getElementById("mobile-menu");

  // Open mobile menu
  if (hamburgerIcon && mobileMenu) {
    hamburgerIcon.addEventListener("click", function () {
      mobileMenu.style.transform = "translateX(0%)";
      mobileMenu.classList.add("show");
    });
  }

  // Close mobile menu
  if (hamburgerCrossIcon) {
    hamburgerCrossIcon.addEventListener("click", closeMobileMenu);
  }
}

// Close mobile menu function
function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.style.transform = "translateX(-100%)";
        mobileMenu.classList.remove("show");
    }
}

// Close mobile menu when clicking outside
document.addEventListener("click", function(event) {
    const isClickInsideMenu = mobileMenu && mobileMenu.contains(event.target);
    const isClickOnIcon = hamburgerIcon && hamburgerIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnIcon) {
        closeMobileMenu();
    }
});

// Initialize mobile menu on page load
document.addEventListener("DOMContentLoaded", initializeMobileMenu);


/**
 * ===================================
 * HEADER & NAVIGATION ENHANCEMENTS
 * ===================================
 */

/**
 * Fixed Header Positioning
 * Ensures header stays at top with proper styling
 */
function initializeFixedHeader() {
  const header = document.querySelector('header');

  if (header) {
    // Set header styles for fixed positioning
    Object.assign(header.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      zIndex: '9999',
      transition: 'transform 0.3s ease-in-out',
      backgroundColor: 'rgba(0,0,0,0.8)'
    });
  }
}

// Initialize header on both load and DOMContentLoaded for reliability
window.addEventListener('load', initializeFixedHeader);
document.addEventListener('DOMContentLoaded', initializeFixedHeader);

/**
 * ===================================
 * BACK TO TOP FUNCTIONALITY
 * ===================================
 */

/**
 * Smooth Scroll Back to Top
 * Provides smooth scrolling when back-to-top button is clicked
 */
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');

  // Check if the button exists on the page
  if (backToTopButton) {
    // Add click event listener for smooth scrolling
    backToTopButton.addEventListener('click', function(event) {
      // Prevent default link behavior
      event.preventDefault();

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

/**
 * ===================================
 * RESTAURANT MENU SYSTEM
 * ===================================
 */

/**
 * Menu Data Loader
 * Loads menu data from JSON file for dynamic menu generation
 */
async function loadMenuData() {
  try {
    const response = await fetch('./assets/js/menu.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading menu data:', error);
    return null;
  }
}

/**
 * Category Indicators Renderer
 * Creates category navigation indicators for menu slider
 */
function renderCategoryIndicators(categories) {
  const indicatorsWrapper = document.querySelector('.slider-indicators-wrapper');
  const indicators = categories.map((category, index) => `
    <div class="slider-indicators">
      <div class="indicators-icon ${index === 0 ? 'active' : ''} text-center">
        <i class="${category.icon} fa-2x"></i>
      </div>
      <div class="indicators-title text-center fs-6 mt-2 flex-wrap" style="max-width: 50vw; margin: auto;">
        <h5>${category.name}</h5>
      </div>
    </div>
  `).join('');
  indicatorsWrapper.innerHTML = indicators;
}

/**
 * Menu Items Renderer
 * Creates HTML for menu items with responsive layout and photo links
 */
function renderMenuItems(categories) {
  const menuContainer = document.getElementById('our-menus');
  const menuItems = categories.map((category, i) => `
    <div>
      <div class="row py-3">
        <h3 class="menu-category-title">${category.name}</h3>
              <div class="col-lg-5">
                <div class="pb-5 pb-lg-0">
                  ${category.items && category.items[0] && category.items[0].imageURL ? `
                    <img class="img-fluid" loading="lazy" src="./assets/${category.items[0].imageURL}" alt="${category.items[0].name}" onerror="this.onerror=null; this.src='./assets/images/banner-img.png';">
                  ` : `
                    <div class="menu-image-placeholder">
                      <i class="fas fa-image"></i>
                    </div>
                  `}
                </div>
              </div>
        <div class="col-lg-7">
          ${category.items.map(item => `
            <div class="item-wrapper d-flex justify-content-between">
              <div class="item-left">
                <h5>${item.name}</h5>
                <p>${item.description}</p>
              </div>
              <div class="item-right">
                <span class="item-price">
                  ${item.price}
                  <a class="voir-photo-link" data-image="${item.imageURL ? `./assets/${item.imageURL}` : 'not-available'}" data-name="${item.name}">${item.imageURL ? 'Voir photo' : 'Photo not available'}</a>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
  menuContainer.innerHTML = menuItems;
}

/**
 * Menu Slider System
 * Initializes Slick slider for menu navigation with responsive settings
 */
function initializeSliders() {
  // Main menu content slider
  $('#our-menus').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    adaptiveHeight: true,       // Adjusts height based on content
    speed: 300,
    asNavFor: '.slider-indicators-wrapper',
    draggable: false,
    swipe: false,
  });

  // Category indicators slider
  $('.slider-indicators-wrapper').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '#our-menus',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    draggable: false,
    swipe: false,
    prevArrow: '<button class="slide-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          arrows: true,
        }
      }
    ]
  });
}

/**
 * Menu System Initializer
 * Orchestrates the complete menu loading and initialization process
 */
async function initializeMenu() {
  try {
    // Check if menu container exists on current page
    const menuContainer = document.getElementById('our-menus');

    if (!menuContainer) {
      return; // Exit if no menu container found
    }

    // Load and render menu data
    const menuData = await loadMenuData();
    if (menuData) {
      renderCategoryIndicators(menuData.categories);
      renderMenuItems(menuData.categories);
      initializeSliders();
    }
  } catch (error) {
    console.error('Error initializing menu:', error);
  }
}

// Initialize menu system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeMenu();

  // Re-initialize lightbox after menu loads for dynamic content
  setTimeout(() => {
    const menuContainer = document.getElementById('our-menus');
    if (menuContainer) {
      initializeLightbox();
    }
  }, 1000);
});

/**
 * ===================================
 * SLIDER SYSTEMS INITIALIZATION
 * ===================================
 */

/**
 * Testimonials Slider Configuration
 * Creates dual-slider system for testimonials with content and navigation
 */
function initializeTestimonialsSlider() {
  try {
    $('.testimonials .slider-content').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      speed: 300,
      asNavFor: '.testimonials .slider-nav',
      draggable: true,
      swipe: true,
    });

    // Navigation Slider for Testimonials
    $('.testimonials .slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.testimonials .slider-content',
      dots: false,
      focusOnSelect: true,
      centerMode: true,        // Center the active slide
      centerPadding: '0px',
      draggable: true,
      swipe: true,
      arrows: false,           // Disable navigation arrows
      infinite: true,
    });
  } catch (error) {
    console.error('Error initializing testimonials slider:', error);
  }
}

/**
 * Chefs Slider Configuration
 * Displays chef profiles in a centered carousel layout
 */
function initializeChefsSlider() {
  try {
    $('.our-chefs .our-chef-slider-wrapper').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      focusOnSelect: true,
      centerMode: true,        // Center the active slide
      centerPadding: '0px',
      fade: false,
      speed: 300,
      draggable: false,
      swipe: false,
      prevArrow: '<button class="slide-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button class="slide-arrow next-arrow"><i class="fas fa-chevron-right"></i></button>',
      responsive: [
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error initializing chefs slider:', error);
  }
}

/**
 * Story Timeline Slider Configuration
 * Creates interactive timeline slider for restaurant story
 */
function initializeStorySlider() {
  try {
    $('.story-content').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      speed: 300,
      asNavFor: '.story-indicators .row',
      draggable: true,
      swipe: true,
    });

    // Navigation Slider for Story Timeline
    $('.story-indicators > .row').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.story-content',
      dots: false,
      focusOnSelect: true,
      centerPadding: '0px',
      draggable: true,
      swipe: true,
      arrows: false,           // Disable navigation arrows
      infinite: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error initializing story slider:', error);
  }
}

/**
 * Partner Slider Configuration
 * Auto-scrolling partner logos carousel
 */
function initializePartnerSlider() {
  try {
    $('.partner-slider').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      speed: 300,
      draggable: true,
      swipe: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error initializing partner slider:', error);
  }
}

/**
 * Chef's Choice Vertical Slider Configuration
 * Vertical carousel for chef recommendations
 */
function initializeChefChoiceSlider() {
  try {
    $('.chef-choise-slider').slick({
      slidesToShow: 3,
      vertical: true,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      speed: 300,
      draggable: true,
      swipe: true,
      responsive: [
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 1.7,
            slidesToScroll: 1,
          }
        }
      ]
    });

    // Add click events for the chevron icons
    $('.chef-choise-icons .fa-chevron-up').on('click', function() {
      $('.chef-choise-slider').slick('slickPrev');
    });

    $('.chef-choise-icons .fa-chevron-down').on('click', function() {
      $('.chef-choise-slider').slick('slickNext');
    });
  } catch (error) {
    console.error('Error initializing chef choice slider:', error);
  }
}

// Initialize all sliders when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeTestimonialsSlider();
  initializeChefsSlider();
  initializeStorySlider();
  initializePartnerSlider();
  initializeChefChoiceSlider();
});

/**
 * ===================================
 * UTILITY FUNCTIONS
 * ===================================
 */

/**
 * Dynamic Copyright Year Update
 * Automatically updates the copyright year in the footer
 */
function updateCopyrightYear() {
  try {
    const copyrightElement = document.getElementById('copyrightCurrentYear');
    if (copyrightElement) {
      copyrightElement.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Error updating copyright year:', error);
  }
}

// Initialize copyright year on DOM load
document.addEventListener('DOMContentLoaded', updateCopyrightYear);

/**
 * ===================================
 * MENU PHOTO LIGHTBOX SYSTEM
 * ===================================
 */

/**
 * Advanced Menu Photo Lightbox
 * Provides sophisticated image viewing experience with animations
 */
function initializeLightbox() {
  // Get lightbox elements
  const lightbox = document.querySelector('.menu-lightbox');
  if (!lightbox) return; // Exit if lightbox not found on page

  const lightboxContent = lightbox.querySelector('.menu-lightbox-content');
  const lightboxImage = lightbox.querySelector('.menu-lightbox-image');
  const lightboxPlaceholder = lightbox.querySelector('.menu-lightbox-placeholder');
  const lightboxTitle = lightbox.querySelector('.menu-lightbox-title');
  const closeButton = lightbox.querySelector('.menu-lightbox-close');

  /**
   * Open Lightbox with Animation
   * Opens lightbox with smooth animation from click position
   */
  async function openLightbox(imageUrl, title, clickElement) {
    // Show lightbox immediately
    lightbox.style.display = 'flex';
    lightbox.classList.remove('closing');

    const content = lightbox.querySelector('.menu-lightbox-content');

    // Set animation origin based on device type
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      content.style.transformOrigin = 'center';
    } else {
      // Calculate click position for desktop animation
      const clickRect = clickElement.getBoundingClientRect();
      const clickX = clickRect.left + clickRect.width / 2;
      const clickY = clickRect.top + clickRect.height / 2;
      content.style.transformOrigin = `${clickX}px ${clickY}px`;

      // Force browser reflow to apply transform origin
      content.offsetHeight;
    }

    // Trigger entrance animation
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      lightboxTitle.textContent = title;
    });

    // Show loading state
    showLoadingState();

    // Handle image loading
    if (imageUrl === 'not-available') {
      showPlaceholderImage();
    } else {
      loadImage(imageUrl, title);
    }
  }

  /**
   * Show Loading State
   * Displays loading spinner while image loads
   */
  function showLoadingState() {
    lightboxImage.style.display = 'none';
    lightboxPlaceholder.style.display = 'flex';
    lightboxPlaceholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Chargement...</p>';
  }

  /**
   * Show Placeholder Image
   * Shows image not available placeholder
   */
  function showPlaceholderImage() {
    setTimeout(() => {
      lightboxImage.src = './assets/images/photo-not-available.svg';
      lightboxImage.alt = 'Photo non disponible';
      lightboxImage.style.display = 'block';
      lightboxPlaceholder.style.display = 'none';
    }, 300);
  }

  /**
   * Load Image with Error Handling
   * Loads image with fallback to placeholder on error
   */
  function loadImage(imageUrl, title) {
    lightboxImage.src = imageUrl;
    lightboxImage.alt = title;

    // Add error handler for fallback
    lightboxImage.onerror = function() {
      this.src = './assets/images/photo-not-available.svg';
      this.alt = 'Photo non disponible';
    };

    lightboxImage.style.display = 'block';
    lightboxPlaceholder.style.display = 'none';
  }

  /**
   * Close Lightbox with Animation
   * Closes lightbox with smooth return animation
   */
  function closeLightbox(clickElement) {
    lightbox.classList.add('closing');
    lightbox.classList.remove('active');

    // Remove active state from all photo links
    document.querySelectorAll('.voir-photo-link').forEach(link => {
      link.classList.remove('lightbox-active');
    });

    // Set return animation origin for desktop
    if (clickElement && window.innerWidth > 768) {
      const clickRect = clickElement.getBoundingClientRect();
      const clickX = clickRect.left + clickRect.width / 2;
      const clickY = clickRect.top + clickRect.height / 2;
      const content = lightbox.querySelector('.menu-lightbox-content');
      content.style.transformOrigin = `${clickX}px ${clickY}px`;
    }

    // Clean up after animation
    setTimeout(() => {
      cleanupLightbox();
    }, 600);
  }

  /**
   * Cleanup Lightbox Resources
   * Clears lightbox content and resets state
   */
  function cleanupLightbox() {
    lightbox.style.display = 'none';
    lightbox.classList.remove('closing');
    document.body.style.overflow = '';
    lightboxImage.src = '';
    lightboxTitle.textContent = '';
  }

  // Event Listeners
  let lastClickTime = 0;

  // Handle photo link clicks with debouncing
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('voir-photo-link')) {
      e.preventDefault();

      // Prevent rapid clicking
      const now = Date.now();
      if (now - lastClickTime < 500) return;
      lastClickTime = now;

      // Add active state to clicked link
      e.target.classList.add('lightbox-active');

      const imageUrl = e.target.dataset.image;
      const title = e.target.dataset.name || e.target.closest('.item-wrapper').querySelector('h5').textContent;

      if (imageUrl) {
        openLightbox(imageUrl, title, e.target);
      }
    }
  });

  // Close button functionality
  if (closeButton) {
    closeButton.addEventListener('click', () => closeLightbox());
  }

  // Close when clicking outside content
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard accessibility (Escape key)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const menuContainer = document.getElementById('our-menus');
  if (menuContainer) {
    initializeLightbox();
  }
});
