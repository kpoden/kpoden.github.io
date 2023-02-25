AOS.init();

var mainSlider = new Swiper(".orts-slider", {
    spaceBetween: 30,
    pagination: {
        el: '.main-slider-pagination',
        clickable: true,
        },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        }
});


const bannerCount = document.querySelectorAll('.orts-banner .swiper-wrapper .orts-banner-item').length;

if(bannerCount > 1) {
    var banner = new Swiper(".orts-banner", {
    spaceBetween: 30,
    pagination: {
        el: ".banner-pagination",
        clickable: true
        },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        }
});

}


if(window.innerWidth < 700) {
    document.querySelector('.swiper-wrapper-desktop').classList.add('swiper-wrapper');
    document.querySelector('.reviews-spoiler').classList.add('hidden');

    var reviews = new Swiper(".orts-reviews-clients", {
    spaceBetween: 30,
    pagination: {
        el: ".reviews-pagination",
        clickable: true
        },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        }
});

}



function hideReviews() {
    const reviews =document.querySelectorAll('.orts-reviews-client');

    if(reviews.length > 2 && window.innerWidth >= 700) {
        document.querySelector('.reviews-spoiler').classList.remove('hidden');

        for(let i = 2; i < reviews.length; i++) {
            reviews[i].classList.add('hidden-review');
        }
    }
}

hideReviews();

const spoiler = document.querySelector('.reviews-spoiler');
const hiddenReviews = document.querySelectorAll('.hidden-review');

spoiler.addEventListener("click", (event) => {
  if (!spoiler.classList.contains("expanded")) {
    hiddenReviews.forEach((review) => {
      review.classList.remove("hidden-review");
      review.classList.add("shown-review");
      spoiler.classList.add("expanded");
      spoiler.textContent = "Скрыть";
    });
  } else {
    hiddenReviews.forEach((review) => {
        review.classList.add("hidden-review");
        review.classList.remove("shown-review");
        spoiler.classList.remove("expanded");
        spoiler.textContent = "Показать всё";
      });
  }
});


const allFaqPanels = $('.faq .faq-item > .faq-text').hide();

$('.faq .faq-title').click(function() {

    if($(this).hasClass('opened')) {
        $(this).next().slideUp();
        $(this).removeClass('opened');
    }
    else {
        $(this).addClass('opened');
        $(this).next().slideDown();
    }
    

    

    return false;
  });


  class MobileMenu {
    constructor(modalId) {
      this.mobileMenu = document.getElementById(modalId);
      this.burger = document.querySelector('.orts-header-burger');
      this.closeButton = this.mobileMenu.querySelector('.orts-mobile-menu-close');
      this.overlay = document.querySelector('.overlay-dark');
      this.isOpen = false;
      this.closeButton.addEventListener('click', () => this.close());
      this.overlay.addEventListener('click', () => this.close());
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  
    open() {
      this.mobileMenu.classList.add('mob--open');
      this.overlay.classList.add('overlay--shown');
      this.isOpen = true;
    }
  
    close() {
      this.mobileMenu.classList.remove('mob--open');
      this.overlay.classList.remove('overlay--shown');
      this.isOpen = false;
    }

    init() {
        this.burger.addEventListener('click', () => {
            this.open();
        })
    }
  }
  
    const mobile = new MobileMenu('mobile-menu');

    mobile.init(); 


    class Modal {
      constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeButton = this.modal.querySelector('.modal-close');
        this.modalTrigger = document.querySelectorAll('.modal-trigger');
        this.overlay = document.querySelector('.overlay-dark');
        this.isOpen = false;
        this.closeButton.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && this.isOpen) {
            this.close();
          }
        });
      }
    
      open() {
        this.modal.classList.add('opened-modal');
        this.overlay.classList.add('overlay--shown');
        this.isOpen = true;
      }
    
      close() {
        this.modal.classList.remove('opened-modal');
        this.overlay.classList.remove('overlay--shown');
        this.isOpen = false;
      }

      init() {
        this.modalTrigger.forEach((el) => el.addEventListener('click',() => {
          this.open();
        }))
      }
    }

    const modal = new Modal('modal');

    modal.init();