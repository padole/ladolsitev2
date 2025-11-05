

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });
})();



// Filter Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryBoxes = document.querySelectorAll('.gallery-box');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        galleryBoxes.forEach(box => {
          const category = box.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            box.style.display = 'block';
          } else {
            box.style.display = 'none';
          }
        });
      });
    });

    // Modal Image Preview
    const modalImage = document.querySelector('.modal-img');
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(img => {
      img.addEventListener('click', () => {
        const imageSrc = img.getAttribute('data-bs-image');
        modalImage.setAttribute('src', imageSrc);
      });
    });




//     // Set a cookie
// function setCookie(name, value, days) {
//     const d = new Date();
//     d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// // Read a cookie
// function getCookie(name) {
//     let cname = name + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i].trim();
//         if (c.indexOf(cname) === 0) {
//             return c.substring(cname.length, c.length);
//         }
//     }
//     return "";
// }


// document.addEventListener("DOMContentLoaded", function() {

//     if (!getCookie("cookieAccepted")) {
//         document.getElementById("cookieBox").style.display = "flex";
//     }

//     document.getElementById("acceptCookies").addEventListener("click", function() {
//         setCookie("cookieAccepted", "yes", 365);
//         document.getElementById("cookieBox").style.display = "none";
//     });

// });


// setCookie("userTheme", "dark", 30);

// let theme = getCookie("userTheme");
// console.log(theme);



  function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
      const cname = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i].trim();
          if (c.indexOf(cname) === 0) {
              return c.substring(cname.length, c.length);
          }
      }
      return "";
  }

  document.addEventListener("DOMContentLoaded", function() {
      const cookieBox = document.getElementById("cookieBox");

      if (!getCookie("cookieConsent")) {
          cookieBox.classList.add("show");
      }

      document.getElementById("acceptCookies").addEventListener("click", function() {
          setCookie("cookieConsent", "accepted", 365);
          cookieBox.classList.remove("show");
      });

      document.getElementById("declineCookies").addEventListener("click", function() {
          setCookie("cookieConsent", "declined", 365);
          cookieBox.classList.remove("show");
      });
  });
